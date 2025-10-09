// app/api/send-email/route.ts
// app/api/send-email/route.ts (Next.js 13+)
import { NextResponse } from "next/server";
import Brevo from "@getbrevo/brevo";
import hero from "@/public/Image 3.png";
import logo from "@/public/Layer 1.png";
import gmail from "@/public/gmail.png";
import facebook from "@/public/Facebook.png";
import twitter from "@/public/twitter.png";
import instagram from "@/public/instagram.png";
import linkedin from "@/public/linkedin.png";

export async function POST(req: Request) {
  const body = await req.json();
  const { to, subject, name } = body;

  const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:3000";


    const htmlContent = `
  <div style="margin:0;padding:0;background-color:#f5f6fa;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="background-color:#111827;padding:20px 30px;color:#ffffff;display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;">
            <img src="${baseUrl}/Layer 1.png" alt="Leading Alpha Logo" style="height:35px;margin-right:10px;" />
          </div>
          <span style="font-size:13px;color:#d1d5db;">Systematic trading education & automation</span>
        </td>
      </tr>

      <!-- Title -->
      <tr>
        <td style="padding:30px 20px 10px;text-align:center;">
          <h2 style="font-size:22px;color:#111827;margin:0;">Hello there, you are in!</h2>
        </td>
      </tr>

      <!-- Hero Image -->
      <tr>
        <td style="text-align:center;padding:0 20px;">
            <img src="${baseUrl}/Image 3.png"
               alt="Welcome" 
               style="width:100%;border-radius:8px;margin:10px 0;object-fit:cover;"
            />
        </td>
      </tr>

      <!-- Body Text -->
      <tr>
        <td style="padding:10px 30px 0;color:#374151;font-size:15px;line-height:1.6;">
          <p style="margin:0;">Hi ${name},</p>
          <p style="margin:10px 0;">
            You’ve successfully reserved your seat for the upcoming <strong>Ostivities Event Experience</strong>!
          </p>
          <p style="margin:10px 0;">
            Over the next few weeks, you’ll gain access to exclusive content, resources, and hands-on experiences to help you make the most out of our community events.
          </p>
          <p style="margin:10px 0;">
            To stay updated, connect with other participants, and get exclusive perks, join our community below:
          </p>
        </td>
      </tr>

      <!-- CTA Button -->
      <tr>
        <td style="text-align:center;padding:25px 0;">
          <a href="https://discord.gg/CFVDGuywWX" target="_blank" rel="noopener noreferrer"
             style="background-color:#16a34a;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;display:inline-block;">
            Join The Discord Community
          </a>
        </td>
      </tr>

      <!-- Footer Text -->
      <tr>
        <td style="padding:0 30px 20px;color:#6b7280;font-size:14px;text-align:center;line-height:1.5;">
          <p style="margin:0;">
            We’ll be sharing all important announcements, learning resources, and live session links on Discord — don’t miss out!
          </p>
        </td>
      </tr>

      <!-- Divider -->
      <tr>
        <td style="border-top:1px solid #e5e7eb;margin-top:20px;"></td>
      </tr>

      <!-- Footer with Socials -->
      <tr>
        <td style="text-align:center;padding:20px;">
          <p style="color:#6b7280;font-size:13px;margin-bottom:10px;">Have questions? Contact us</p>
          <div>
            <a href="mailto:info@leadingalpha.co" style="margin:0 5px;">
              <img src="${baseUrl}/gmail.png" width="18" alt="Gmail"/>
            </a>
            <a href="https://www.facebook.com/leadingalpha_" style="margin:0 5px;">
              <img src="${baseUrl}/Facebook.png" width="18" alt="Facebook"/>
            </a>
            <a href="https://x.com/leadingalpha_" style="margin:0 5px;">
              <img src="${baseUrl}/twitter.png" width="18" alt="Twitter"/>
            </a>
            <a href="https://instagram.com/leadingalpha_" style="margin:0 5px;">
              <img src="${baseUrl}/instagram.png" width="18" alt="Instagram"/>
            </a>
            <a href="https://www.linkedin.com/in/leading-alpha-technologies-leading-alpha-87ab09386?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" style="margin:0 5px;">
              <img src="${baseUrl}/linkedin.png" width="18" alt="LinkedIn"/>
            </a>
          </div>
          <p style="color:#9ca3af;font-size:12px;margin-top:15px;">
            © ${new Date().getFullYear()} Ostivities. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </div>
`;

  const apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string
  );

  const email = new Brevo.SendSmtpEmail();
  email.subject = subject;
  email.htmlContent = htmlContent;
  email.sender = { name: "Your App", email: "kayode.raimi123@gmail.com" };
  email.to = [{ email: to }];

try {
  const data = await apiInstance.sendTransacEmail(email);
  console.log("Brevo response:", data);
  return NextResponse.json({ success: true, data });
} catch (error: any) {
  console.error("Brevo send error:", error.response?.text || error);
  return NextResponse.json({ success: false, error }, { status: 500 });
}

}