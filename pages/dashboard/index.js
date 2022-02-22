import { useEffect, useState } from "react";
import Head from "next/head";
// DEPENDENCIES IMPORTATIONS
import styled from "styled-components";
import axios from "axios";
// UTILS FUNCTIONS IMPORTATIONS
import { server } from "../../tools";
import redirect from "../../utils/redirect";
// COMPONENTS IMPORTATIONS
import Navbar from "../../component/layout/navbar/navbar";
import DashboardCard from "../../component/card/dashboardCard";
import ManagementCard from "../../component/card/managementCard";
import Loader from "../../component/loader";
// STYLED COMPONENTS IMPORTATIONS
import GreyTitle from "../../component/layout/title/GreyTitle";

const Container = styled.div`
    margin: 1rem 4rem 2rem 4rem;
`;

const TitleContainer = styled.div`
    padding: 2rem;
    text-align: center;
`;

const CardContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const ManagementContainer = styled.div`
    margin: 1rem;
`;

const Management = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 3px solid #F7F9F8;
    border-radius: 30px;

`;

const Dashboard = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        axios.get(`${server}/api/product`, { withCredentials: true })
            .then(res => {
                setProducts(res.data.products)
            });

        axios.get(`${server}/api/category`, { withCredentials: true })
            .then(res => {
                setCategories(res.data.categories);
            });

        axios.get(`${server}/api/status`, { withCredentials: true })
            .then(res => {
                console.log(res)
                setStatus(res.data.data);
            });
    }, []);

    if (!products || !categories || !status) {
        return (
            <Loader />
        );
    };

    return (
        <>
            <Head>
                <title>Plinth - Dashboard</title>
            </Head>

            <Navbar />
            <Container>
                <TitleContainer>
                    <GreyTitle>Bienvenue sur votre tableau de bord</GreyTitle>
                </TitleContainer>
                <CardContainer>
                    <DashboardCard
                        count={2}
                        source="/favorite.png"
                        alt="favorite image"
                        onClick={() => redirect("/favorites")}
                        description="Vos favoris" />
                    <DashboardCard
                        count="+1"
                        source="/add.png"
                        alt="add new image"
                        description="Déposer une nouvelle annonce"
                        onClick={() => redirect("/new-product")} />
                    <DashboardCard
                        count={13}
                        source="/onlinead.png"
                        alt="online announce image"
                        description="Vos annonces" />
                </CardContainer>
                <ManagementContainer>
                    <TitleContainer>
                        <GreyTitle>Gérez vos annonces</GreyTitle>
                    </TitleContainer>
                    {
                        products.map(product => (
                            <ManagementCard
                                key={product._id}
                                products={product}
                                categories={categories}
                                status={status} />
                        ))
                    }
                </ManagementContainer>
            </Container>
        </>
    );
};

//Dashboard.auth = true;

export default Dashboard;