import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './Routes/user.js';
import contactRouter from './Routes/contact.js';
import {config} from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());

//.env setup
config({path: '.env'});

//home route
app.get('/', (req, res) => {
    res.json("Welcome to Contact API");
});

//user Routes
//user register
// @api dsc :- user register
// @api method :- POST
// @api endPoint :- /api/user/register

// app.post('/api/user/register', register);

//user Login
// @api dsc :- user login
// @api method :- POST
// @api endPoint :- /api/user/login


//user routes
//register login
app.use("/api/user", userRouter);

//contact routes
app.use('/api/contact', contactRouter);


mongoose.connect(process.env.MONGO_URI,
    {
        dbName: "ContactAPI"
    }
).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});