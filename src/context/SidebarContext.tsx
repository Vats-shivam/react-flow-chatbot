import { createContext, useContext, useState, ReactNode } from "react";
import { ITemplate } from "../types/template";

interface SidebarContextType {
  isVisible: string;
  toggleForm: (id: string) => void;
  flow: any[];
  setFlow: React.Dispatch<React.SetStateAction<ITemplate[]>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState("");
  const lastStoredFlow = localStorage.getItem('flow')
  const [flow, setFlow] = useState<ITemplate[]>(lastStoredFlow ? JSON.parse(lastStoredFlow) : []);
    // console.log(flow)
  const toggleForm = (id: string) => {
      localStorage.setItem("flow", JSON.stringify(flow));
    // const lastStoredFlow = localStorage.getItem("flow");
    // setFlow(lastStoredFlow ? JSON.parse(lastStoredFlow) : []);
    setIsVisible(id);
  };

  return (
    <SidebarContext.Provider value={{ isVisible, toggleForm, flow, setFlow }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the SidebarContext
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error(
      "useSidebarContext must be used within a SidebarContextProvider"
    );
  }
  return context;
};
