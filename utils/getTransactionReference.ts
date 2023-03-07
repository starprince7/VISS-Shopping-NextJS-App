import crypto from "crypto";

function generateTransactionReference() {
  const suffixStr = "VS-";
  return suffixStr + crypto.randomUUID();
}

export default generateTransactionReference;

export function generateImagePublicId() {
  const suffixStr = "viss_store_";
  return suffixStr + crypto.randomUUID();
}
