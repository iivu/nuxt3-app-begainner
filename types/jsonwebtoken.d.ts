import { Secret, SignCallback, JwtPayload } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  interface JSONWebToken {
    sign(payload: string | Buffer | object, secretOrPrivateKey: Secret, callback: SignCallback): void;
    sign(payload: string | Buffer | object, secretOrPrivateKey: Secret, options: SignOptions, callback: SignCallback): void;
    sign(payload: string | Buffer | object, secretOrPrivateKey: null, options: SignOptions & { algorithm: 'none' }, callback: SignCallback): void;
    sign(payload: string | Buffer | object, secretOrPrivateKey: Secret, options?: SignOptions): string;
    sign(payload: string | Buffer | object, secretOrPrivateKey: null, options?: SignOptions & { algorithm: 'none' }): string;
    everify(token: string, secretOrPublicKey: Secret, options: VerifyOptions & { complete: true }): Jwt;
    verify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions & { complete?: false }): JwtPayload | string;
    verify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions): Jwt | JwtPayload | string;
    verify(token: string, secretOrPublicKey: Secret | GetPublicKeyOrSecret, callback?: VerifyCallback<JwtPayload | string>): void;
    verify(
      token: string,
      secretOrPublicKey: Secret | GetPublicKeyOrSecret,
      options: VerifyOptions & { complete: true },
      callback?: VerifyCallback<Jwt>
    ): void;
    verify(
      token: string,
      secretOrPublicKey: Secret | GetPublicKeyOrSecret,
      options?: VerifyOptions & { complete?: false },
      callback?: VerifyCallback<JwtPayload | string>
    ): void;
    verify(token: string, secretOrPublicKey: Secret | GetPublicKeyOrSecret, options?: VerifyOptions, callback?: VerifyCallback): void;
  }
  const jsonwebtoken: JSONWebToken;
  export default jsonwebtoken;
}
