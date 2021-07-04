const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post('/reqister', async (req, res) => {
 try {
   const { email, password } = req.body;
   
   const candidate = await User.findOne({ email });

   if (candidate) {
    return res.status(400).json({message: 'Такой пользователь уже существует'});
   }

   const hashedPassword = await bcrypt.hash(password, 12);
   const user = new User({ email, password: hashedPassword });

   await user.save();

   res.status(201).json({ message: 'Пользователь создан' });
  

 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так'});
 }
});

// /api/auth/login
router.post('/login', async (req, res) => {

});

module.exports = router;
