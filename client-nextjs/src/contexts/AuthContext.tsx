import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router'
import { api } from "../services/apiClient";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    singIn: (credentials: SingInProps) => Promise<void>;
    singOut: () => void;
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

export function singOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch (error) {
        console.log('[BigShell Pizza - ERROR] - Sing out has an error ', error)
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    // !!use -> return true if user has data, else false.
    const isAuthenticated = !!user;

    async function singIn({ email, password }: SingInProps) {

        try {
            const response = await api.post('/session', {
                email,
                password
            })


            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            });

            setUser({
                id,
                name,
                email
            })

            // sharing the token for the requests
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            // Redirect the user for the dashboar page
            Router.push('/dashboard');

        } catch (error) {
            console.log("[ERROR] - Login Error ", error);
        }
    }

    return (
        <AuthContext.Provider value={({ user, isAuthenticated, singIn, singOut })}>
            {children}
        </AuthContext.Provider>
    )
}