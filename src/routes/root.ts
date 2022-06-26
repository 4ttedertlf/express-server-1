import express from "express";
const router = express.Router();

router.get("/", function (req, res) {
  try {
    if (req.query?.verbose === "true") {
      // returns entire key vault response
      return res.status(200).send("Root-verbose");
    } else {
      // returns current secret value
      return res.status(200).send("Root");
    }
  } catch (err: any) {
    // shows entire the error message from Key Vault
    return res.status(500).send(err?.message);
  }
});

export default router;
