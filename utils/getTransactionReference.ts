import crypto from "crypto";

function generateTransactionReference() {
  const suffixStr = "viss-";
  return suffixStr + crypto.randomUUID();
}

export default generateTransactionReference;
