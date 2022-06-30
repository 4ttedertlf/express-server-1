import express, { Request, Response, NextFunction, Express } from "express";

import rootRouter from "./routes/root";
import statusRouter from "./routes/status";
import secretRouter from "./routes/secret";
import dataRouter from "./routes/data";
import storageRouter from "./routes/storage";
import { setHeaderWithAppVersion, checkTrailingSlash, preRouteWork } from "./middleware";

import * as database from "./mongo-database";

import debug from "debug";
debug("express-react:server");

function configureApp(app: Express) {

  app.set("port", app.locals.appConfiguration.port);
  
  //app.use(checkTrailingSlash);
  //app.use(setHeaderWithAppVersion);
  // pre-route work
  //app.use(preRouteWork);

  app.use("/", rootRouter);
  app.use("/api/status", statusRouter);
  app.use("/api/secret", secretRouter);
  app.use("/api/data", dataRouter);
  app.use("/api/storage", storageRouter);

  app.use("/api/test", (req, res, next) => {
    return res.status(200).send("test");
});

  app.get("*", (req: Request, res: Response) => {
    res.status(404).send("File not found");
  });
}

export const connectApp = async () => {
  try {
    const app = express();

    // config settings
    const appConfiguration = {
      port: process.env.PORT || "8080",
      connectionString: process.env.AZURE_COSMOS_CONNECTION_STRING,
      databaseName:
        (process.env.AZURE_COSMOS_DATABASE_NAME as string) || "dev-server",
      keyVaultName: process.env.AZURE_KEY_VAULT_NAME,
      storageName: process.env.AZURE_STORAGE_RESOURCE_NAME,
      storageDefaultContainer: process.env.AZURE_STORAGE_BLOB_DEFAULT_CONTAINER,
      storageSAS: process.env.AZURE_STORAGE_BLOB_SAS_TOKEN
    };

    if (!appConfiguration.connectionString)
      throw Error("No database connection string found");


    const mongoClient = await database.connectApp(
      appConfiguration.connectionString,
      appConfiguration.databaseName
    );
    //console.log("database connected");

    app.locals.db = mongoClient;
    app.locals.appConfiguration = appConfiguration;

    configureApp(app);

    return app;
  } catch (err: any) {
    /*console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err.message}`
    );*/
    process.exit();
  }
};
