import bcrypt from "bcrypt";
import Admin from "../database/models/adminSchema";
import { Administrator } from "../types";

type Login = {
  error: string | null;
  admin: Administrator | null;
};

async function logInAdmin(email: string, password: string): Promise<Login> {
  const profile: Login["admin"] = await Admin.findOne({ email });

  // check for profile, No profile found.
  if (!profile) {
    return {
      admin: null,
      error: "This email address does not belong to an administrator account.",
    };
  }
  // Here profile found, compare passwords
  const passwordMatched = await bcrypt.compare(password, profile.password);
  if (passwordMatched) {
    profile.password = "";
    return { error: null, admin: profile };
  }
  // Here passwords do not match.
  return { admin: null, error: "You entered an incorrect password" };
}

export default logInAdmin;
