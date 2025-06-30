import { Resend } from "resend";

import FranchiseEmail from "../../../email/franchise-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "vonjovysalvador14@gmail.com",
    subject: "hello world",
    react: FranchiseEmail({ name }),
  });
}
