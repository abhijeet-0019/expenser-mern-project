const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: props => `${props.value} is not a positive number!`
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
    },
    date: {
        type: Date,
        default: new Date(),
        index: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Transaction", transactionSchema);