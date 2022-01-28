import styled from "styled-components";

const StyledTitle = styled.h4`
    color: #8fb4a0;
    font-weight: italic;
`;

const GreenTitleItalic = (props) => {
    return (
        <>
            <StyledTitle>
                {props.children}
            </StyledTitle>
        </>
    );
};

export default GreenTitleItalic;