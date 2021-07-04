import React, { 
    createContext, 
    ReactNode,
    useContext, 
} from "react";

interface AuthProviderProps {
    children: ReactNode;
}

interface IUserProps {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: IUserProps;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthContextProvider({ children }: AuthProviderProps) {
    const user = {
        id: '1234567854',
        name: 'Lucas Soares',
        email: 'lucassoares@email.com',
    }

    return(
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthContextProvider, useAuth };