import mongoose, {Schema, Document} from "mongoose";
import { boolean } from "zod";


export interface Message extends Document {
    content: string,
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerfied: boolean,
    message: Message[],
    isAcceptingMessage: boolean
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        require: [true, "Please provide username"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        require: [true, "Please provide email"],
        unique: true,
        match: [/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm, "Please use valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
    },
    verifyCodeExpiry: {
        type: Date,
    },
    isVerfied: {
        type: Boolean,
        required: true,
        default: false
    },
    message: [MessageSchema],
    isAcceptingMessage: {
        type: Boolean,
        required: true,
        default: true
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model("User", UserSchema)

export default UserModel