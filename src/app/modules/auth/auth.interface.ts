export type TLoging = {
  email: string;
  password: string;
};
export type TPassword = {
  oldpassword: string;
  newpassword: string;
};

export type TUser = {
  name: string;
  email: string;
  number?: number;
  password: string;
  role: "user" | "admin";
};
