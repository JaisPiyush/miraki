import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ModeToggle } from './components/mood-toggle';
import MainTable from './views/table';
import { IdlFieldBuilder } from './lib/program_builder/idl_field_builder';
function App() {
  const router = createBrowserRouter([
    {
      path: "/create",
      element:  <MainTable></MainTable>
    },
  ]);

  const idlFieldBuilder = new IdlFieldBuilder({
    name: 'frozenAr',
    type: 'publicKey'
  })
  const FieldComponent = idlFieldBuilder.toComponent({})
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div style={{ paddingBottom: "150px", paddingTop: '50px'  }}>
       <ModeToggle/>
       {/* <RouterProvider router={router} /> */}
       <div className='flex flex-col p-4 w-[400px] h-[400px] justify-between'>
        <FieldComponent />
      </div>
       
      {/* Add other components or content here */}
      </div>
        
      </ThemeProvider>
    </>
  )
}

export default App
