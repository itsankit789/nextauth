import  bcryptjs  from 'bcryptjs';
import User from "@/models/userModel";
import nodemailer from "nodemailer";

export const sendEmail =async({email,emailType,userId}:any)=>{

    try {

      
      //task here: config mail for usage
      const hashedToken = await bcryptjs.hash(userId.toString(),10) 
      if(emailType==="VERIFY"){
          await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000})

        }else if(emailType==="REST"){
          await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000})

        }



        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });
          const mailOptions= {
            from: 'ankit@ankit.ai', // sender address
            to: email, // list of receivers
            subject: emailType=== 'VERIFY'?"Verify your email":"reset your passoword", // Subject line
            html: "<b>Hello world?</b>", // html body
          }

          const emailResponse=await transporter.sendMail(mailOptions)
          return emailResponse
    } catch (error:any) {
        throw new Error(error.message)
        
    }
};