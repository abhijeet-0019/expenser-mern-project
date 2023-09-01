const express = require("express");
const router = express.Router();

const {postTransaction, getTransaction, deleteTransaction, updateTransaction} = require("../controllers/transactions");

router.get("/", (req, res)=>{
    res.send(`<h1>hello there from trans</h1>`)
    console.log("root node");
});

router.post("/transaction", postTransaction);
router.get("/transaction", getTransaction);
router.delete('/transaction/:id', deleteTransaction);
router.patch('/transaction/:id', updateTransaction);

module.exports = router;