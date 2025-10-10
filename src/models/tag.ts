import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true  
    }
});

const tagModel = mongoose.model("Tags", tagSchema);
export default tagModel;