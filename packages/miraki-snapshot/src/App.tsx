import './App.css'
import JoinSpace from './views/homepage'
import { ThemeProvider } from "@/components/theme-provider"

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
         <JoinSpace></JoinSpace>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
