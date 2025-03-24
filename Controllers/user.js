import { User } from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

// config({ path: './.env' });

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // if(name == "" || email == "" || password == ""){
    //     res.json("Please fill all the fields");
    // }

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    let user = await User.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: "User Already Exists", success: false });
    }
    else {

        const hashPassword = await bcrypt.hash(password, 10); //length of password -> 10

        user = await User.create({ name, email, password: hashPassword });
        res.json({
            message: "User Registered",
            success: true,
            user: user
            // name: req.body.name,
            // email: req.body.email,
            // password: req.body.password,
        });
    }
    // console.log("Fetching Data : ", req.body);
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    let user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: "User Doesn't Exist", success: false });
    }
    else {
        //compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid Password", success: false });
        }
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.json({
        message: "User Logged In",
        welcome: `Welcome ${user.name}`,
        success: true,
        token: token,
        user: user
    });
}