import { TOGGLESIDEBAR } from "./sideBarActionTypes"
const initState = {
    isSidebarOpen:false,
}
const sideBarReducer = (store = initState,action)=>{
        if(action.type===TOGGLESIDEBAR) {
            return {
                ...store, isSidebarOpen:!store.isSidebarOpen
            }
        }

        return store;
}

export {sideBarReducer}