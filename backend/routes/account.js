const express = require("express");
const { authMiddleware } = require("../middlewares");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router  = express.Router();

//GET user account balance
router.get("/balance", authMiddleware, async (req, res) => {
    const userAccount = await Account.findOne({
        userId: req.userId //the usr which send a request, take that req-userID
    })
    return res.json({
        balance: userAccount.balance
    })
})

//POST: Transfer money from user-1 to user-2
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    (await session).startTransaction();
    const { amount, to }  = req.body;
    //From account -user
    const fromAccount = await Account.findOne({
        userId: req.userId
    }).session(session); //to fetch the account inside session

    if(!fromAccount || fromAccount.balance < amount) {
        (await session).abortTransaction();
        return res.status(411).json({
            message: "Insufficient balance"
        })
    }
    // To account user
    const toAccount = await Account.findOne({
        userId: to //tthe user whom we wanna  transfer money, he's acc-need-to-findout
    }).session(session); 

    if(!toAccount){
        (await session).abortTransaction();
        return res.status(411).json({
            message: "Invalid User"
        })
    }

    //Transfer takes place
    //from-user, deduct money from sender's side
    await Account.updateOne({
        userId: req.userId
    },{
        $inc : { //this, $inc - cmd does increase the amt in DB's balance-entry
            balance: -amount
        }
    }).session(session); //update the debited amt in 'fromAcc' inside session only

    //to-user, add money to reciever's side
    await Account.updateOne({
        userID: to //to == reciever
    },{
        $inc : { 
            balance : amount
        }
    }).session(session); //update the credited amt in 'toAcc' inside session only

    (await session).commitTransaction(); //till this pt. think as the all debit/credit/transctn changes in buffer
    //when the commitTrans hit then only made in DB else not

    res.json({
        message: "Transfer Successfull"
    })


})
module.exports = router;
