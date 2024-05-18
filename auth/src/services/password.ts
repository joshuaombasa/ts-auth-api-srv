import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buff = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buff.toString('hex')}.${salt}`;
  }

  static async compare(suppliedPassword: string, storedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buff = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buff.toString('hex') === hashedPassword;
  }
}

export { Password };
