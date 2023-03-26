// "project" routerını buraya yazın!
const express = require("express");
const router = express.Router();
const projectModel = require("./projects-model");
const mw = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allProjects = await projectModel.get();
    res.status(200).json(allProjects);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", mw.checkProjectId, async (req, res, next) => {
  try {
    res.json(req.project);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.checkPayload, async (req, res, next) => {
  try {
    let insertedProject = await projectModel.insert(req.payloadProject);
    res.json(insertedProject);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.checkProjectId,
  mw.checkPayload,
  async (req, res, next) => {
    try {
      let updatedProject = await projectModel.update(
        req.params.id,
        req.payloadProject
      );
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkProjectId, async (req, res, next) => {
  try {
    await projectModel.remove(req.params.id);
    res.json({ message: "Silme işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", mw.checkProjectId, async (req, res, next) => {
  try {
    let result = await projectModel.getProjectActions(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
