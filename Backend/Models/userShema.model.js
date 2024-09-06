import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: {
            type: String
        },
        skills: [{
            type: String
        }],
        resume: {
            type: String  // url of the resume file
        },
        resumeFullName: {
            type: String
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profileImg: {
            type: String, // url for cloudnary image
            default: ""
        }


    },



}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema);