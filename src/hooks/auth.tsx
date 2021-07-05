import React, { 
    createContext, 
    ReactNode,
    useContext, 
    useState
} from "react";

import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<IUserProps>({} as IUserProps);

    async function signInWithGoogle() {
        try{
            const result = await Google.logInAsync({
                iosClientId: '898390012413-uikfkotn1pfvvtocuhq06rbn53qvvuuj.apps.googleusercontent.com',
                androidClientId: '898390012413-cdbq8brdv988mdle0iipuvrk9cv6icpb.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

            if (result.type === 'success') {
                const userLogged = {
                    id: String(result.user.id),
                    email: result.user.email!,
                    name: result.user.name!,
                    photo: result.user.photoUrl!
                }
                
                setUser(userLogged);
                await AsyncStorage.setItem('@gofinance:user', JSON.stringify(userLogged));
            }
        } catch(error) {
            throw new Error(error);
        }
    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if (credential) {
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName!.givenName!,
                    photo: undefined
                };

                setUser(userLogged);
                await AsyncStorage.setItem('@gofinance:user', JSON.stringify(userLogged));
            }
        } catch(error) {

        }
    }

    return(
        <AuthContext.Provider value={{ 
            user,
            signInWithGoogle,
            signInWithApple 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthContextProvider, useAuth };