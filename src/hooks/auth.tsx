import React, { 
    createContext, 
    ReactNode,
    useContext, 
    useState,
    useEffect
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
    SignOut(): Promise<void>;
    userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthContextProvider({ children }: AuthProviderProps) {
    const userStorageKey = '@gofinance:user';
    const [user, setUser] = useState<IUserProps>({} as IUserProps);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

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
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
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
                const name = credential.fullName!.givenName!;
                const photo = `https://ui-avatars.com/api/?name=${name}& length=1`;

                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name,
                    photo
                };

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }
        } catch(error) {

        }
    }

    async function SignOut() {
        setUser({} as IUserProps);
        await AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const userStoraged = await AsyncStorage.getItem(userStorageKey);

            if (userStoraged) {
                const userLogged = JSON.parse(userStoraged) as IUserProps;
                setUser(userLogged);
            }

            setUserStorageLoading(false);
        }

        loadUserStorageData();
    }, []);

    return(
        <AuthContext.Provider value={{ 
            user,
            signInWithGoogle,
            signInWithApple,
            SignOut,
            userStorageLoading
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