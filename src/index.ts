import {
  BinaryToTextEncoding,
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual
} from 'crypto';

export enum HashAlgorithm {
  sha1 = 'sha1',
  sha256 = 'sha256',
  sha512 = 'sha512',
}

// enum EcryptionAlgorithm {
//   aes192 = 'aes192',
//   aes256 = 'aes256'
// }

export enum TextEncoding {
  base64 = 'base64',
  hex = 'hex'
}

export type JustHashOptions = {
  algorithm?: HashAlgorithm,
  encoding?: TextEncoding,
  salt_length?: number,
  key_length?: number,
}

class JustHash {
  private hash_algorithm: HashAlgorithm;
  private output_type: BinaryToTextEncoding;
  private salt_length: number;
  private key_length: number;

  constructor(options?: JustHashOptions) {
    this.hash_algorithm = options?.algorithm ?? HashAlgorithm.sha512;
    this.output_type = options?.encoding ?? TextEncoding.hex;
    this.salt_length = options?.salt_length ?? 16;
    this.key_length = options?.key_length ?? 64;
  }

  configure(options?: JustHashOptions) {
    this.hash_algorithm = options?.algorithm ?? this.hash_algorithm;
    this.output_type = options?.encoding ?? this.output_type;
    this.salt_length = options?.salt_length ?? this.salt_length;
    this.key_length = options?.key_length ?? this.key_length;
  }

  hashString(data: string): string {
    return createHash(this.hash_algorithm).update(data).digest(this.output_type);
  }

  hashPassword(password: string, loops: number = 1): string {
    const salt = randomBytes(this.salt_length).toString(this.output_type);
    let hash: Buffer | string = password;
    for (let i = 0; i < loops; i++) {
      hash = scryptSync(hash, salt, this.key_length)
    }
    return `${salt}:${hash.toString(this.output_type)}`;
  }

  validatePassword(provided_password: string, hashed_password: string, loops: number = 1): boolean {
    const [salt, key] = hashed_password.split(':');
    let provided_buffer: Buffer | string = provided_password;
    for (let i = 0; i < loops; i++) {
      provided_buffer = scryptSync(provided_buffer, salt, this.key_length);
    }
    const stored_buffer = Buffer.from(key, this.output_type);
    return timingSafeEqual(provided_buffer as unknown as Buffer, stored_buffer);
  }
}

export default new JustHash();
module.exports = new JustHash();