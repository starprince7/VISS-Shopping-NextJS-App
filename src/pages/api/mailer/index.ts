import query from "query-string";

import { mailer } from "../../../utils/mailer/mailgunConfig";

async function ApiMailHandler(req, res) {
  const { method } = req;
  let isSent: boolean | undefined = false;

  if (method === "GET") {
    const { to, data, subject } = query.parse(req.url?.split("?")[1]);
    if (!to || !data) {
      return res.status(400).json({ message: "Missing request parameter" });
    }
    isSent = await handleMailing({ to, data, subject });
    if (isSent) res.status(200).send({ message: "Email sent!", success: true });
    else {
      res
        .status(500)
        .send({ message: "Something went wrong with the mailing server." });
    }
  } else if (method === "POST") {
    const { to = "", data, subject } = req.body;
    if (!to || !data) {
      return res.status(400).json({ message: "Missing request parameter" });
    }
    isSent = await handleMailing({ to, data, subject });
    if (isSent) res.status(200).send({ message: "Email sent!", success: true });
    else {
      res
        .status(500)
        .send({ message: "Something went wrong with the mailing server." });
    }
  } else if (method === "OPTIONS") {
    res.status(204).end();
  } else {
    res.status(405).send({ error: `Sorry, method ${method} not allowed!` });
  }
}

const handleMailing = async ({ to, data, subject }) => {
  const customSubject = "Custom Mailer";
  const mailOptions = {
    from: "CUSTOM MAIL SERVER <systems@cryptoearn.co.uk>",
    to,
    subject: subject || customSubject,
    text: JSON.stringify(data),
  };

  try {
    console.log("Sending mail...");
    const result = await mailer(mailOptions);
    console.log("SUCCESS sending e-mail!");
    return true;
  } catch (e) {
    console.log("ERROR sending e-mail.", e);
  }
};

export default ApiMailHandler;
