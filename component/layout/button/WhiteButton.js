import styled from "styled-components";

const StyledButton = styled.button`
    background: #FFFFF;
    border: 1px solid #FFFFFF;
    color: #8fb4a0;
    border-radius: 5px;
    width: 9rem;
    height: 2rem;
    cursor: pointer;

    :hover {
        background: #d9d9d9;
    }
`;

const WhiteButton = (props) => {
    return (
        <>
            <StyledButton onClick={props.onClick}>
                {props.tag}
            </StyledButton>
        </>
    );
};

export default WhiteButton;