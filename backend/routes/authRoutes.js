const express = require("express");

const router = express.Router();

const {
    registerRecruiter,
    loginRecruiter,
    registerApplicant,
    loginApplicant
} = require("../controllers/authController");

router.post(
    "/recruiter/register",
    registerRecruiter
);

router.post(
    "/recruiter/login",
    loginRecruiter
);

router.post(
    "/applicant/register",
    registerApplicant
);

router.post(
    "/applicant/login",
    loginApplicant
);

module.exports = router;