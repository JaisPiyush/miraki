import{appWriteBucketId, ID,storage}from"@/appwrite_config";

const uploadImage=async(file:File)=>{
    if(!file)return;
    const fileUploaded = await storage.createFile(
        appWriteBucketId,
        ID.unique(),
        file
    );
    return fileUploaded;
};

export default uploadImage;