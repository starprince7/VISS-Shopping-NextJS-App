import formData from "form-data";
import Mailgun from "mailgun.js";

// Instance of mailgun
const mailgun = new Mailgun(formData);

const auth_credentials = {
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: "https://api.eu.mailgun.net",
};

// Domain & Client
export const domain = process.env.DOMAIN;
export const client = mailgun.client(auth_credentials);
