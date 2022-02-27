import styled from "styled-components";

// STYLED COMPONENTS
const Text = styled.p`
    color: white;
`;

const WhiteSmallText = (props) => {
    return (
        <Text>
            {props.children}
        </Text>
    );
};

export default WhiteSmallText;