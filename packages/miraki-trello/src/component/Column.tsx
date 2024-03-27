import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from '@/component/TodoCard';
import { Badge } from "@/components/ui/badge"


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

                                className={`p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? "bg-green-500" : "bg-muted/40"}`}
                                >
                                 <h3 className="flex justify-between scroll-m-20 text-2xl font-semibold tracking-tight" style={{paddingLeft: '8px', paddingRight: '8px', marginTop: '20px', marginBottom: '20px'}}>
                                    {idToColumnText[id]}
                                    <Badge>{todos.length}</Badge>
                                    
                                </h3>
                                <div className='space-y-2'>
                                    {todos.map((todo, index) => (<Draggable
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
                                    )
                                    }
                                    {provided.placeholder}
                                    <div className="flex items-end justify-end p-2">
                                        <button className='text-green-500 hover:text-green-600'>
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
