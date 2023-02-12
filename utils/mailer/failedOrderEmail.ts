import { CustomerType, Order } from "../../types";
import { client, domain } from "./mailgunConfig";

const sendFailedOrderEmail = async (customer: CustomerType, txRef: string) => {
  console.log("Sending failed order email!...");
  const mail_options = {
    from: "Viss Store <codeplugservices@gmail.com>",
    to: customer.email as string,
    subject: "Item Purchase Failed",
    text: `Hi ${customer.name?.firstname},\n\nThis is to notify you that your order with the order no: ${txRef} was not successful, please contact support with your order no.
    \nRegards,\nsystem@viss-shopping.com`,
  };

  return client.messages.create(domain as string, mail_options);
};

export default sendFailedOrderEmail;
