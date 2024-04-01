interface Board{
    columns:Map<TypedColumn, Column>;
}

type TypedColumn="todo" |"inprogress"|"done";

interface Column{
    id:TypedColumn,
    todos:Todo[]
}

interface Todo{
    $id:string;
    $createdAt:string;
    title:string;
    status:TypedColumn;
    spaceId?: number;
    image?: BucketImage | string;
}

interface BucketImage {
    bucketId:string;
    fileId:string;
}


