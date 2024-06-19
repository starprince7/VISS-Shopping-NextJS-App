import crypto from "crypto";

function generateTransactionReference() {
  const suffixStr = "V-ref";
  return suffixStr + crypto.randomUUID();
}

export default generateTransactionReference;

export function generateImagePublicId() {
  const suffixStr = "viss_storeId_";
  return suffixStr + crypto.randomUUID();
}
