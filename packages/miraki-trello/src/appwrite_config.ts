import { Client, ID, Databases, Storage, Account } from "appwrite";

const projectId = "660b255c33d5c259aed5";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const appWriteDbId = '660b2570290eb4797384'
const appWriteTodoCollectionId = '660b26f8e6f2e0d0c5c0'
export const appWriteBucketId = '660b2c3dedd7f6f60bed'

export { client, account, databases, storage, ID, appWriteDbId, appWriteTodoCollectionId };
