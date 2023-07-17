import { createTransport } from "nodemailer";

const SendMail = (to,subject,text)=>{
    const email=process.env.EMAIL;
    const email_key=process.env.EMAIL_KEY;

    let transporter = createTransport({
        service:"gmail",
        auth:{
            user:email,
            pass:email_key
        }
    })

    let mailOptions={
        from:email,
        to:to,
        subject:subject,
        text:text
    }

    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            throw new Error("Failed to send email");
        }
        else{
            return "Email sent"
        }
    })
}

export default SendMail;