const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");

router.post("/submit", leadController.createLead);

module.exports = router;