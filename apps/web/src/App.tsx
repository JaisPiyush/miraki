import { browserRouter } from './router'
import {RouterProvider} from "react-router-dom";

import { Toaster } from "@/components/ui/toaster"




import './App.css'
import { ProfileState, ProfileStateContext } from './states/profile.state';


function App() {

  const profileState = new ProfileState();

  return (
    <div className='w-screen h-screen bg-zinc-200'>
      <ProfileStateContext.Provider value={profileState}>
        <RouterProvider router={browserRouter} />
      </ProfileStateContext.Provider>
      <Toaster />
    </div>
  )
}

export default App
