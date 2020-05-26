const express = require("express");
const router = express.Router();

const app = express();

const get_route = require("./api/get");
const post_route = require("./api/post");
const put_route = require("./api/put");
const delete_route = require("./api/delete");

router.use("/user", get_route);
router.use("/user", post_route);
router.use("/user", put_route);
router.use("/user", delete_route);

module.exports = router;
