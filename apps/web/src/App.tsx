import { browserRouter } from './router'
import {RouterProvider} from "react-router-dom";

import { Toaster } from "@/components/ui/toaster"




import './App.css'
import { ProfileState, ProfileStateContext } from './states/profile.state';
import { ProfileSpaceState, ProfileSpaceStateContext } from './states/profile_space.state';


function App() {

  const profileState = new ProfileState();
  const profileSpaceState = new ProfileSpaceState();

  return (
    <div className='w-screen h-screen bg-zinc-200'>
      <ProfileStateContext.Provider value={profileState}>
        <ProfileSpaceStateContext.Provider value={profileSpaceState}>
          <RouterProvider router={browserRouter} />
        </ProfileSpaceStateContext.Provider>
      </ProfileStateContext.Provider>
      <Toaster />
    </div>
  )
}

export default App
