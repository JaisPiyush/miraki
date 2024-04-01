import {storage} from "@/appwrite_config";

const getUrl=async(image: BucketImage)=>{
    const url=storage.getFilePreview(image.bucketId,image.fileId);

    return url;
};

export default getUrl;
