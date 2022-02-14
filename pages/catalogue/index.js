import { useState, useEffect } from "react";
import { server } from "../../tools";
import Head from "next/head";
import axios from "axios";
import styled from "styled-components";
// UTILS FUNCTIONS IMPORTATION
import redirect from "../../utils/redirect";
// COMPONENTS IMPORTATION
import Navbar from "../../component/layout/navbar/navbar";
import CatalogCard from "../../component/card/catalogCard";
import CatalogMap from "../../component/map/catalogMap";
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
`;

const MapContainer = styled.div`
    background: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin: 1rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const Item = styled.div`
    margin: 0.5rem;
`;

const Catalog = () => {
    const [products, setProducts] = useState();
    const [isShow, setIsShow] = useState(false);

    console.log("is show?", isShow)

    useEffect(() => {
        axios.get(`${server}/api/product`, { withCredentials: true })
            .then(res => {
                setProducts(res.data.products);
            });
    }, []);

    if (!products) {
        return <div>Loading...</div>
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
                            <CatalogCard
                                key={product._id}
                                title={product.title}
                                category={product.category}
                                description={product.description}
                                status={product.status}
                                isShow={isShow}
                                setIsShow={setIsShow} />
                        ))
                    }
                </ProductContainer>
                <MapContainer>
                    CatalogMap
                </MapContainer>
            </Flexbox>
            {
                isShow && (
                    <div>HEY</div>
                )
            }
            <ContactContainer>
                <GreenTitleItalic>Vous n avez pas encore trouvé votre bonheur ?</GreenTitleItalic>
                <GreySmallText>Écrivez-nous en détaillant votre recherche, nous sourçons pour vous !</GreySmallText>
                <Item>
                    <GreenRoundedButton onClick={() => redirect("/contact")}>Contactez-nous !</GreenRoundedButton>
                </Item>
            </ContactContainer>
        </>
    );
};

export default Catalog;