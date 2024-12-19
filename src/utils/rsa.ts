import JSEncrypt from "jsencrypt";

const encrypt = new JSEncrypt();
const key =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh9KhlpsHcBONS6eBo2qMNPMq3F8Q0BHISSbydbf6pgHLUsjASw9YKXGuDUG494dAketj7wCMrXircU1boHnDHfB55ZDhqqi7I60fklA7rgNjfmW9sPTXST8Adz+5X+JePm81j0KLpgpfUbb0+k8MBuDKHm78brfyQlSfPUjP1Bdy5JypMJcP/KJ8kF0h4M5kZO0e0wrgGgIBbY4nXPi8objWzH2GUP5AaPAKtf7j30W8F60EAHC+9WTuJaPoUcewoN+TIidoVmUjxzfG++xFmxMTY9Vaw5oenwkrA3T3N/eNR5Dtcq6VZoKpb8VWZjjMb3gu4hZuMSL5M99GZGxOfwIDAQAB";
encrypt.setPublicKey(key);

/**
 * 加密消息
 * @param message
 */
export const encryptMessage = (message: string) => {
  return encrypt.encrypt(message) || "";
};
