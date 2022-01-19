import styled from "styled-components";

const StyledTitle = styled.h4`
    color: #8fb4a0;
`;

const GreenTitle = (props) => {
    return (
        <>
            <StyledTitle>
                {props.children}
            </StyledTitle>
        </>
    );
};

export default GreenTitle;