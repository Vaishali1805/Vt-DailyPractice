import { sendResponse } from "../utils/helper.js";
import sendEmail from "../utils/mailAuth.js";
import { setOtp } from "../utils/otpStore.js";

//send otp to email
export const handleVerifyEmail = async (req, res) => {
  try {
    let { email } = req.body || {};
    console.log("email: ",email);
    if (!email) return sendResponse(res, "No data received", false, 400);

    //Generate the otp and send it to the mail
    const otp = await sendEmail(email);
    setOtp(email, otp);
    return sendResponse(res, "OTP sent to your email", true, 200);
  } catch (error) {
    console.log("verify email error: ", error);
    sendResponse(res, "Otp sent failed", false, 500);
  }
};
