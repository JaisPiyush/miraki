import './App.css'
import JoinSpace from './views/homepage'
import { ThemeProvider } from "@/components/theme-provider"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SpaceView } from './views/spaceMain';
import { ModeToggle } from './components/ mood-toggle';
import CreateProposalView from './views/create_proposal';
function App() {
  const router = createBrowserRouter([
    {
      path: "/spaces",
      element:  <JoinSpace />,
    },
    {
      path: "/:spaceName",
      element:  <SpaceView/>,
    },
    {
      path: "/create-proposal",
      element:  <CreateProposalView/>,
    },
  ]);
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <ModeToggle/>
          <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
