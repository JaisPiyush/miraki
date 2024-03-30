import { ID, databases,storage} from '@/appwrite';
import { getTodosGroupedByColumns } from '@/lib/getTodosGroupedByColumns';
import uploadImage from '@/lib/uploadImage';
import { create } from 'zustand'

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  newTaskInput: string;
  newTaskType: TypedColumn;
  image: File | null;

  addTask:(todo:string,columnId:TypedColumn,image?:File|null)=>void;

  setNewTaskInput: (input: string) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  setNewTaskType: (columnId: TypedColumn) => void;
  deleteTask:(taskIndex:number,todoId:Todo,id:TypedColumn)=>void;
  setImage: (image: File | null) => void; // Include setImage property
}

export const useBoardStore = create<BoardState>((set,get) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  searchString: "",
  newTaskInput: "",
  newTaskType: "todo",
  image: null,
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async () => {
    const board = await getTodosGroupedByColumns();
    set({ board });
  },
  setBoardState: (board) => {
    console.log("Updating board state to:", board);
    set({ board });
  },
  setNewTaskInput: (input) => set({ newTaskInput: input }),
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),
  setImage: (image: File | null) => set({ image }), 


  deleteTask:async(taskIndex:number,todo:Todo,id:TypedColumn)=>{
    const newColumns=new Map(get().board.columns);

    newColumns.get(id)?.todos.splice(taskIndex,1);
    set({board:{columns:newColumns}});
    
    if(todo.image){
      await storage.deleteFile(todo.image.bucketId,todo.image.fileId);
    }

    await databases.deletDocument(
      "6601bb83306973dd9d91",
      "6601bba865f031e7a66f",
      todo.$id
    )

  },
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      "6601bb83306973dd9d91",
      "6601bba865f031e7a66f",
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
  addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
    let file: Image | undefined;
    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      "6601bb83306973dd9d91",
      "6601bba865f031e7a66f",
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };
      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns,
        },
        newTaskInput: "", // Clear newTaskInput after adding task
      };
    });
  },
}));
