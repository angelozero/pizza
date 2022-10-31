import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router'
import { api } from "../services/apiClient";
import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    singIn: (credentials: SingInProps) => Promise<void>;
    singOut: () => void;
    singUp: (credentials: SingUpProps) => Promise<void>;
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

type SingUpProps = {
    name: string,
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

            toast.success("Welcome !");

            // Redirect the user for the dashboar page
            Router.push('/dashboard');

        } catch (error) {
            toast.success("Something went wrong :(");
            console.log("[ERROR] - Sing In Error ", error);
        }
    }

    async function singUp({ name, email, password }: SingUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })
            toast.success("Registration done with success!");
            Router.push('/');

        } catch (error) {
            toast.error("Something went wrong :(");
            console.log("[ERROR] - Sing Up Error ", error);
        }
    }

    return (
        <AuthContext.Provider value={({ user, isAuthenticated, singIn, singOut, singUp })}>
            {children}
        </AuthContext.Provider>
    )
}