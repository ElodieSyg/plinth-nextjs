import styled from "styled-components";

const StyledTitle = styled.h2`
    color: black;
`;

const BlackTitle = (props) => {
    return (
        <>
            <StyledTitle>
                {props.children}
            </StyledTitle>
        </>
    );
};

export default BlackTitle;