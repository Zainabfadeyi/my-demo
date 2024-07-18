import { AppDispatch, RootState } from "./store";
import {
   useDispatch as useReduxDispatch,
   useSelector as useReduxSelector,
   type TypedUseSelectorHook
} from "react-redux";
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const UseSelector: TypedUseSelectorHook<RootState> = useReduxSelector
