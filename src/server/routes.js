const express = require("express");
const router = express.Router();

const app = express();

const get_college = require("./api/getCollege");
const get_address=require("./api/getAddress")
const post_route = require("./api/post");
const put_route = require("./api/put");
const delete_route = require("./api/delete");

router.use("/college", get_college);
router.use("/address",get_address);
router.use("/user", post_route);
router.use("/user", put_route);
router.use("/user", delete_route);

module.exports = router;
