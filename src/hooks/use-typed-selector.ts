import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

// RootState is the interface of the parameter?
// The code below is the useSelector whose return value's interface is RootState
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
