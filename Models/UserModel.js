import mongoose from "mongoose";
import LinkModel from "./LinkModel.js";

const UserSchema = mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    links: { type: [LinkModel.schema], required: false }
});

export default mongoose.model("user", UserSchema);