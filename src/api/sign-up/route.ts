import connectDb from "@/lib/connectDb";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request: Request) {
    await connectDb()

    try {
        const {username, email, password} = await request.json()

        // Handling scenatrio where Username is Already Taken and verified 

        const existingVerfiedUserByUsername = await UserModel.findOne(
            {
                username, 
                isVerfied: true
            }
        )

        // user exist and verified
        if(existingVerfiedUserByUsername) {
            return Response.json({
                status: false,
                message: "Username is already taken"
            }, {status: 400})
        }

        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if(existingUserByEmail) {
            if(existingUserByEmail?.isVerfied) {
                return Response.json({
                    status: false,
                    message: "User Already exist with this email"
                }, { status: 400 })
            } else {
                const hashPassword = await bcrypt.hash(password, 10)
                const expiryDate = new Date()
                expiryDate.setHours(expiryDate.getHours() + 1)
                
                await UserModel.create({
                    username,
                    email,
                    password: hashPassword,
                    verifyCode,
                    verifyCodeExpiry: expiryDate,
                    isVerfied: false,
                    message: [],
                    isAcceptingMessage: true
                })
            }
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            
            await UserModel.create({
                username,
                email,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerfied: false,
                message: [],
                isAcceptingMessage: true
            })
        }

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if(!emailResponse.success) {
            return Response.json({
                status: false,
                message: emailResponse?.message
            }, { status: 500 })
        }

        return Response.json({
            status: true,
            message: "User registeres successfully, Please verify your email"
        }, { status: 200 })

    } catch (error) {
        console.error('Error Registering User :', error)
        return Response.json({
                success: false,
                message: "Error registering user"
            }, {
                status: 500
            })
    }
}

