import Image from "next/image";
// UTILS IMPORTATIONS
import { server } from "../../tools";
// DEPENDENCIES IMPORTATION
import styled from "styled-components";
// COMPONENTS IMPORTATIONS
import GreenTitle from "../layout/title/GreenTitle";
import GreenRoundedButton from "../layout/button/GreenRoundedButton";

const Container = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 1rem 0rem 1rem;
`;

const BotContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ImageContainer = styled.div`
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

const ImageCursor = styled.img`
    cursor: pointer;
`;

const CatalogCard = props => {
    const handleAddFavorites = () => {
        console.log("Add product to favorites !");
    };

    return (
        <Container>
            <TopContainer>
                <div></div>
                <GreenTitle textAlign="center">{props.title}</GreenTitle>
                <ImageCursor src="/favorite.png" alt="favorite image" width={20} height={20} onClick={handleAddFavorites} />
            </TopContainer>
            <BotContainer>
                <ImageContainer>
                    <Image src={`${server}/${props.source}`} alt={props.title} width={150} height={150} />
                </ImageContainer>
                <InfoContainer>
                    <Item>
                        Catégorie : {props.category}
                    </Item>
                    <Item>
                        Description : {props.description}
                    </Item>
                    <Item>
                        État : {props.status}
                    </Item>
                </InfoContainer>
                <ButtonContainer>
                    <GreenRoundedButton width="5rem" onClick={props.handleClickInfo} /* onClick={() => props.setIsShow(!props.isShow)} */>
                        Voir plus
                    </GreenRoundedButton>
                </ButtonContainer>
            </BotContainer>
        </Container >
    );
};

export default CatalogCard;