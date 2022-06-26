import express, { Application, Request, Response } from "express";
import { AzureKeyVaultSecrets } from "./azure-key-vault-secrets";
import * as database from "./mongo-database";
import statusRouter from "./routes/status";
import * as appPackage from "../package.json";
import debug from "debug";
debug("express-react:server");
console.log(process.env);

const connectionString: string = process.env
  .AZURE_COSMOS_CONNECTION_STRING as string;
const databaseName: string =
  (process.env.AZURE_COSMOS_DATABASE_NAME as string) || "dev-server";

if (!connectionString) throw Error("No database connection string found");

const app: Application = express();

if (!connectionString) throw Error("connection string is empty");
console.log(`Database name = ${databaseName}`);

database
  .connectApp(connectionString, databaseName)
  .then(() => {
    console.log(`Database is connected`);
  })
  .catch((err) => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    process.exit();
  });

  app.use(function(req, res, next) {
    res.setHeader('appver', appPackage.version || 'null' )
    next();
  });

app.get("/", async (req: Request, res: Response) => {
  try {
    if (req.query?.verbose === "true") {
      // returns entire key vault response
      res.status(200).send("Root-verbose");
    } else {
      // returns current secret value
      res.status(200).send("Root");
    }
  } catch (err: any) {
    // shows entire the error message from Key Vault
    res.status(500).send(err?.message);
  }
});
app.use("/api/status", statusRouter);
/*

    ?secret=secretname&verbose=true
    ?secret=secretname

    */
app.get("/secret", async (req: Request, res: Response) => {
  try {
    // Azure Key Vault
    const keyVaultName = process.env.AZURE_KEY_VAULT_NAME as string;
    console.log(`keyVaultName = ${keyVaultName}`);
    if (!keyVaultName) res.status(500).send("App not configured correctly");
    const keyVaultSecret = new AzureKeyVaultSecrets(keyVaultName);

    // Get secret name from query string
    const secret = await keyVaultSecret.getSecret(req.query.secret as string);

    // Determine how much of a response to return
    if (req.query.verbose === "true") {
      // returns entire key vault response
      res.status(200).send(secret);
    } else {
      // returns current secret value
      res.status(200).send(secret?.value);
    }
  } catch (err: any) {
    // shows entire the error message from Key Vault
    res.status(500).send(err?.message);
  }
});

app.get("/data", async (req: Request, res: Response) => {
  try {
    // Get collection name from query string
    const collectionName = req.query.collection as string;
    if (!collectionName) res.status(404).send("missing collection");

    const dataResult = await database.getAll(collectionName);

    // Determine how much of a response to return
    if (req.query.verbose === "true") {
      // returns entire response
      res.status(200).json(dataResult);
    } else {
      // returns reduced data set
      res.status(200).json(dataResult);
    }
  } catch (err: any) {
    // shows entire the error message from Key Vault
    res.status(500).send(err?.message);
  }
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).send("File not found");
});

export default app;
