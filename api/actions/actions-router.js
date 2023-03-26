// "eylem" routerını buraya yazın
const express = require("express");
const router = express.Router();
const actionModel = require("./actions-model");
const mw = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    let allActions = await actionModel.get();
    res.json(allActions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkActionId, async (req, res, next) => {
  try {
    res.json(req.existAction);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.checkPayloadAction, async (req, res, next) => {
  try {
    let insertedAction = await actionModel.insert(req.actionPayload);
    res.json(insertedAction);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.checkActionId,
  mw.checkPayloadAction,
  async (req, res, next) => {
    try {
      let updatedAction = await actionModel.update(
        req.params.id,
        req.actionPayload
      );
      res.json(updatedAction);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkActionId, async (req, res, next) => {
  try {
    await actionModel.remove(req.params.id);
    res.json({ message: "Action silme işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
