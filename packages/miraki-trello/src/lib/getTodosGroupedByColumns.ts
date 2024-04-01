import { appWriteDbId, appWriteTodoCollectionId, databases } from "@/appwrite_config";
// import {Query} from 'appwrite'

export const getTodosGroupedByColumns = async () => {
    const spaceId = window.miraki?.spaceId;
    let todos: Todo[] = []
    try {
        const data = await databases.listDocuments(appWriteDbId, appWriteTodoCollectionId,
            // [
            //     Query.equal('spaceId', [spaceId])
            // ]
            );
        todos = data.documents as unknown as Todo[];
    } catch {
        todos = []
    }
    const columns: Map<TypedColumn,Column> = todos.filter(todo => todo.spaceId === spaceId).reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            });
        }
    
        acc.get(todo.status)!.todos.push({
            ...todo,
            ...(todo.image && { image: JSON.parse(todo.image as string) })
        });
        return acc;
    }, new Map<TypedColumn, Column>([["todo", {id: "todo", todos: []}], ["inprogress", {id: "inprogress", todos: []}], ["done", {id: "done", todos: []}]]));
    console.log("Todos:", todos);

    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
    for (const columnType of columnTypes) {
        if (!columns.has(columnType)) { // Only add if not already present
            columns.set(columnType, {
                id: columnType,
                todos: [],
            });
        }
    }

    const sortedColumns = new Map<TypedColumn, Column>(
        Array.from(columns.entries()).sort(
            (a, b) =>
                columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        )
    );

    const board: Board = {
        columns: sortedColumns,
    };

    return board;
};
