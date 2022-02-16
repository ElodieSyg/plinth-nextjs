import { useState, useEffect } from "react";
import { server } from "../../tools";
import Head from "next/head";
import axios from "axios";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
// UTILS FUNCTIONS IMPORTATION
import redirect from "../../utils/redirect";
// COMPONENTS IMPORTATION
import Navbar from "../../component/layout/navbar/navbar";
import CatalogCard from "../../component/card/catalogCard";
import Loader from "../../component/loader";
import CatalogMap from "../../component/map/catalogMap";
// STYLED COMPONENTS IMPORTATION
import GreenTitleItalic from "../../component/layout/title/GreenTitleItalic";
import GreenRoundedButton from "../../component/layout/button/GreenRoundedButton";
import GreySmallText from "../../component/text/GreySmallText";

const Flexbox = styled.div`
    margin: 2rem 1rem 1rem 1rem;
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
    cursor: pointer;
`;

const MapContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 384px;
    width: 640px;
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
`;

const CardContainer = styled.div`
`;

const Catalog = () => {
    const [products, setProducts] = useState();
    const [selectedProduct, setSelectedProduct] = useState();
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        axios.get(`${server}/api/product`, { withCredentials: true })
            .then(res => {
                setProducts(res.data.products);
            });
    }, []);

    if (!products) {
        return (
            <Loader />
        );
    };

    const handleClickInfo = (product) => {
        setIsShow(!isShow);
        setSelectedProduct(product);
    };

    return (
        <>
            <Head>
                <title>Plinth - Catalogue</title>
            </Head>

            <Navbar />
            <Flexbox>
                <ProductContainer>
                    {
                        products.map(product => (
                            <CardContainer key={uuidv4()} onClick={() => handleClickInfo(product)}>
                                <CatalogCard
                                    id={product._id}
                                    title={product.title}
                                    category={product.category}
                                    description={product.description}
                                    status={product.status}
                                    isShow={isShow}
                                    setIsShow={setIsShow}
                                />
                            </CardContainer>
                        ))
                    }
                </ProductContainer>
                <MapContainer>
                    <CatalogMap />
                </MapContainer>
            </Flexbox>
            {
                isShow && (
                    <DetailsContainer>
                        <GreenTitleItalic>{selectedProduct.title}</GreenTitleItalic>
                        <GreySmallText>Description : {selectedProduct.description}</GreySmallText>
                        <GreySmallText>Catégorie : {selectedProduct.category}</GreySmallText>
                        <GreySmallText>État : {selectedProduct.status}</GreySmallText>
                        <GreySmallText>Début de disponibilité : {moment(selectedProduct.startDate).format("LL")}</GreySmallText>
                        <GreySmallText>Fin de disponibilité : {moment(selectedProduct.endDate).format("LL")}</GreySmallText>
                    </DetailsContainer>
                )
            }
            <ContactContainer>
                <GreenTitleItalic>Vous n avez pas encore trouvé votre bonheur ?</GreenTitleItalic>
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