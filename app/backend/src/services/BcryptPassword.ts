import * as bcrypt from 'bcryptjs';

class EncryptPassword {
  static encrypt(password: string): string {
    const salt = bcrypt.genSaltSync(5);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  }

  static async checkPassword(password: string, passwordDb: string): Promise<boolean> {
    const isMatch = bcrypt.compareSync(password, passwordDb);
    return isMatch;
  }
}

export default EncryptPassword;
