const express = require('express');
const router = express.Router();
const User = require("../models/user")


router.post('/register', async (req, res) => {
 const {name ,email, password} = req.body;
 try{
const user = await User.create({
    name:name,
    email,
    password,

 })
 return res.status(200);
 }catch (e){
    return req.status(400);
  
 }
});


router.post('/login', async (req, res) => {
    
    try{
        const {email, password} = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);
        const user = await User.findOne({ email }).select('-password');
        return res.json({token, user});
    }catch(e){
        return res.send("Inncorect email or password");
    }
});


router.get('/:id/profile', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password'); // Exclude sensitive fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// router.get('/:id1/:id2', async (req, res)=>{
    
// try {
//     const userId = req.params.id2;
//     const user = await User.findById(userId).select('-password'); // Exclude sensitive fields

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

module.exports = router;
