import './App.css'
import { SidebarContextProvider } from './context/SidebarContext';
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
