const Transaction = require("../models/transaction");

const postTransaction = async(req, res)=>{
    try{

        const {amount, description, date} = req.body;
        const response = await Transaction.create({
            amount,
            description,
            date,
        })
        res.status(200).json(
            {
                success:true,
                data: response,
                message: "Entry Created Successfully"
            }
        )
    }catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "unable to post transaction",
            message: err.message
        })
    }
}

const getTransaction = async(req, res)=>{
    try{
        const response = await Transaction.find({}).sort({createdAt: -1});
        res.status(200).json(
            {
                success:true,
                data: response,
                message: "Entries Fetched Successfully"
            }
        )
    }catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "unable to fetch transaction",
            message: err.message
        })
    }
}


module.exports = {postTransaction, getTransaction}