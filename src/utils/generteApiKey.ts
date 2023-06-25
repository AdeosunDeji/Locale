export function generateApiKey(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let apiKey = "";

  for (let i = 0; i < length; i++) {
    apiKey += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return apiKey;
}