import Head from "next/head";
// DEPENDENCIES IMPORTATIONS
import styled from "styled-components";
// COMPONENTS IMPORTATIONS
import Navbar from "../../component/layout/navbar/navbar";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Favorites = () => {
    return (
        <>
            <Head>
                <title>Plinth - Favorites</title>
            </Head>

            <Navbar />
            <Container>
                Favorites
            </Container>
        </>
    );
};

//Dashboard.auth = true;

export default Favorites;