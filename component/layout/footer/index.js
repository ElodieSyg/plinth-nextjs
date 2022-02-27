import styled from "styled-components";
import Image from "next/image";
// UTILS IMPORTATIONS
import redirect from "../../../utils/redirect";
// STYLED COMPONENTS IMPORTATION
import WhiteSmallText from "../../text/WhiteSmallTest";

const Container = styled.div`
    background: #8fb4a0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem 0.5rem 2rem;
    display: flex;
    justify-content: space-between
`;

const MenuContainer = styled.div`
    display: flex;
`;

const Item = styled.div`
    margin: 0.4rem;
    cursor: pointer;
`;

const ImageContainer = styled.div`
    display: flex;
`;

const Footer = () => {
    return (
        <Container>
            <MenuContainer>
                <Item onClick={() => redirect("/faq")}>
                    <WhiteSmallText>FAQ</WhiteSmallText>
                </Item>
                <Item onClick={() => redirect("/contact")}>
                    <WhiteSmallText>Contact</WhiteSmallText>
                </Item>
                <Item onClick={() => redirect("/conditions")}>
                    <WhiteSmallText>Condition</WhiteSmallText>
                </Item>
            </MenuContainer>
            <div>
                <WhiteSmallText>
                    © 2021 Plinth. All rights reserved.
                </WhiteSmallText>
            </div>
            <ImageContainer>
                <Item>
                    <a target="_blank" rel="noreferrer" href="https://www.instagram.com/plinth_fr/?utm_medium=copy_link">
                        <Image src="/instagram.png" alt="instagram logo" width={30} height={30} />
                    </a>
                </Item>
                <Item>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/plinth-l-art-du-r%C3%A9emploi/?viewAsMember=true">
                        <Image src="/linkedin.png" alt="linkedin logo" width={30} height={30} />
                    </a>
                </Item>
            </ImageContainer>
        </Container>
    );
};

export default Footer;