import cryptoJs from 'crypto-js';

export default class CommonUtils {
    private readonly secretKey: string;

    constructor() {
        this.secretKey = process.env.SECRET_KEY ?? this.throwMissingKeyError();
    }

    /**
     * Throws an error if the secret key is not provided.
     * @returns never
     */
    private throwMissingKeyError(): never {
        throw new Error("Please provide a secret key while starting execution!");
    }

    /**
     * Encrypts the given data using AES encryption.
     * @param data - The string to be encrypted.
     * @returns The encrypted data as a string.
     */
    public encryptData(data: string): string {
        try {
            const encryptedData = cryptoJs.AES.encrypt(data, this.secretKey).toString();
            return encryptedData;
        } catch (error) {
            throw new Error("Failed to encrypt data.");
        } 
    }

    /**
     * Decrypts the given encrypted data using AES decryption.
     * @param data - The encrypted string to be decrypted.
     * @returns The decrypted data as a string.
     */
    public decryptData(data: string): string {
        try {
            const decryptedData = cryptoJs.AES.decrypt(data, this.secretKey).toString(cryptoJs.enc.Utf8);
            return decryptedData;
        } catch (error) {
            throw new Error("Failed to decrypt data.");
        }
    }

    public getDataFromEnvFile(property: string): string {
        const value = process.env[property];
        if (!value) {
            throw new Error(`Environment variable ${property} is not defined`);
        }
        return value;
    }
}