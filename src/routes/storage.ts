import express from "express";
import * as appPackage from "../../package.json";
const router = express.Router();
import { AzureStorageService } from "../azure/azure-blob-storage";

let storage:any =null;

router.use((req, res, next) => {

    next();
  });

router.get("/", async (req, res) => {
    try {

      if(!storage){
        storage = new AzureStorageService(req.app.locals.appConfiguration.storageName, req.app.locals.appConfiguration.storageSAS);
      }

      // Get collection name from query string
      const containerName = req.query.container as string;
      if (!containerName) return res.status(404).send("missing container");
  
      const dataResult = await storage.getBlobsInContainer(containerName);
  
      // Determine how much of a response to return
      if (req.query.verbose === "true") {
        // returns entire response
        return res.status(200).json(dataResult);
      } else {
        // returns reduced data set
        return res.status(200).json(dataResult);
      }
    } catch (err: any) {
      // shows entire the error message from Key Vault
      return res.status(500).send(err?.message);
    }
  });

  router.use("*", function (req, res) {
    return res.status(404).json({ status: "error" });
  });

  export default router;