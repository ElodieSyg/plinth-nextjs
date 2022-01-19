import styled from "styled-components";

const StyledInput = styled.input`
    width: 15rem;
    heigth: 3rem;
    padding: 0.2rem;
    border: 1px solid #e5e6e6;
`;

const BasicInput = (props) => {
    return (
        <>
            <StyledInput
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </>
    );
};

export default BasicInput;