import styled from "styled-components";
// COMPONENTS IMPORTATIONS
import GreenTitle from "../layout/title/GreenTitle";
import GreenRoundedButton from "../layout/button/GreenRoundedButton";

const Container = styled.div`
    margin: 1rem;
    display: flex;
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
    flex: 1;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    margin: 1rem;
    flex: 2;
`;

const Item = styled.div`
    margin: 0.2rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    flex: 1;
`;

const CatalogCard = props => {
    return (
        <Container>
            <ImageContainer>
                image à ajouter ici
            </ImageContainer>
            <InfoContainer>
                <GreenTitle textAlign="center">{props.title}</GreenTitle>
                <Item>
                    Category : {props.category}
                </Item>
                <Item>
                    Description : {props.description}
                </Item>
                <Item>
                    État : {props.status}
                </Item>
            </InfoContainer>
             <ButtonContainer>
                <GreenRoundedButton width="5rem" onClick={() => props.setIsShow(!props.isShow)}>
                    Voir plus
                </GreenRoundedButton>
            </ButtonContainer> 
        </Container>
    );
};

export default CatalogCard;