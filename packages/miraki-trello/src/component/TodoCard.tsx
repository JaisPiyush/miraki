import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
'use-client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import getUrl from '@/lib/getUrl';
import { useBoardStore } from '@/store/BoardStore';

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const deleteTask=useBoardStore((state)=>state.deleteTask);
     useEffect(() => {
        if (todo.image) {
            const fetchImage = async () => {
                const url = await getUrl(todo.image!);
                if (url) {
                    setImageUrl(url.toString());
                }
            }
            fetchImage();
        }
    }, [todo.image]);

    return (
        <>
            <div
                {...draggableProps}
                {...dragHandleProps}
                ref={innerRef}
            >
                <Card className="w-[100%]" style={{ position: 'relative' }}>
                    <CardHeader>
                        <CardTitle>{todo.title}</CardTitle>
                        {/* You can put the description here */}
                    </CardHeader>
                    <CardContent>
                        <button onClick={()=>deleteTask(index,todo,id)} className='text-red-500 hover:text-red-600' style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <XCircleIcon className='ml-5 h-8 w-8' />
                        </button>
                    </CardContent>
                    {imageUrl && (
                        <div className=' h-full w-full rounded-b-md'>
                            <img
                                src={imageUrl}
                                alt="Task image"
                                width={400}
                                height={200}
                                className="w-full object-contain rounded-b-md"
                            />
                        </div>
                    )}

                </Card>
            </div>
        </>

    );
}

export default TodoCard;
