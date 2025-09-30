import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    authorName: {
        type: String,
        required: true,
    },
    authorUsername: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    //   Extra features to be added later
    edited: {
        type: Boolean,
        default: false,
    },
    lastEditedAt: {
        type: Date,
        default: null,
    }
})

export const blogModel = mongoose.model('blogModel', blogSchema)