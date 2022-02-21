import { useEffect, useState, createContext } from "react";
import { server } from "../tools";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
// COMPONENTS IMPORTATION
import Navbar from "../component/layout/navbar/navbar";
import HomeCard from "../component/card/homeCard";
import Loader from "../component/loader";
// STYLED COMPONENTS IMPORTATION
import BlackTitle from "../component/layout/title/BlackTitle";
import GlobalContainer from "../styles/styled-components/container/GlobalContainer";
// CONTEXT
import GreenRoundedButton from "../component/layout/button/GreenRoundedButton";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  margin: 1rem;
`;

const GreySmallText = styled.p`
  text-align: ${props => props.textAlign};
  color: grey;
  margin-bottom: 5rem;
`;

const Home = () => {
  const [products, setProducts] = useState();

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

  return (
    <>
      <Head>
        <title>Plinth</title>
      </Head>

      <Navbar />
      <GlobalContainer>
        <AboutContainer>
          <Item>
            <Image src="/home-g.png" alt="" width={50} height={50} />
          </Item>
          <Item>
            <BlackTitle>A propos de Plinth</BlackTitle>
          </Item>
          <Item>
            <GreySmallText textAlign="center">
              Plinth est un outil numérique de partage de ressources. Il est fondé avec lidée que la plupart des matériaux et objets dont les créateurs et acteurs du monde culturel ont besoin collectivement existent déjà.
            </GreySmallText>
          </Item>
        </AboutContainer>
      </GlobalContainer>
      <CardContainer>
        {
          products.slice(0, 4).map(product => (
            <HomeCard
              key={uuidv4()}
              title={product.title}
              description={product.description}
              source={product.image} />
          ))
        }
      </CardContainer>
    </>
  );
};

export default Home;