const Transaction = require("../models/transaction");

const postTransaction = async (req, res) => {
    try {
        const { amount, description, date } = req.body;
        console.log(req.body.amount);
        const response = await Transaction.create({
            amount,
            description,
            date,
        })
        res.status(200).json(
            {
                success: true,
                data: response,
                message: "Entry Created Successfully"
            }
        )
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "unable to post transaction",
            message: err.message
        })
    }
}

const getTransaction = async (req, res) => {
    try {
        const response = await Transaction.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: response,
            message: "Entries Fetched Successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: null,
            message: "Unable to fetch transactions",
            error: err.message
        });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("updated body", req.body.amount);
        const { amount, description, date } = req.body;
        const response = await Transaction.findByIdAndUpdate({ _id: id },
            {
                $set: {
                    amount,
                    description,
                    date
                }
            },
            { new: true }
        );
        res.status(200).json(
            {
                success: true,
                response: response,
                message: "Entry Updated Successfully"
            }
        )
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "unable to update transaction",
            message: err.message
        })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log("id -> ", id);
        await Transaction.findOneAndDelete({ _id: id });
        res.status(200).json(
            {
                success: true,
                message: "Entry Deleted Successfully"
            }
        )
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "unable to delete transaction",
            message: err.message
        })
    }
}

module.exports = { postTransaction, getTransaction, deleteTransaction, updateTransaction }