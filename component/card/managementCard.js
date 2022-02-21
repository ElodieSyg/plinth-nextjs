import Image from "next/image";
// DEPENDENCIES IMPORTATIONS
import styled from "styled-components";

const ManagementContainer = props => {
    const Container = styled.div`

    `;

    return (
        <Container>
            {props.title}
        </Container>
    );
};

export default ManagementContainer;