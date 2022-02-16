import { useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
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

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

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

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { status, loading } = useSession();
    const Router = useRouter();

    const preventDefault = (e) => {
        e.preventDefault();
    };

/*     if (status === "authenticated") {
        Router.push("/dashboard");
    }; */

    return (
        <>
            <Head>
                <title>Plinth - Login</title>
            </Head>

            <Navbar />
            <GlobalContainer>
                <LoginContainer onSubmit={(e) => preventDefault(e)}>
                    <GreenTitle>Connexion</GreenTitle>
                    <Item>
                        <BasicInput
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)} />
                    </Item>
                    <Item>
                        <BasicInput
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </Item>
                    <ButtonContainer>
                        <Item>
                            <GreenButton onClick={() => signIn()}>Se connecter</GreenButton>
                        </Item>
                        <p>ou</p>
                        <Item >
                            <WhiteButton onClick={() => redirect("/register")}>Créer un compte</WhiteButton>
                        </Item>
                    </ButtonContainer>
                </LoginContainer>
            </GlobalContainer>
        </>
    );
};
/* 
// SESSION IS NULL OR UNDEFINED, WE HAVE TO CREATE OWN GETSESSION  !!!! //
export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    console.log(session, "in server side props")

    return {
        props: {
            session,
        },
    };
};
 */
export default Login;