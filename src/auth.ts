import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const checkPasswordHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
