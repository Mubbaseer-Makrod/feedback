import ApiResponse from "../../types/ApiResponse";
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
) : Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Hello world',
            react: VerificationEmail({ username, otp: verifyCode }),
          }); 

        return {
            success: true,
            message: "Email send to user succesfully"
        }
        
    } catch (emailError) {
        console.error("Error sending Verfication Email :", emailError)
        return {
            success: false,
            message: "Failed to send verification email"
        }
    }
}