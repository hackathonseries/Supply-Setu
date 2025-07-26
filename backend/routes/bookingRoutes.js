const express = require("express");
const router = express.Router();
const { bookItem } = require("../controllers/bookingController");

router.post("/book", bookItem);

module.exports = router;