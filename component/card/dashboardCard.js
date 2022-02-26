import Image from "next/image";
// DEPENDENCIES IMPORTATIONS
import styled from "styled-components";

const DashboardCard = props => {
    const Container = styled.div`
        padding: 1.5rem;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: ${props.onClick && "pointer"};
        border-radius: 10px;
    
        :hover {
            background: #F7F9F8;
        };
    `;

    const ItemContainer = styled.div`
        display: flex;
        align-items: center;
    `;

    const DashboardItem = styled.div`
        margin: 0.3rem;
    `;

    const CountText = styled.p`
        font-size: 1.4rem;
    `;

    return (
        <Container onClick={props.onClick}>
            <ItemContainer>
                <DashboardItem>
                    <CountText>{props.count}</CountText>
                </DashboardItem>
                <DashboardItem>
                    <Image src={props.source} alt={props.alt} width={24} height={24} />
                </DashboardItem>
            </ItemContainer>
            <div>
                {props.description}
            </div>
        </Container>
    );
};

export default DashboardCard;