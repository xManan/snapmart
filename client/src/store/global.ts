import { LoginState } from '@/enums'
import { create } from 'zustand'

type Store = {
    loginState: LoginState
    setLoginState: (state: LoginState) => void
    userLoggedIn: boolean
    setUserLoggedIn: (state: boolean) => void
}

const useStore = create<Store>()((set) => ({
    loginState: LoginState.HIDDEN,
    setLoginState: (state: LoginState) => set(() => ({ loginState: state })),
    userLoggedIn: false,
    setUserLoggedIn: (state: boolean) => set(() => ({ userLoggedIn: state })),
}))

export default useStore
