import { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import axios from "axios";
import { server } from "../../tools";
// UTILS FUNCTIONS
import redirect from "../../utils/redirect";
// COMPONENTS IMPORTATION
import Navbar from "../../component/layout/navbar/navbar";
import Loader from "../../component/loader";
// STYLED COMPONENTS IMPORTATION
import StyledInput from "../../component/layout/input/StyledInput";
import GreenTitle from "../../component/layout/title/GreenTitle";
import GreenRoundedButton from "../../component/layout/button/GreenRoundedButton";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormContainer = styled.div`
    margin: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const Item = styled.div`
    margin: 0.5rem;
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

const NewProduct = () => {
    const [title, setTitle] = useState();
    const [categories, setCategories] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState();
    const [locationNumber, setLocationNumber] = useState();
    const [locationAddress, setLocationAddress] = useState();
    const [locationCity, setLocationCity] = useState();
    const [locationPostalCode, setLocationPostaleCode] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [image, setImage] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedStatus, setSelectedStatus] = useState();

    useEffect(() => {
        axios.get(`${server}/api/category`, { withCredentials: true })
            .then(res => {
                setCategories(res.data.categories);
            });

        axios.get(`${server}/api/status`, { withCredentials: true })
            .then(res => {
                setStatus(res.data.data);
            });
    }, []);

    const handlesend = async () => {
        let coordinate = {};
        let location = {
            number: locationNumber,
            address: locationAddress,
            city: locationCity,
            postalCode: locationPostalCode
        };

        const fetchCoordinate = await fetch(`http://api.positionstack.com/v1/forward?access_key=b5b5f521a5d082451b0e8b8f7c34e9f1&query=${locationNumber}%20${locationAddress}%20${locationPostalCode}%20${locationCity}`);
        const res = await fetchCoordinate.json();
        const data = await res.data[0];

        coordinate = {
            latitude: data.latitude.toString(),
            longitude: data.longitude.toString(),
        };

        console.log("coordinate", coordinate);

        axios.post(`${server}/api/product`,
            {
                title,
                category: selectedCategory,
                description,
                status: selectedStatus,
                location: {
                    number: locationNumber,
                    address: locationAddress,
                    city: locationCity,
                    postalCorde: locationPostalCode,
                },
                coordinate: {
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                },
                startDate,
                endDate,
            },
            { withCredentials: true })
            .then(res => {
                if (res.data.status === "Success") {
                    console.log("result post", res)
                    setTimeout(() => {
                        handleImage(res.data.product._id);
                    });
                };
            });
    };

    const handleImage = async id => {
        const filedata = new FormData();
        filedata.append("toto", image);

        const config = {
            headers: { 'content-type': 'multipart/form-data', "id": id },
            onUploadProgress: (event) => {
                console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
            },
        };

        const response = await axios.post(`${server}/api/uploads`, filedata, config);
        console.log(response.data);
    };


    if (!categories || !status) {
        return (
            <Loader />
        );
    };

    return (
        <>
            <Head>
                <title>Plinth - Nouveau produit</title>
            </Head>

            <Navbar />
            <Container>
                <FormContainer>
                    <GreenTitle>Déposez votre annonce en deux minutes !</GreenTitle>
                    <Item>
                        <StyledInput
                            type="text"
                            placeholder="Veuillez renseigner le titre de l'annonce"
                            onChange={e => setTitle(e.target.value)} />
                    </Item>
                    <Item>
                        <Label>Que souhaitez-vous donner ?</Label>
                        <Item>
                            <Select onChange={e => setSelectedCategory(e.target.value)}>
                                {
                                    categories.map(item => (
                                        <option key={item._id} value={item._id}> {item.category}</option>
                                    ))
                                }
                            </Select>
                        </Item>
                    </Item>
                    <Item>
                        <StyledInput
                            type="text"
                            placeholder="Description de l'objet"
                            onChange={e => setDescription(e.target.value)} />
                    </Item>
                    <Item>
                        <Label>État du bien</Label>
                        <Select onChange={e => setSelectedStatus(e.target.value)}>
                            {
                                status.map(item => (
                                    <option key={item._id} value={item._id}>{item.status}</option>
                                ))
                            }
                        </Select>
                    </Item>
                    <Item>
                        <Label>Adresse où le bien est disponible</Label>
                        <Item>
                            <StyledInput
                                type="number"
                                placeholder="N°"
                                onChange={e => setLocationNumber(e.target.value)} />
                        </Item>
                        <Item>
                            <StyledInput
                                type="text"
                                placeholder="Rue"
                                onChange={e => setLocationAddress(e.target.value)} />
                        </Item>
                        <Item>
                            <StyledInput
                                type="number"
                                placeholder="Code postal"
                                onChange={e => setLocationPostaleCode(e.target.value)} />
                        </Item>
                        <Item>
                            <StyledInput
                                type="text"
                                placeholder="Ville"
                                onChange={e => setLocationCity(e.target.value)} />
                        </Item>
                    </Item>
                    <Item>
                        <Label>Date à laquelle l objet est disponible</Label>
                        <StyledInput
                            type="date"
                            onChange={e => setStartDate(e.target.value)} />
                    </Item>
                    <Item>
                        <Label>Date limite de disponibilité</Label>
                        <StyledInput
                            type="date"
                            onChange={e => setEndDate(e.target.value)} />
                    </Item>
                    <Item>
                        <Label>Séléctionnez une image</Label>
                        <StyledInput
                            name="toto"
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file" />
                    </Item>
                    <Item>
                        <GreenRoundedButton onClick={handlesend}>Déposez votre annonce</GreenRoundedButton>
                    </Item>
                </FormContainer>
            </Container>
        </>
    );
};

export default NewProduct;