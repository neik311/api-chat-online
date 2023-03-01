import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.EMAIL_VALIDATE_ACCOUNT || "kienn6181@gmail.com",
    pass: process.env.EMAIL_VALIDATE_PASSWORD || "pruaxgkkcsmpbrpa",
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log({ error });
  } else {
    console.log({ success });
  }
});

const sendVerificationEmail = async (email: string, uniqueString: string) => {
  const currentUrl = "http://192.168.2.19:8088";
  const mailOption = {
    from: process.env.EMAIL_VALIDATE_ACCOUNT || "kienn6181@gmail.com",
    to: email,
    subject: "verify your email",
    html: `<div style="display: flex; margin: 0 auto; justify-content: center; align-items: center; height: 100vh; font-family: Arial, Helvetica, sans-serif; box-sizing: border-box;">
      <div style="width: 600px; padding: 20px 8%; text-align: center; background-color: #fff; border-radius: 12px; color: #333;">
          <p style="font-size: 18px; color: #888;">Thank you for registering!</p>
          <img src="https://i.pinimg.com/originals/ff/d2/c2/ffd2c238fb713dbf7872626b493f2a81.jpg" alt="email" width="300px">
          <h1>Verify your email address</h1>
          <p><p>Verify your email address to complete the signup and login your account.</p><p>This link <b>expires in 60 Minutes</b>.</p><p>Press <a href=${
            currentUrl + "/user/verify/" + email + "/" + uniqueString
          }> here</a> to proceed</p>
      </div>
  </div>`,
  };
  await transporter.sendMail(mailOption);
};

export { sendVerificationEmail };
