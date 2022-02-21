import Image from "next/image";
// UTILS IMPORTATIONS
import { server } from "../../tools";
// DEPENDENCIES IMPORTATIONS
import styled from "styled-components";
// COMPONENTS IMPORTATION
import GreenRoundedButton from "../layout/button/GreenRoundedButton";
import GreenTitleItalic from "../layout/title/GreenTitleItalic";

console.log(server)
const Container = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    width: 15rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    :hover {
        background: #F7F9F8;
    };
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    margin: 1rem;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0rem 1rem 1rem 1rem;
`;

const Item = styled.div`
   display: flex;
   justify-content: center;
   margin: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
`;

const HomeCard = (props) => {
    return (
        <Container>
            <ImageContainer>
                <Image src={`${server}/${props.source}`} alt={props.title} width={150} height={150} />
            </ImageContainer>
            <InfoContainer>
                <Item>
                    <GreenTitleItalic textAlign="center">{props.title}</GreenTitleItalic>
                </Item>
                <Item>
                    {props.description}
                </Item>
            </InfoContainer>
        </Container>
    );
};

export default HomeCard;