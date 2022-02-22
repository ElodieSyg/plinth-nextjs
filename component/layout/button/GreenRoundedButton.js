import styled from "styled-components";

const GreenRoundedButton = (props) => {
    const StyledButton = styled.button`
        background: #8fb4a0;
        border: 1px solid #8fb4a0;
        color: #FFFFFF;
        border-radius: 999px;
        width: ${props.width};
        height: 2.4rem;
        cursor: pointer;
    
        :hover {
            background: #83a693;
        };
    `;

    return (
        <>
            <StyledButton onClick={props.onClick}>
                {props.children}
            </StyledButton>
        </>
    );
};

export default GreenRoundedButton;