const express=require('express');
const router=express.Router();
const User=require('../model/user');
const {jwtAuthmiddleware,generateToken}=require("../jwt.js");



router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);

        const response = await newUser.save();

        const payload = {
            id: response.id
        };

        const token = generateToken(payload);

        res.status(200).json({
            message: "Signup successful",
            token: token
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { aadharCardNumber, password } = req.body;

        console.log("Login data:", req.body);

        const user = await User.findOne({
            aadharCardNumber: aadharCardNumber
        });

        console.log("User found:", user);

        if (!user) {
    return res.status(401).json({
        error: "User not found"
    });
}

    const isMatch = await user.comparePassword(password);

    console.log("Password matched:", isMatch);

    if (!isMatch) {
    return res.status(401).json({
        error: "Password does not match"
    });
}


        const payload = {
            id: user.id
        };

        const token = generateToken(payload);

        res.json({ token });

    } catch (err) {
        console.error("LOGIN ERROR:", err);

        res.status(500).json({
            error: err.message
        });
    }
});


router.get('/profile', jwtAuthmiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const foundUser = await User.findById(userId)
            .select('-password -aadharCardNumber');

        if (!foundUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.status(200).json(foundUser);

    } catch (err) {
        console.log('PROFILE ERROR:', err);

        res.status(500).json({
            error: 'Internal server error'
        });
    }
});



router.put('/profile/password', jwtAuthmiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const foundUser = await User.findById(userId);

        if (!foundUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const isMatch = await foundUser.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid username or password'
            });
        }

        foundUser.password = newPassword;
        await foundUser.save();

        res.status(200).json({
            message: 'Password updated successfully'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// ADD THIS HERE
router.get('/test', (req, res) => {
  res.send("User route is working");
});


module.exports=router;