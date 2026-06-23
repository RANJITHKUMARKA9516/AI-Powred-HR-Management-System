const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicant",
        required: true
    },

    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    status: {
        type: String,
        enum: [
            "Applied",
            "Shortlisted",
            "Interview",
            "Offered",
            "Rejected"
        ],
        default: "Applied"
    },

    aiScore: {
        type: Number,
        default: 0
    },

    aiSummary: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Application", applicationSchema);