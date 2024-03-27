import { XCircleIcon } from '@heroicons/react/24/solid';
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
'use-client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {
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
                        {/* U can put the description in here rajat */}
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <button className='text-red-500 hover:text-red-600' style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <XCircleIcon className='ml-5 h-8 w-8' />
                        </button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default TodoCard
