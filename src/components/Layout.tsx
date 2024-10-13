import { ReactNode } from "react"
import NodeBuilder from "./NodeBuilder"
import { useSidebarContext } from "../context/sidebarContext"

const Layout:React.FC<{children:ReactNode|string}> = ({children}) => {
    const {isVisible} = useSidebarContext();
  return (
    <div className='w-full h-screen min-h-screen grid grid-cols-7'>
        {<div className={`col-span-2 transition-all 
            ${isVisible ? 'animate-slide-up' : 'animate-slide-down absolute bottom-0 invisible'}`}>
        <NodeBuilder/>
        </div>}
        <div className={`${isVisible?"col-span-5":"col-span-7"}`}>
        {children}
        </div>
    </div>
  )
}

export default Layout