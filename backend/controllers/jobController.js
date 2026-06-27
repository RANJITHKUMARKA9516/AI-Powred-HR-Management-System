const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiterId: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
