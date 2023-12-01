const { Router } = require("express");
const Authorization = require("../../common/guard/authorization.guard");
const categoryController = require("./category.controller");
const router = Router();

router.post("/create", Authorization, categoryController.create);
router.put("/update", Authorization, categoryController.update);
router.delete("/remove", Authorization, categoryController.remove);
router.get("/all", categoryController.findAll);

module.exports = {
  CategoryRouter: router,
};
