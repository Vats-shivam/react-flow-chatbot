import './App.css'
import { SidebarContextProvider } from './context/sidebarContext';
import Dashboard from './pages/Dashboard';
 
function App() {

  return (
    <SidebarContextProvider>
    <div>
        <Dashboard/>  
    </div>
    </SidebarContextProvider>
  
  );
}

export default App
