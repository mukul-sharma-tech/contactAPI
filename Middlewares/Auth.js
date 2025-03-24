// Authentication ka middle ware-> only allow CRUD operations if user is logged in

import jwt from 'jsonwebtoken';
import {User} from '../Models/User.js';
import {config} from 'dotenv';

// config({path: './.env'});


export const isAuthenticated = async (req, res, next) => {
    const token = req.header('Auth');
    //verify token
    if (!token) {
        return res.status(401).json({ message: "Access Denied Login First" });
    }

    // const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.userId;
    
    let user = await User.findById(id);
    if (!user) {
        return res.status(401).json({ message: "User Not Found" });
    }

    req.user = user;
    next();
}