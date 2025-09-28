export interface TFHEKeys {
  client_key: string;
  server_key: string;
  public_key: string;
}

export interface TFHEConfigBuilder {
  default_parameters(): TFHEConfigBuilder;
  build(): unknown;
}

export interface EncryptedValue {
  // Giá trị ciphertext sau khi encrypt (Uint8Array hoặc object)
  data: Uint8Array | object;
}

export interface TFHE {
  // 🔑 Key Management
  ConfigBuilder: new () => TFHEConfigBuilder;
  generate_keys(config: unknown): TFHEKeys;

  // 🔐 Encryption / Decryption
  encrypt_uint32(value: number, clientKey: string): EncryptedValue;
  decrypt_uint32(data: EncryptedValue, clientKey: string): number;

  encrypt_uint64?(value: number, clientKey: string): EncryptedValue;
  decrypt_uint64?(data: EncryptedValue, clientKey: string): number;

  // ➕ Homomorphic Operations
  add(a: EncryptedValue, b: EncryptedValue, serverKey: string): EncryptedValue;
  sub(a: EncryptedValue, b: EncryptedValue, serverKey: string): EncryptedValue;
  mul?(a: EncryptedValue, b: EncryptedValue, serverKey: string): EncryptedValue;
  div?(a: EncryptedValue, b: EncryptedValue, serverKey: string): EncryptedValue;

  // ⚙️ Utils
  serialize?(value: EncryptedValue): string;
  deserialize?(value: string): EncryptedValue;
}

declare global {
  interface Window {
    TFHE?: TFHE;
  }
}

export {};
