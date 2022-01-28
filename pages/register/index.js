import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import { server } from "../../tools";
import styled from "styled-components";
// UTILS FUNCTIONS
import redirect from "../../utils/redirect";
// COMPONENTS IMPORTATION
import Navbar from "../../component/layout/navbar/navbar";
import GreenButton from "../../component/layout/button/GreenButton";
import WhiteButton from "../../component/layout/button/WhiteButton";
import BasicInput from "../../component/layout/input/StyledInput";
import GreenTitle from "../../component/layout/title/GreenTitle";
import GlobalContainer from "../../styles/styled-components/container/GlobalContainer";

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #e5e6e6;

    @media only screen and (min-width: 425px) {
        padding: 1rem 3rem 3rem 3rem;
    };
`;

const Item = styled.div`
    margin: 0.5rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem;
`;

const Register = () => {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleCreate = () => {
        axios.post(`${server}/api/register`, { name, surname, email, password }, { withCredentials: true })
            .then((res) => {
                console.log("User created", res)
            });
    };

    return (
        <>
            <Head>
                <title>Plinth - Créez votre compte</title>
            </Head>

            <Navbar />
            <GlobalContainer>
                <RegisterContainer>
                    <GreenTitle>Inscription</GreenTitle>
                    <Item>
                        <BasicInput
                            type="text"
                            placeholder="Prénom"
                            onChange={(e) => setName(e.target.value)} />
                    </Item>
                    <Item>
                        <BasicInput
                            type="text"
                            placeholder="Nom de famille"
                            onChange={(e) => setSurname(e.target.value)} />
                    </Item>
                    <Item>
                        <BasicInput
                            type="text"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)} />
                    </Item>
                    <Item>
                        <BasicInput
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </Item>
                    <ButtonContainer>
                        <Item>
                            <GreenButton onClick={handleCreate}>Créer un compte</GreenButton>
                        </Item>
                        <p>ou</p>
                        <Item >
                            <WhiteButton onClick={() => redirect("/login")}>Connectez-vous</WhiteButton>
                        </Item>
                    </ButtonContainer>
                </RegisterContainer>
            </GlobalContainer>
        </>
    );
};

export default Register;