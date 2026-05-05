import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    age: {
        type: Number,
        default: 18
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
});

const userModel = mongoose.model("users", userSchema);

export default userModel