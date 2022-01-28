import { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
// COMPONENTS IMPORTATION
import Navbar from "../../component/layout/navbar/navbar";
import BottomLineInput from "../../component/layout/input/ContactInput";
import GlobalContainer from "../../styles/styled-components/container/GlobalContainer";
import GreenTitle from "../../component/layout/title/GreenTitle";
import GreenTitleItalic from "../../component/layout/title/GreenTitleItalic";
import GreenButton from "../../component/layout/button/GreenButton";
// UTILS FUNCTIONS IMPORTATION
import preventDefault from "../../utils/preventDefault";

const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #e5e6e6;
    padding: 1rem;

    @media only screen and (min-width: 425px) {
        padding: 1rem 1rem 2rem 1rem;
    }

    @media only screen and (min-width: 768px) {
        padding: 3rem 1rem 3rem 1rem;
    }
`;

const TitleContainer = styled.div`
    margin: 1rem;
    text-align: center;
`;

const Item = styled.div`
    margin: 0.5rem;
`;


const Contact = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumer] = useState();
    const [message, setMessage] = useState();

    const handleSubmit = () => {
        console.log("Message sended !")
    };

    return (
        <>
            <Head>
                <title>Plinth - Contact</title>
            </Head>

            <Navbar />
            <GlobalContainer>
                <ContactContainer onSubmit={preventDefault}>
                    <TitleContainer>
                        <GreenTitle>Une question ?</GreenTitle>
                        <GreenTitleItalic>Contactez-nous !</GreenTitleItalic>
                    </TitleContainer>
                    <Item>
                        <BottomLineInput type="text" placeholder="Prénom et nom de famille *" onChange={(e) => setName(e.target.value)} />
                    </Item>
                    <Item>
                        <BottomLineInput type="text" placeholder="Email *" onChange={(e) => setEmail(e.target.value)} />
                    </Item>
                    <Item>
                        <BottomLineInput type="number" placeholder="Numéro de téléphone" onChange={(e) => setPhoneNumer(e.target.value)} />
                    </Item>
                    <Item>
                        <BottomLineInput type="text" placeholder="Votre message" onChange={(e) => setMessage(e.target.value)} />
                    </Item>
                    <Item>
                        <GreenButton onClick={handleSubmit}>Envoyer</GreenButton>
                    </Item>
                </ContactContainer>
            </GlobalContainer>
        </>
    );
};

export default Contact;