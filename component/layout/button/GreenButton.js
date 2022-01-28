import styled from "styled-components";

const StyledButton = styled.button`
    background: #8fb4a0;
    border: 1px solid #8fb4a0;
    color: #FFFFFF;
    border-radius: 5px;
    width: 9rem;
    height: 2rem;
    cursor: pointer;

    :hover {
        background: #83a693;
    }
`;

const GreenButton = (props) => {
    return (
        <>
            <StyledButton onClick={props.onClick}>
                {props.children}
            </StyledButton>
        </>
    );
};

export default GreenButton;