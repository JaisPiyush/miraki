import { Client, ID, Databases, Storage, Account } from "appwrite";

const projectId = "6601b92e630c4b984ee4";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage, ID };
