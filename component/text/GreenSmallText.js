import styled from "styled-components";

// STYLED COMPONENTS
const Text = styled.p`
    color: #8fb4a0;
`;

const GreenSmallText = (props) => {
    return (
        <Text>
            {props.children}
        </Text>
    );
};

export default GreenSmallText;