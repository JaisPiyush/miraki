import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme',theme === 'light' ? 'dark' : 'light' )
  }

  return (
    <div style={{display: 'flex', position: 'absolute', right: '0px', top: '20px', width: '100px'}}>
      <Switch id="airplane-mode" onClick={toggleTheme} style={{marginRight: '10px'}} />
      {theme === 'light' ? (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        </>
      ) : (
        <>
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all"/>
        </>
      )}
    </div>
  )
}
