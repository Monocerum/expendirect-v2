import { useEffect, useMemo, useReducer } from 'react'
import { loadState, saveState } from '@/store/persistence'
import { reducer } from '@/store/reducer'
import { StoreContext } from './StoreContext'

export default function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, undefined, loadState)
    useEffect(() => saveState(state), [state])
    const value = useMemo(() => ({ state, dispatch }), [state])
    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}