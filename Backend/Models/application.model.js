import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    job: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "job",
            required: true
        }
    ],
    applicants: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected']
    }
}, {
    timestamps: true
})

export const Application = mongoose.model('Application', applicationSchema);