import {
    BlobServiceClient,
    BlockBlobClient,
    ContainerClient,
    BlobUploadCommonResponse,
  } from "@azure/storage-blob";
  
  export class AzureStorageService {
    blobServiceClient: BlobServiceClient;
    resourceName: string;
  
    constructor(resourceName: string, sasToken: string) {
      this.resourceName = resourceName;
      this.blobServiceClient = new BlobServiceClient(
        `https://${resourceName}.blob.core.windows.net/${sasToken}`
      );
    }
  
    // return list of blobs in container to display
    public getBlobsInContainer = async (containerName: string): Promise<any> => {
      const returnedBlobUrls: string[] = [];
  
      try {
        const containerClient =
          this.blobServiceClient.getContainerClient(containerName);
  
        const exists = await containerClient.exists();
  
        if (!exists) {
          throw Error(`Storage container ${containerName} doesn't exist.`);
        }
  
        // get list of blobs in container
        // eslint-disable-next-line
        for await (const blob of containerClient.listBlobsFlat()) {
          // if image is public, just construct URL
          returnedBlobUrls.push(
            `https://${this.resourceName}.blob.core.windows.net/${containerName}/${blob.name}`
          );
        }
  
        return returnedBlobUrls;
      } catch (err) {
         console.log(err);
         throw err;
      }
    };

    public async listContainers(): Promise<any> {
      const containerList: string[] = [];
  
      try {
        const options = {
          includeDeleted: false,
          includeMetadata: true,
          includeSystem: true,
          //prefix: containerNamePrefix
        };
  
        const iter = this.blobServiceClient.listContainers();
        let containerItem = await iter.next();
        while (!containerItem.done) {
          containerList.push(containerItem.value.name);
          containerItem = await iter.next();
        }
        return containerList;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
  