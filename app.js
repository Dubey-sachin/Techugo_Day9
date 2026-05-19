require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const User=require('./models/userModel');

const app=express();

app.use(express.json());

connectDB();

// app.get('/add-user',async(req,res)=>{
//     try {
//         const user=new User({
//             name:"sachin Dubey",
//             email:"Sachin@gmail.com",
//             age:24
//         })
//         await user.save();
//         res.send("User added");
//     } catch (error) {
//         if(error.code===11000)
//         {
//             res.send("This email already exists!");
//         }else{
//             res.send(error.message)
//         }
//     }
// })

// create

app.post('/add-user',  async (req,res)=>{

    try {
        const user= new User(req.body);
        await user.save();
        res.send("User ended");
    } catch (error) {
        if(error.code === 11000)
        {
            res.status(400).send("This email is already exists");
        }else
        {
            res.status(500).send(error.message);
        }
    }

});

// read user

app.get('/read-user',async(req,res)=>{
    try {
        const users= await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// read user by email

app.get('/read-user/:email',async (req,res)=>{
    try {
        const user=await User.findOne({email:req.params.email});
        if(!user) return res.status(404).send("User not found");
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message)
    }
});


// update by email
app.put('/update-user/:email', async (req, res) => {
try {
console.log("PARAM:", req.params.email); 

const user = await User.findOneAndUpdate(
{ email: req.params.email },
req.body,
{ returnDocument: 'after' }
);

if (!user) return res.status(404).send("User not found");

res.send("User updated successfully");
} catch (error) {
res.status(500).send(error.message);
}
});

// delete by email

app.delete('/delete-user/:email',async (req,res)=>{

    try {
        const user=await User.findOneAndDelete({email:req.params.email}) ;
    if(!user) return res.status(404).send("User not found");
    res.send("User deleted succcessefully");

    } catch (error) {
        res.status(500).send(error.message);
    }

})

app.listen(process.env.PORT,()=>{
    console.log("server is running on http://localhost/ 30000")
})
