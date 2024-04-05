import { Button } from "./ui/button";
import {MagnifyingGlassIcon} from '@radix-ui/react-icons'

export default function SearchFloatingButton() {
    return <div className="fixed bottom-12 right-10">
        <Button className="rounded-full py-8 shadow-lg z-50">
            <MagnifyingGlassIcon className="w-8 h-8" />
        </Button>
    </div>
}