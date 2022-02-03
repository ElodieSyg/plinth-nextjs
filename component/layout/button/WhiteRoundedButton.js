import styled from "styled-components";

const StyledButton = styled.button`
    background: #FFFFF;
    border: 1px solid #FFFFFF;
    color: #8fb4a0;
    border-radius: 999px;
    width: 9rem;
    height: 2.5rem;
    cursor: pointer;

    :hover {
        background: #d9d9d9;
    }
`;

const WhiteRoundedButton = (props) => {
    return (
        <>
            <StyledButton onClick={props.onClick}>
                {props.children}
            </StyledButton>
        </>
    );
};

export default WhiteRoundedButton;