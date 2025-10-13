import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    link: {
        type : String,
        required : true
    },

    userId: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

const linkModel = mongoose.model("linkSchema",linkSchema );
export default linkModel;