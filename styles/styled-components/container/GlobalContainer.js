import styled from "styled-components";

// GLOBAL CONTAINER CENTER
const GlobalContainer = styled.div`
    margin: 2rem 2rem 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media only screen and (min-width: 375px) {
        margin: 3rem 3rem 2rem 3rem;
    };

    @media only screen and (min-width: 768px) {
        margin: 3rem 6rem 2rem 6rem;
    };

    @media only screen and (min-width: 1024px) {
        margin: 3rem 8rem 2rem 8rem;
    };
`;

export default GlobalContainer;