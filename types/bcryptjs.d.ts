import bcryptjs from 'bcryptjs';

interface BcryptObject {
  setRandomFallback(random: (random: number) => number[]): void;
  genSaltSync(rounds?: number): string;
  genSalt(rounds?: number): Promise<string>;
  genSalt(callback: (err: Error, salt: string) => void): void;
  genSalt(rounds: number, callback: (err: Error, salt: string) => void): void;
  hashSync(s: string, salt?: number | string): string;
  hash(s: string, salt: number | string): Promise<string>;
  hash(s: string, salt: number | string, callback?: (err: Error, hash: string) => void, progressCallback?: (percent: number) => void): void;
  compareSync(s: string, hash: string): boolean;
  compare(s: string, hash: string): Promise<boolean>;
  compare(s: string, hash: string, callback?: (err: Error, success: boolean) => void, progressCallback?: (percent: number) => void): void;
  getRounds(hash: string): number;
  getSalt(hash: string): string;
  encodeBase64(b: Readonly<ArrayLike<number>>, len: number): string;
  decodeBase64(s: string, len: number): number[];
}

declare module 'bcryptjs' {
  const bcrypt: BcryptObject;
  export default bcrypt;
}
