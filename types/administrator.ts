export type Administrator = {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  date_registered: string;
  verification_code: number;
  isSuperAdmin: boolean;
};
