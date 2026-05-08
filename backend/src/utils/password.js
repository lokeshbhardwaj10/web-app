import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const hashPassword = async (password) => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
  return bcrypt.hash(password, rounds);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
