import React from "react";
import { RectButtonProperties } from 'react-native-gesture-handler';
import { SvgProps } from "react-native-svg";

import {
    Button,
    ImageContainer,
    Title,
} from './styles';

interface Props extends RectButtonProperties {
    title: string;
    svg: React.FC<SvgProps>
}

export function SignInSocialButton({
    title,
    svg: Svg,
    ...rest
}: Props) {
    return (
        <Button {...rest}>
            <ImageContainer>
                <Svg/>
            </ImageContainer>
            <Title>
                {title}
            </Title>
        </Button>
    );
}