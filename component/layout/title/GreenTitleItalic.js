import styled from "styled-components";

const GreenTitleItalic = (props) => {
    const StyledTitle = styled.h4`
        color: #8fb4a0;
        font-weight: italic;
        text-align: ${props.textAlign};
    `;

    return (
        <>
            <StyledTitle>
                {props.children}
            </StyledTitle>
        </>
    );
};

export default GreenTitleItalic;