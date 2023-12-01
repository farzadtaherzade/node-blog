const { Router } = require("express");
const Authorization = require("../../common/guard/authorization.guard");
const blogController = require("./blog.controller");
const { upload } = require("../../common/utils/multer");
const router = Router();

router.post(
  "/create",
  Authorization,
  upload.single("avatar"),
  blogController.create
);
router.put("/update/:slug", Authorization, blogController.update);
router.delete("/remove/:slug", Authorization, blogController.delete);
router.get("/all", blogController.findAll);
router.get("/:slug", blogController.find);

module.exports = {
  BlogRouter: router,
};
