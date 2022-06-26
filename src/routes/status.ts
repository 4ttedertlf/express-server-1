import express from "express";
import * as appPackage from "../../package.json";
const router = express.Router();

router.use((req, res, next) => {

  next();
});

/* GET status. */
//curl -X GET "http://localhost:8080/api/status"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.get("/", function (req, res) {
  return res.status(200).json({
    version: appPackage?.version,
  });
});

router.use("*", function (req, res) {
  return res.status(404).json({ status: "error" });
});

export default router;
