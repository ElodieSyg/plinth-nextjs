import styled from "styled-components";

// GLOBAL CONTAINER CENTER
const GlobalContainer = styled.div`
    margin: 5rem 2rem 1rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: 0px) and (max-width: 375px) {
        margin: 1rem 0rem 1rem 0rem;
    };

    @media (min-width: 375px) and (max-width: 768px) {
        margin: 2rem 0rem 2rem 0rem;
    };

    @media only screen and (min-width: 768px) {
        margin: 3rem 6rem 3rem 6rem;
    };

    @media only screen and (min-width: 1024px) {
        margin: 3rem 8rem 2rem 8rem;
    };
`;

export default GlobalContainer;