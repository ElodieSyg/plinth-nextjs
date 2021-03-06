import styled from "styled-components";

const GreenTitle = (props) => {
    const StyledTitle = styled.h4`
        color: #8fb4a0;
        text-align: ${props.textAlign};
        margin: 1rem;
        font-size: ${props.fontSize};
    `;

    return (
        <>
            <StyledTitle>
                {props.children}
            </StyledTitle>
        </>
    );
};

export default GreenTitle;