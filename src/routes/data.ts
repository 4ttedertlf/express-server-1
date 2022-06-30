import express from "express";
import * as appPackage from "../../package.json";
const router = express.Router();
import * as database from "../azure/mongo-database";

router.use((req, res, next) => {

    next();
  });

router.get("/", async (req, res) => {
    try {
      // Get collection name from query string
      const collectionName = req.query.collection as string;
      if (!collectionName) return res.status(404).send("missing collection");
  
      const dataResult = await database.getAll(collectionName);
  
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