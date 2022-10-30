import { createContext, ReactNode, useState } from "react";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    singIn: (credentials: SingInProps) => Promise<void>;
}

type UserProps = {
    id: string,
    name: string,
    email: string,
}

type SingInProps = {
    email: string,
    password: string,
}

type AuthProviderProps = {
    children: ReactNode,
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    // !!use -> return true if user has data, else false.
    const isAuthenticated = !!user;

    async function singIn({ email, password }: SingInProps) {
        alert("ok")
    }

    return (
        <AuthContext.Provider value={({ user, isAuthenticated, singIn })}>
            {children}
        </AuthContext.Provider>
    )
}