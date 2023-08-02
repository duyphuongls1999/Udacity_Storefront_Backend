import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const tokenSecret: string = process.env.JWT_SECRET as string;
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);

export class Authentication {
  public static generateToken(id: number, username: string): string {
    return jwt.sign({ id, username }, tokenSecret, {
      expiresIn: "5h",
    });
  }

  public static async passwordCompare(
    text: string,
    encryptedText: string
  ): Promise<boolean> {
    return await bcrypt.compare(text, encryptedText);
  }

  public static passwordHash(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }
}
