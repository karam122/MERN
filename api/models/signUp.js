import mongoose from 'mongoose'

const SignUpSchema = mongoose.Schema({
    firstName: {
        type: String, require: true
    },
    lastName: {
        type: String, require: true
    },
    email: {
        type: String, require: true
    },
    address: {
        type: String, require: true
    },
    phone: {
        type: String, require: true
    },
    password: {
        type: String, require: true
    },
    image: {
        type: String, require: true
    },
    createdAt: {type : Date, Date: new Date() },
    token : String
})

const SignUpMessage = mongoose.model("SignUpMessage",SignUpSchema);

export default SignUpMessage;