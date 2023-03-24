import { client, domain } from "./mailgunConfig";

const emailAdminCreationLink = async (email: string, url: string) => {
  const messageBody = `Hi there,\n\nYou have been invited to create an administrator account for VISS STORE's admin panel, use the link below to signup\n\n${url}\n\nIf you have received this email in error, no further action is required, kindly delete.`;

  const mail_options = {
    from: "Viss Store <codeplugservices@gmail.com>",
    to: email,
    subject: "Create Your Administrator Account",
    text: messageBody,
  };

  return client.messages.create(domain as string, mail_options);
};

export default emailAdminCreationLink;
