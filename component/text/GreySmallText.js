import styled from "styled-components";

const Text = styled.p`
    color: grey;
`;

const GreySmallText = (props) => {
    return (
        <Text>
            {props.children}
        </Text>
    );
};

export default GreySmallText;