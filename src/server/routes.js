const express = require("express");
const router = express.Router();

const app = express();

const get_college = require("./api/getCollege");
const get_address = require("./api/getAddress");
const filter_data = require("./api/filterData");
const get_course = require("./api/getCourse");

router.use("/college", get_college);
router.use("/address", get_address);
router.use("/course", get_course);
router.use("/filter", filter_data);

module.exports = router;
