import { Router } from "express";
import jwt from "jsonwebtoken";
import { sample_users } from "../data";
import asynceHandler from "express-async-handler";
import { MineUserModel, User } from "../models/user.modle";
import { HTTP_BAD_REQUEST } from "../constants/http_request";
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asynceHandler(
    async (req, res) => {
        const usersCount = await MineUserModel.countDocuments();
        if (usersCount > 0) {
            res.send("seed already done !");
            return;
        }

        await MineUserModel.create(sample_users);
        res.send("seeded successfully !");
    }
))

router.post("/login", asynceHandler(
    async (req, res) => {
        const { email, password } = req.body; //destructuring the email and password from the request body
        const user = await MineUserModel.findOne({ email }); //find the user by email and password

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenResponce(user))
        }
        else {
            res.status(HTTP_BAD_REQUEST).send({ message: "Invalid email or password" });

        }
    }
))

router.post("/register",asynceHandler(
    async (req,res) => {
        const {email,password,address,name} = req.body;
        const user  = await MineUserModel.findOne({email});

        if(user)
        {
            res.status(HTTP_BAD_REQUEST).send({ message: "Email already in Use " });
            return;
        }

        const encryptedPassword = await bcrypt.hash(password,11);
        const newUser:User = {
            id:'',
            name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            address,
            isAdmin:false
        }

        const dbUser = await MineUserModel.create(newUser);
        res.send(generateTokenResponce(dbUser));
    }
))

const generateTokenResponce = (user : User) => {
    const token = jwt.sign({
      id: user.id, email:user.email, isAdmin: user.isAdmin
    },"kushagra",{
      expiresIn:"30d"
    });
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
  }


export default router;