import mongoose from "mongoose";

type Type = "Link" | "Video" | "image" | "Tweet";

interface ContentData {
    link : String;
    type : Type;
    title : String;
    tags? : mongoose.ObjectId[];
    userId : mongoose.ObjectId[];
}

const contentSchema = new mongoose.Schema<ContentData> ({
    link : {
        required : true,
        type: String
    },

    type : {
        required: true,
        enum : ["Link", "Video", "Image", "Tweet"]
    },

    title : {
        required: true,
        type: String,
    },

    

})