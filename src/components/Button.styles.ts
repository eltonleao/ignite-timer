import styled, {css} from "styled-components";

export type ButtonVariant = "primary" | "secondary";

interface ButtonContainerProps {
    variant: ButtonVariant;
}


const  buttonVariant = {
    primary: "#0d6efd",
    secondary: "#6c757d",
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;

    ${props => {
        return css`
        background-color: ${buttonVariant[props.variant]}
        `
    }}
`