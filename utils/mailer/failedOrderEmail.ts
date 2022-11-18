import { Order } from "../../types";
import { client, domain } from "./mailgunConfig";

const sendFailedOrderEmail = async (order: Order) => {
  console.log("Sending failed order email!...");
  const mail_options = {
    from: "Viss Store <codeplugservices@gmail.com>",
    to: order.customer.email as string,
    subject: "Item Purchase Failed",
    text: `Hi ${order.customer?.name?.firstname},\n\nThis is to notify you that your order with the order no: ${order.orderNo} was not successful, please contact support with your order no.
    \nRegards,\nsystem@viss-shopping.com`,
  };

  return await client.messages.create(domain, mail_options);
};

export default sendFailedOrderEmail;
