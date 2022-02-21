import styled from "styled-components";

const StyledTitle = styled.h2`
    color: grey;
`;

const GreyTitle = (props) => {
    return (
        <>
            <StyledTitle>
                {props.children}
            </StyledTitle>
        </>
    );
};

export default GreyTitle;