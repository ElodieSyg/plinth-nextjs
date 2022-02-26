import { useState } from "react";
import Image from "next/image";
// UTILS IMPORTATIONS
import { server } from "../../tools";
import { refresh } from "../../utils/refresh";
// DEPENDENCIES IMPORTATIONS
import styled from "styled-components";
import axios from "axios";
// STYLED COMPONENTS IMPORTATIONS 
import GreySmallText from "../text/GreySmallText";
import StyledInput from "../../component/layout/input/StyledInput";
import GreenRoundedButton from "../layout/button/GreenRoundedButton";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 30px;
    height: 100%;
    margin: 1rem;
`;

const ImageContainer = styled.div`
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ColumnContainer = styled.div`
    width: 15%
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const OnClickItem = styled.label`
    cursor: pointer;
`;

const ModificationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 30px;
    height: 100%;
    margin: 1rem;
    padding: 2rem;
`;

const Label = styled.p`
    color: #8fb4a0;
    text-align: center;
`;

const Select = styled.select`
    border: 1px solid #e5e6e6;
    width: 15.7rem;
    heigth: 3rem;
    padding: 0.2rem;
`;

const Item = styled.div`
    margin: 0.4rem;
`;

const ManagementContainer = props => {
    const [title, setTitle] = useState(props.products.title);
    const [description, setDescription] = useState(props.products.description);
    const [category, setCategory] = useState(props.products.category);
    const [status, setStatus] = useState(props.products.status);
    const [startDate, setStartDate] = useState(props.products.startDate);
    const [endDate, setEndDate] = useState(props.products.endDate);
    const [id, setId] = useState(null);
    const [isShow, setIsShow] = useState(false);

    const handleSetId = () => {
        setIsShow(!isShow)
        setId(props.products._id)
    };

    const handlePatch = () => {
        setIsShow(!isShow);

        axios.patch(`${server}/api/product/${id}`, { title, description, category, status, startDate, endDate }, { withCredentials: true })
            .then(res => {
                refresh();
            });
    };

    const handleDelete = async () => {
        setId(props.products._id)

        await axios.delete(`${server}/api/product/${id}`, { withCredentials: true })
            .then(res => {
                refresh();
            });
    };

    return (
        <>
            <Container>
                <ImageContainer>
                    <Image src={`${server}/${props.products.image}`} alt={props.products.title} height={50} width={50} />
                </ImageContainer>
                <ColumnContainer>
                    <GreySmallText>{props.products.title}</GreySmallText>
                </ColumnContainer>
                <ColumnContainer>
                    <GreySmallText>{props.products.description}</GreySmallText>
                </ColumnContainer>
                <ColumnContainer>
                    <GreySmallText>{props.products.category}</GreySmallText>
                </ColumnContainer>
                <ColumnContainer>
                    <GreySmallText>{props.products.status}</GreySmallText>
                </ColumnContainer>
                <ActionContainer>
                    <OnClickItem>
                        <Image
                            src="/pen.png"
                            alt="pen picture"
                            height={50}
                            width={50}
                            onClick={handleSetId} />
                    </OnClickItem>
                    <OnClickItem>
                        <Image
                            src="/trash.png"
                            alt="trash picture"
                            height={50}
                            width={50}
                            onClick={handleDelete} />
                    </OnClickItem>
                </ActionContainer>
            </Container>
            {
                isShow &&
                <ModificationContainer>
                    <Item>
                        Modifiez votre annonce
                    </Item>
                    <Item>
                        <Label>Titre de l annonce</Label>
                    </Item>
                    <Item>
                        <StyledInput
                            type="text"
                            placeholder={props.products.title}
                            onChange={e => setTitle(e.target.value)} />
                    </Item>
                    <Item>
                        <Label>Description</Label>
                    </Item>
                    <Item>
                        <StyledInput
                            type="text"
                            placeholder={props.products.description}
                            onChange={e => setDescription(e.target.value)} />
                    </Item>
                    <Item>
                        <Label>Catégorie</Label>
                    </Item>
                    <Item>
                        <Select onChange={e => setCategory(e.target.value)}>
                            {
                                props.categories.map(item => (
                                    <option key={item._id} value={item._id}> {item.category}</option>
                                ))
                            }
                        </Select>
                    </Item>
                    <Item>
                        <Label>État du bien</Label>
                    </Item>
                    <Item>
                        <Select onChange={e => setStatus(e.target.value)}>
                            {
                                props.status.map(item => (
                                    <option key={item._id} value={item._id}>{item.status}</option>
                                ))
                            }
                        </Select>
                    </Item>
                    <Item>
                        <Label>Date à laquelle l objet est disponible</Label>
                    </Item>
                    <Item>
                        <StyledInput
                            type="date"
                            onChange={e => setStartDate(e.target.value)} />
                    </Item>
                    <Item>
                        <Label>Date limite de disponibilité</Label>
                    </Item>
                    <Item>
                        <StyledInput
                            type="date"
                            onChange={e => setEndDate(e.target.value)} />
                    </Item>
                    <Item>
                        <GreenRoundedButton width="10rem" onClick={handlePatch}>Modifiez votre annonce</GreenRoundedButton>
                    </Item>
                </ModificationContainer>
            }
        </>
    );
};

export default ManagementContainer;