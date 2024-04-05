import { connectdb } from "@/db/dbConfig";
import User from '@/models/userModel';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helper/mailer";
 
connectdb()
 export async function POST(request:NextRequest){
    try {
        const reqBody= await request.json()
        const {username,email, passoword} =reqBody
        console.log(reqBody);
        
        const user= await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(passoword,salt)

      const newUser =new User({
            username,
            email,
            passoword:hashedPassword,
        })
          
        const savedUser = await newUser.save()
        console.log(savedUser);

         //sending the verification email to the user 

        await sendEmail ({email,emailType:"VERIFY", userId:savedUser.id})
        return NextResponse.json({
            message:"User register successfully",
            success:true,
            savedUser
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},
        {status:500})
        
    }
 }