import React from 'react';
import Header from '@/component/Header';
import Board from '@/component/Board';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mood-toggle';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div style={{paddingLeft: "10%", paddingRight: "10%", paddingBottom: "150px", paddingTop: '50px'  }}>
       <ModeToggle/>
       <Header />
       <Board /> 
      {/* Add other components or content here */}
      </div>
      </ThemeProvider>
  );
}

export default App;
