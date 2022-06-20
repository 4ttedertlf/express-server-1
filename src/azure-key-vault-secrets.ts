const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

export class AzureKeyVaultSecrets{

    private azureCredential;
    private keyVaultName: string;
    private keyVaultUrl: string;
    private client: typeof SecretClient; 

    constructor(keyVaultName: string){
        this.azureCredential = new DefaultAzureCredential();

        this.keyVaultName = keyVaultName;
        this.keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
        
        this.client = new SecretClient(this.keyVaultUrl, this.azureCredential);
    }
    public init(){

    }
    public async getSecret(secretName:string):Promise<any>{
        if(!secretName) return null;
        
        return await this.client.getSecret(secretName);
    }
}