import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export async function Encrypt(plainText: string): Promise<string> {
  try {
    return await bcrypt.hash(plainText, Number(process.env.SALT_ROUND));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function Decrypt(plainText: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plainText, hash)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function isStrongPassword(password: string): boolean{
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*@!#$%])[A-Za-z0-9*@!#$%]{6,}$/;
  return strongPasswordRegex.test(password);
}