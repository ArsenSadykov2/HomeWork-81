import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    link: {
        type: String,
        required: true,
    },
});

const Link = mongoose.model("Link", LinkSchema);
export default Link;