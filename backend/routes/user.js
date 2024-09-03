const express  = require("express");
const zod = require("zod");
const router  = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware, meMidWare } = require("../middlewares");

const { User, Account } = require("../db");


    const signupCredValidate = zod.object({ //signup schema of user
        username: zod.string().email(),
        password: zod.string(),
        firstName: zod.string(),
        lastName: zod.string()
    })

//SIGN  UP Route
router.post("/signup", async (req, res) => {
    const { success } = signupCredValidate.safeParse(req.body); //to chk enterd creds are valid/crct-format or not.

    if(!success){ //if enterd creds format is not right
        return res.status(411).json({ 
            message : " Entred Credentials format incorrect"
        })
    }
    console.log(req.body);
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser) {
        return res.status(411).json({ 
            message : "User already exists"
        })
    }

    const user = await User.create({ //if user not exist in DB create user
         username : req.body.username,
         password : req.body.password,
         firstName: req.body.firstName,
         lastName : req.body.lastName
    }) 
    const userId = user._id; //fetch just created user's _id of DB

     //add balance to user account 
      await Account.create({ //crt new entri on Acc-DB with just abv crtd user
        userId, //abv crtd user - same userID in Acc-DB, for refrencing/made connection b/w USer-Account DB
        balance: 1 + Math.random()*10000 // for each new-user put some money in thr acc

      })
      console.log(JWT_SECRET);
    const token = jwt.sign({userId}, JWT_SECRET); //generate token of each user-as per his unique UserID of DB

    return res.json({
        message: "User Created Successfully",
        token: token
    })
})

//SIGN IN Route

const siginCredvalidate = zod.object({
    username : zod.string().email(),
    password: zod.string()
})
router.post("/signin", async (req, res) => {
    const { success } = siginCredvalidate.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message : "Incorrect crerdentials"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
        
    })

    if(user) {
        const token = jwt.sign({userId: user._id}, JWT_SECRET);
        res.json({ 
           token: token
        })
        return;
    }

     res.status(411).json({
        message : "User does not exist"
    })
})

//User data Update in DB
const userCredUpdate = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const credVerify = userCredUpdate.safeParse(req.body);
    if(!credVerify) {
        return res.status(411).json({
            message: "Enterd credentials format invalid"
        })
    }

    await User.updateOne({_id: req.userId}, req.body)

    return res.status(200).json({
        message: "User details updated successfully"
    })

})

//Find users with their names to send them a money
router.get("/bulk", async (req, res) => {
    const filterVar = req.query.filter || ""; //req.query.filer = 'john' filterVar = john
    
    const users = await User.find({ //the john foun in what everthe userID;'s all those user sets inside users-array
        $or : [ //$or, cmd apply an array/list of conditions on some data 
            {firstName: {
                "$regex": filterVar //$regex-cmd to chk  filterVar(john) == firstName
            }},
            {lastName: {
                "$regex": filterVar
            }}
        ]
    })

    return res.json({
        user : users.map(user => ({ //this users-array users 'map' to list ofthe all users whose name = filterVar(john)
            //$ send response back in json-format to http w.r.t its username, firstname & lastname
            userId : user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }))
    })
})

//me


module.exports = router;