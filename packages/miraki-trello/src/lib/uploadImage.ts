import{ID,storage}from"@/appwrite";

const uploadImage=async(file:File)=>{
    if(!file)return;
    const fileUploaded=await storage.createFile(
        "6601c16befe79cb01e1a",
        ID.unique(),
        file
    );
    return fileUploaded;
};

export default uploadImage;