const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    skills: [
        {
            type: String
        }
    ],

    experience: {
        type: Number,
        default: 0
    },

    resumeUrl: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Applicant", applicantSchema);