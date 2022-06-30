import express from "express";
import { AzureKeyVaultSecrets } from "../azure/azure-key-vault-secrets";
const router = express.Router();

router.use((req, res, next) => {

  next();
});

/*

    ?secret=secretname&verbose=true
    ?secret=secretname

    */
router.get("/", async (req, res) => {
  try {
    const secretName = req.query.secret as string;
    if (!secretName) {
      return res.status(404).send({ error: "no secret sent" });
    }

    // Azure Key Vault
    const keyVaultName = req.app.locals?.appConfiguration?.keyVaultName;
    if (!keyVaultName) {
      return res.status(500).send("Key vault name configured correctly");
    }
    const keyVaultSecret = new AzureKeyVaultSecrets(keyVaultName);

    // Get secret name from query string
    const secretResponse = await keyVaultSecret.getSecret(secretName);

    // Determine how much of a response to return
    if (req.query.verbose === "true") {
      // returns entire key vault response
      return res.status(200).send(secretResponse);
    } else {
      // returns current secret value
      return res.status(200).send(secretResponse?.value);
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
