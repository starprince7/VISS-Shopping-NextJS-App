import { client, domain } from "./mailgunConfig";

const sendEmailWithError = async (email: string, error: string) => {
  const mail_options = {
    from: "Viss Shopping <codeplugservices@gmail.com>",
    to: email,
    subject: "Error Occurred In Mobile App",
    text: `Hey Dev,\n\nAn error has occurred in your app, below is the error object.\n\n ${error}
    \nRegards,\nsystem@vissstore.com`,
  };

  return client.messages.create(domain as string, mail_options);
};

export default sendEmailWithError;
