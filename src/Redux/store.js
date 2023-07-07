import { legacy_createStore as createStore } from "redux";
import { sideBarReducer } from "./sideBarReducer";

export const store = createStore(sideBarReducer)

export default store