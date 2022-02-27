import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
// UTILS IMPORTATIONS
import { server } from "../tools";
// DEPENDENCIES IMPORTATIONS
import axios from "axios";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
// COMPONENTS IMPORTATIONS
import Navbar from "../component/layout/navbar/navbar";
import Footer from "../component/layout/footer";
import HomeCard from "../component/card/homeCard";
import Loader from "../component/loader";
// STYLED COMPONENTS IMPORTATIONS
import BlackTitle from "../component/layout/title/BlackTitle";
import GlobalContainer from "../styles/styled-components/container/GlobalContainer";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 2rem;
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
  const {data: session, status} = useSession();
  console.log("session", session, "status", status);

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
    <div>
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
      <Footer />
    </div>
  );
};

export default Home;