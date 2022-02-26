import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
// DEPENDENCIES IMPORTATIONS
import axios from "axios";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
// UTILS FUNCTIONS IMPORTATIONS
import { server } from "../../tools";
import redirect from "../../utils/redirect";
// COMPONENTS IMPORTATIONS
import Navbar from "../../component/layout/navbar/navbar";
import CatalogCard from "../../component/card/catalogCard";
import Loader from "../../component/loader";
import CatalogMap from "../../component/map/catalogMap";
import FilterBar from "../../component/filterBar";
// STYLED COMPONENTS IMPORTATIONS
import GreenRoundedButton from "../../component/layout/button/GreenRoundedButton";
import GreySmallText from "../../component/text/GreySmallText";
import GreenTitle from "../../component/layout/title/GreenTitle";
// CONTEXTS IMPORTATIONS
import { LocationContext } from "../../context/LocationContext";

const Container = styled.div`
    margin: 2rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
`;

const MapProductContent = styled.div`
    display: flex;
`;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    scroll-behavior: smooth;
    height: 25rem;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
`;

const MapContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background: red;
`;

const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin: 1rem 1rem 1rem 1rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const ButtonContainer = styled.div`
    margin: 0.5rem;
`;

const DetailsContainer = styled.div`
    margin: 1rem 1rem 1rem 1rem;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    display: flex;
    align-items: center;
`;

const TextContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const Catalog = () => {
    const [products, setProducts] = useState();
    const [selectedProduct, setSelectedProduct] = useState();
    const [isShow, setIsShow] = useState(false);
    const [filter, setFilter] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [data, setData] = useState([]);
    const { position, setPosition } = useContext(LocationContext);

    useEffect(() => {
        axios.get(`${server}/api/product`, { withCredentials: true })
            .then(res => {
                setProducts(res.data.products);
            });
    }, []);

    const handleClickInfo = (product) => {
        setIsShow(!isShow);
        setSelectedProduct(product);
        setPosition([product.coordinate.latitude, product.coordinate.longitude])
    };

    const searchText = (e) => {
        setFilter(e.target.value);
        setIsFilter(true);

        let dataSearch = products.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
        });
        setData(dataSearch);
    };

    if (!products) {
        return (
            <Loader />
        );
    };

    return (
        <>
            <Head>
                <title>Plinth - Catalogue</title>
            </Head>

            <Navbar />
            <Container>
                <FilterBar
                    placeholder="Que recherchez-vous ?"
                    value={filter}
                    onChange={searchText.bind(this)}
                />
                <MapProductContent>
                    <ProductContainer>
                        {
                            isFilter
                                ? data.map(product => (
                                    <div key={uuidv4()}>
                                        <CatalogCard
                                            id={product._id}
                                            title={product.title}
                                            category={product.category}
                                            description={product.description}
                                            status={product.status}
                                            isShow={isShow}
                                            setIsShow={setIsShow}
                                            source={product.image}
                                            handleClickInfo={() => handleClickInfo(product)}
                                        />
                                    </div>
                                ))
                                : products.map(product => (
                                    <div key={uuidv4()}>
                                        <CatalogCard
                                            id={product._id}
                                            title={product.title}
                                            category={product.category}
                                            description={product.description}
                                            status={product.status}
                                            isShow={isShow}
                                            setIsShow={setIsShow}
                                            source={product.image}
                                            handleClickInfo={() => handleClickInfo(product)}
                                        />
                                    </div>
                                ))
                        }
                    </ProductContainer>
                    <MapContainer>
                        <CatalogMap />
                    </MapContainer>
                </MapProductContent>
            </Container>
            {
                isShow && (
                    <DetailsContainer>
                        <ImageContainer>
                            <Image src={`${server}/${selectedProduct.image}`} alt={selectedProduct.title} width={150} height={150} />
                        </ImageContainer>
                        <TextContainer>
                            <GreenTitle>{selectedProduct.title}</GreenTitle>
                            <GreySmallText>Description : {selectedProduct.description}</GreySmallText>
                            <GreySmallText>Catégorie : {selectedProduct.category}</GreySmallText>
                            <GreySmallText>État : {selectedProduct.status}</GreySmallText>
                            <GreySmallText>Début de disponibilité : {moment(selectedProduct.startDate).format("LL")}</GreySmallText>
                            <GreySmallText>Fin de disponibilité : {moment(selectedProduct.endDate).format("LL")}</GreySmallText>
                        </TextContainer>
                    </DetailsContainer>
                )
            }
            <ContactContainer>
                <GreenTitle>Vous n avez pas encore trouvé votre bonheur ?</GreenTitle>
                <GreySmallText>Écrivez-nous en détaillant votre recherche, nous sourçons pour vous !</GreySmallText>
                <ButtonContainer>
                    <GreenRoundedButton
                        onClick={() => redirect("/contact")}
                        width="8rem">
                        Contactez-nous !
                    </GreenRoundedButton>
                </ButtonContainer>
            </ContactContainer>
        </>
    );
};

export default Catalog;