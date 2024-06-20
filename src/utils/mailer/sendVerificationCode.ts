import { client, domain } from "./mailgunConfig";

const sendEmailVerificationCode = async (
  email: string,
  code: string | number,
) => {
  const mail_options = {
    from: "Viss Shopping <codeplugservices@gmail.com>",
    to: email,
    subject: "Password Reset 4 digit-Code",
    text: `Hello Dear,\n\nLet's help recover your account's access, use this code [ ${code} ] to reset your password.
    \nRegards,\nsystem-support@viss-shopping.com`,
  };

  return client.messages.create(domain as string, mail_options);
};

export default sendEmailVerificationCode;
