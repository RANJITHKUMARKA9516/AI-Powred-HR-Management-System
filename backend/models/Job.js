const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    skillsRequired: [
        {
            type: String
        }
    ],

    salary: {
        type: Number
    },

    location: {
        type: String
    },

    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiter",
        required: true
    },

    status: {
        type: String,
        enum: ["active", "archived"],
        default: "active"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Job", jobSchema);