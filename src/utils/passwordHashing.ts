import bcrypt from "bcrypt";

type Password = string | number;

async function hashPassword(password: Password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export default hashPassword;
