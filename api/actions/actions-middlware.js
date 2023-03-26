// eylemlerle ilgili ara katman yazılımları yazın
const actionModel = require("./actions-model");
const projectModel = require("../projects/projects-model");

async function checkActionId(req, res, next) {
  try {
    const isExistAction = await actionModel.get(req.params.id);
    if (!isExistAction) {
      res.status(404).json({ message: "action not found" });
    } else {
      req.existAction = isExistAction;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function checkPayloadAction(req, res, next) {
  try {
    let { project_id, description, notes } = req.body;
    let isExistProject = await projectModel.get(project_id);
    let isValidLengthDescription = description && description.length < 128;

    if (!isValidLengthDescription || !notes || !isExistProject) {
      res.status(400).json({ message: "Girilen alanları kontrol ediniz" });
    } else {
      req.actionPayload = {
        project_id: project_id,
        description: description,
        notes: notes,
        completed: req.body.completed,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkActionId,
  checkPayloadAction,
};
