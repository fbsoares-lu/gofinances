import React, { useContext } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles'

export function SignIn() {
    const { 
        user, 
        signInWithGoogle, 
        signInWithApple 
    } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle();
        } catch(error) {
            Alert.alert("Não foi possível conectar com a conta Google.");
            console.log(error);
        }
    }

    async function handleSignInWithApple() {
        try {
            await signInWithApple();
        } catch(error) {
            Alert.alert("Não foi possível conectar com a conta Apple.");
            console.log(error);
        }
    }

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {`\n`}
                        finanças de forma {`\n`}
                        muito simples
                    </Title>

                    <SignInTitle>
                        Faça seu login com {`\n`}
                        uma das contas abaixo {`\n`}
                    </SignInTitle>
                </TitleWrapper>
            </Header>
        
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />

                    <SignInSocialButton
                        title="Entrar com Apple"
                        svg={AppleSvg}
                        onPress={handleSignInWithApple}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    );
}
