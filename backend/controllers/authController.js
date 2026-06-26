const Recruiter = require("../models/Recruiter");
const Applicant = require("../models/Applicant");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Recruiter Register

exports.registerRecruiter = async (req, res) => {
    try {

        const { name, email, password, company } = req.body;

        const existingRecruiter = await Recruiter.findOne({ email });

        if (existingRecruiter) {
            return res.status(400).json({
                message: "Recruiter already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const recruiter = await Recruiter.create({
            name,
            email,
            password: hashedPassword,
            company
        });

        res.status(201).json({
            success: true,
            recruiter
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Recruiter Login

exports.loginRecruiter = async (req, res) => {

    try {

        const { email, password } = req.body;

        const recruiter = await Recruiter.findOne({ email });

        if (!recruiter) {
            return res.status(404).json({
                message: "Recruiter not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            recruiter.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id: recruiter._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            token,
            recruiter
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// Applicant Register

exports.registerApplicant = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        const applicantExists =
            await Applicant.findOne({ email });

        if (applicantExists) {
            return res.status(400).json({
                message: "Applicant already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const applicant =
            await Applicant.create({
                name,
                email,
                password: hashedPassword
            });

        res.status(201).json({
            success: true,
            applicant
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// Applicant Login

exports.loginApplicant = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const applicant =
            await Applicant.findOne({ email });

        if (!applicant) {

            return res.status(404).json({
                message: "Applicant not found"
            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                applicant.password
            );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Credentials"
            });

        }

        const token = jwt.sign(
            {
                id: applicant._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            token,
            applicant
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};