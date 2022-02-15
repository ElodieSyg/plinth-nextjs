import styled from "styled-components";
// COMPONENTS IMPORTATION
import GreenRoundedButton from "../layout/button/GreenRoundedButton";
import GreenTitleItalic from "../layout/title/GreenTitleItalic";

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
    background: yellow;
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
                image à ajouter ici
            </ImageContainer>
            <InfoContainer>
                <GreenTitleItalic textAlign="center">{props.title}</GreenTitleItalic>
                <Item>
                    {props.description}
                </Item>
            </InfoContainer>
            <ButtonContainer>
                <GreenRoundedButton width="5rem">Voir plus</GreenRoundedButton>
            </ButtonContainer>
        </Container>
    );
};

export default HomeCard;