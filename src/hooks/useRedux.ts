import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';

const useRedux = () => {
    const dispatch = useDispatch<AppDispatch>();
    const appSelector: TypedUseSelectorHook<RootState> = useSelector;
    return { dispatch, appSelector };
};

export default useRedux;