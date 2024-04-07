import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";

interface SearchResultSectionProps {
    resultNavigationTrace: string[];
    children?: React.ReactNode
}

export default function SearchResultSection(props: SearchResultSectionProps) {
    return <div className="w-full p-2 py-2 border rounded-md flex flex-col space-y-2 px-4 mb-4">
            <Breadcrumb>
                <BreadcrumbList>
                    {props.resultNavigationTrace.map((nav, index) => {
                        return <>
                            <BreadcrumbItem>{nav}</BreadcrumbItem>
                            {index !== props.resultNavigationTrace.length - 1
                             ? <BreadcrumbSeparator />
                             : <></>
                            }
                        </>
                    })}
                </BreadcrumbList>
                <div className="w-full my-4 border rounded-md">
                    {props.children}
                </div>
            </Breadcrumb>
    </div>  
}

