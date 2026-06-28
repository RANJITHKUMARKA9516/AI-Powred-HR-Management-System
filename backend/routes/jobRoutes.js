const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            recruiterId: req.user.id
        });

        res.status(201).json(job);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {

    try {

        const jobs = await Job.find()
            .populate("recruiterId", "name company");

        res.status(200).json(jobs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Single Job
exports.getJobById = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)
            .populate("recruiterId", "name company");

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json(job);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update Job
exports.updateJob = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id);

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });

        }

        if (job.recruiterId.toString() !== req.user.id) {

            return res.status(403).json({
                message: "Unauthorized"
            });

        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedJob);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Job
exports.deleteJob = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id);

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });

        }

        if (job.recruiterId.toString() !== req.user.id) {

            return res.status(403).json({
                message: "Unauthorized"
            });

        }

        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Job deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};