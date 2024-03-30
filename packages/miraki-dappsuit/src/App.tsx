import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ModeToggle } from './components/mood-toggle';
import MainTable from './views/table';
function App() {
  const router = createBrowserRouter([
    {
      path: "/create",
      element:  <MainTable></MainTable>
    },
  ]);
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div style={{ paddingBottom: "150px", paddingTop: '50px'  }}>
       <ModeToggle/>
       <RouterProvider router={router} />
      {/* Add other components or content here */}
      </div>
        
      </ThemeProvider>
    </>
  )
}

export default App
