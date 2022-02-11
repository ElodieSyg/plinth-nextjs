import styled from "styled-components";

const StyledButton = styled.button`
    background: #8fb4a0;
    border: 1px solid #8fb4a0;
    color: #FFFFFF;
    border-radius: 999px;
    width: 100M;
    height: 2.5rem;
    cursor: pointer;

    :hover {
        background: #83a693;
    }
`;

const GreenRoundedButton = (props) => {
    return (
        <>
            <StyledButton onClick={props.onClick}>
                {props.children}
            </StyledButton>
        </>
    );
};

export default GreenRoundedButton;