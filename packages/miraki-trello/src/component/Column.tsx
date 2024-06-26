import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from '@/component/TodoCard';
import { Badge } from "@/components/ui/badge"
import { useBoardStore } from '@/store/BoardStore';
import { useModalStore } from '@/store/ModalStore';


type Props = {
    id: TypedColumn,
    todos: Todo[],
    index: number
};

const idToColumnText: {
    [key in TypedColumn]: string;
} = {
    todo: "To do",
    inprogress: "In progress",
    done: "Done",
};
function Column({ id, todos, index }: Props) {
    const [searchString] = useBoardStore((state) => [state.searchString]);
    const openModal=useModalStore((state)=>state.openModal);

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Droppable droppableId={index.toString()} type='card'>
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}

                                className={`p-2 rounded-2xl shadow-sm  ${snapshot.isDraggingOver ? "bg-green-500" : "bg-secondary"}`}
                            >
                                <h3 className="flex justify-between scroll-m-20 text-2xl font-semibold tracking-tight" style={{ paddingLeft: '8px', paddingRight: '8px', marginTop: '20px', marginBottom: '20px' }}>
                                    {idToColumnText[id]}
                                    <Badge>
                                        {!searchString?todos.length:todos.filter(todo=>todo.title.toLowerCase().includes(searchString)).length
                                  }</Badge>

                                </h3>
                                <div className='space-y-2'>
                                    {todos.map((todo, index) => {
                                        if (searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase())) return null;
                                        return (<Draggable
                                            key={todo.$id}
                                            draggableId={todo.$id}
                                            index={index}>
                                            {(provided) => (
                                                <TodoCard
                                                    todo={todo}
                                                    index={index}
                                                    id={id}
                                                    innerRef={provided.innerRef}
                                                    draggableProps={provided.draggableProps}
                                                    dragHandleProps={provided.dragHandleProps}
                                                />)}
                                        </Draggable>
                                        )
                                    }
                                    )
                                    }
                                    {provided.placeholder}
                                    <div className="flex items-end justify-end p-2">
                                        <button  onClick={openModal}className='text-green-500 hover:text-green-600'>
                                            <PlusCircleIcon className='h-10 w-10' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}

export default Column
