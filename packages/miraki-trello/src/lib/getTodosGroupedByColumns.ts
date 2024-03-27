import { databases } from "@/appwrite";

export const getTodosGroupedByColumns = async () => {
    const data = await databases.listDocuments("6601bb83306973dd9d91", "6601bba865f031e7a66f");
    const todos = data.documents;
    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            });
        }
    
        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            ...(todo.image && { image: JSON.parse(todo.image) })
        });
        return acc;
    }, new Map<TypedColumn, Column>());
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

    const sortedColumns = new Map(
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
