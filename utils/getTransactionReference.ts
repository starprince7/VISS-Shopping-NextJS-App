import crypto from "crypto";

function generateTransactionReference() {
  const suffixStr = "VS-";
  return suffixStr + crypto.randomUUID();
}

export default generateTransactionReference;
