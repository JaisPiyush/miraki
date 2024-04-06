import { appWriteDbId, appWriteTodoCollectionId, databases } from "@/appwrite_config";
import { Query } from "appwrite";

export const searchTasks = async (searchText: string) => {
    const spaceId = window.miraki?.spaceId;
    let todos: Todo[] = [];
    try {
        const data = await databases.listDocuments(
            appWriteDbId,
            appWriteTodoCollectionId,
            [
                Query.search('title', searchText)
            ]
        )
        todos = data.documents as unknown as Todo[];
    } catch {
        todos = [];
    }
    return todos.filter(todo => todo.spaceId === spaceId);
}
