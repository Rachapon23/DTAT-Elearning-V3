const mongoose = require("mongoose");

const ResetPasswordSchema = new mongoose.Schema({

    email: {
        type: String,
    },
    token: {
        type: String,
    },
}, { timestamps: true });

module.exports = ResetPassword = mongoose.model("resetPassword", ResetPasswordSchema);