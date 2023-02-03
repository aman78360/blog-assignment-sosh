const router = require("express").Router();
const blogController = require("../controllers/blogController");
const requireUser = require("../middlewares/requireUser");

router.post("/", requireUser, blogController.createBlogController);
router.get("/blog", blogController.getBlogsController);
router.put("/", requireUser, blogController.updateBlogController);
router.delete("/", requireUser, blogController.deleteBlogController);

module.exports = router;
