import { useState, useEffect } from "react";
import { server } from "../../tools";
import Head from "next/head";
import axios from "axios";
import styled from "styled-components";
// COMPONENTS IMPORTATION
import Navbar from "../../component/layout/navbar/navbar";
import CatalogCard from "../../component/card/catalogCard";
import CatalogMap from "../../component/map/catalogMap";

const Flexbox = styled.div`
    margin: 1rem;
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
    background: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Catalog = () => {
    const [products, setProducts] = useState();

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
        <div>
            <Head>
                <title>Plinth - Catalogue</title>
            </Head>

            <div>
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
                                    location={product.location}
                                    startDate={product.startDate}
                                    endDate={product.endDate} />
                            ))
                        }
                    </ProductContainer>
                    <MapContainer>
                        CatalogMap
                    </MapContainer>
                </Flexbox>
            </div>
        </div>
    );
};

export default Catalog;