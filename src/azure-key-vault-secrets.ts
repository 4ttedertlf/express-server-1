import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

export class AzureKeyVaultSecrets {
  private azureCredential;
  private keyVaultName: string;
  private keyVaultUrl: string;
  private client: SecretClient;

  constructor(keyVaultName: string) {
    this.azureCredential = new DefaultAzureCredential();

    this.keyVaultName = keyVaultName;
    this.keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;

    this.client = new SecretClient(this.keyVaultUrl, this.azureCredential);
  }

  public async getSecret(secretName: string): Promise<any> {
    if (!secretName) return null;

    return await this.client.getSecret(secretName);
  }
}
