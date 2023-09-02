const express = require("express");
const router = express.Router();

const {postTransaction, getTransaction, deleteTransaction, updateTransaction} = require("../controllers/transactions");
const {registerUser, loginUser} = require("../controllers/auth");

router.get("/", (req, res)=>{
    res.send(`<h1>hello there from trans</h1>`)
    console.log("root node");
});

// transactions routes
router.post("/transaction", postTransaction);
router.get("/transaction", getTransaction);
router.delete('/transaction/:id', deleteTransaction);
router.patch('/transaction/:id', updateTransaction);

// auth routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

module.exports = router;