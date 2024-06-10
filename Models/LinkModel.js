import mongoose from "mongoose";

const ClickSchema = new mongoose.Schema({
    insertedAt: { type: mongoose.Schema.Types.Date, required: false },
    ipAddress: { type: mongoose.Schema.Types.String, required: true },
    targetParamValue: { type: mongoose.Schema.Types.String, required: false }
});

const TargetValueSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: false },
    value: { type: mongoose.Schema.Types.String, required: true }
});

const LinkSchema = new mongoose.Schema({
    originalUrl: { type: mongoose.Schema.Types.String, required: true, default: "new link" },
    clicks: [ClickSchema],
    targetParamName: { type: mongoose.Schema.Types.String, default: "t" },
    targetValues: [TargetValueSchema]
});

export default mongoose.model("link", LinkSchema);