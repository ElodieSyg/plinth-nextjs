import Head from "next/head";
import Navbar from "../../component/layout/navbar/navbar";

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>Plinth - Dashboard</title>
            </Head>

            <Navbar />
            Dashboard
        </>
    );
};

//Dashboard.auth = true;

export default Dashboard;