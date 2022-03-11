import { useState, useEffect } from "react";
import { getProviders, getSession, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
// UTILS FUNCTIONS
import redirect from "../../utils/redirect";
// COMPONENTS IMPORTATION
import Navbar from "../../component/layout/navbar/navbar";
import Footer from "../../component/layout/footer";
import GreenButton from "../../component/layout/button/GreenButton";
import WhiteButton from "../../component/layout/button/WhiteButton";
import BasicInput from "../../component/layout/input/StyledInput";
import GreenTitle from "../../component/layout/title/GreenTitle";
import GlobalContainer from "../../styles/styled-components/container/GlobalContainer";

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    
    @media only screen and (min-width: 425px) {
        padding: 1rem 3rem 3rem 3rem;
    };
`;

const LoginItem = styled.div`
    margin: 0.5rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem;
`;

const ProviderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProviderItem = styled.div`
    margin: 0.2rem
`;

const Login = ({ providers }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { data: session, status } = useSession();
    const Router = useRouter();

    const preventDefault = (e) => {
        e.preventDefault();
    };




    return (
        <div>
            <Head>
                <title>Plinth - Login</title>
            </Head>

            <Navbar />
            <GlobalContainer>
                <LoginContainer onSubmit={(e) => preventDefault(e)}>
                    <GreenTitle>Connexion</GreenTitle>
                    <LoginItem>
                        <BasicInput
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)} />
                    </LoginItem>
                    <LoginItem>
                        <BasicInput
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </LoginItem>
                    <ButtonContainer>
                        <LoginItem>
                            <GreenButton onClick={() => signIn()}>Se connecter</GreenButton>
                        </LoginItem>
                        <p>ou</p>
                        <LoginItem >
                            <WhiteButton onClick={() => redirect("/register")}>Créer un compte</WhiteButton>
                        </LoginItem>
                    </ButtonContainer>
                    <p>ou</p>
                    <GreenTitle>Connectez-vous avec</GreenTitle>
                    {
                        Object.values(providers).slice(1).map(provider => (
                            <ProviderItem key={provider.name}>
                                <WhiteButton onClick={() => signIn(provider.id)}>
                                    <ProviderContainer>
                                        <ProviderItem>
                                            <Image src={`/${provider.name.toLowerCase()}.png`} alt="google_logo" height={20} width={20} />
                                        </ProviderItem>
                                        <ProviderItem>
                                            <p>{provider.name}</p>
                                        </ProviderItem>
                                    </ProviderContainer>
                                </WhiteButton>
                            </ProviderItem>
                        ))
                    }
                </LoginContainer>
            </GlobalContainer>
            <Footer />
        </div>
    );
};

export async function getServerSideProps({ req }) {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };

    const session = await getSession({ req });

    if (session) {
        
    }
};

export default Login;