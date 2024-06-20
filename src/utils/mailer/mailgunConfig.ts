import formData from "form-data";
import Mailgun from "mailgun.js";

// Instance of mailgun
const mailgun = new Mailgun(formData);

const auth_credentials = {
  username: "api",
  key: process.env.MAILGUN_API_KEY as string,
  url: "https://api.eu.mailgun.net",
};

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
  rest?: any;
};

// Domain & Client
export const domain = process.env.DOMAIN;
export const client = mailgun.client(auth_credentials);

export async function mailer(mail_options: MailOptions) {
  return client.messages.create(domain as string, mail_options);
}
