const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const { createJob } = require("../controllers/jobController");

router.post("/create", verifyToken, createJob);

module.exports = router;
