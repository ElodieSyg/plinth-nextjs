import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";
// UTILS FUNCTIONS
import redirect from "../../../utils/redirect";
// STYLED COMPONENTS IMPORTATION
import GreenRoundedButton from "../button/GreenRoundedButton";
import WhiteRoundedButton from "../button/WhiteRoundedButton";
import GreenSmallText from "../../text/GreenSmallText";

// STYLED COMPONENTS
const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7em;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 0rem 0.5rem 0rem 0.5rem;

    @media only screen and (min-width: 768px) {
    };
`;

const LContainer = styled.div`
    display: flex;
    align-items: center;
`;

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    margin: 0.5rem;
    color: #919ca2;
    `;

const ItemContainer = styled.div`
    margin: 0.5rem;
    padding: 0.5rem;
`;

const Item = styled.div`
    padding: 0.5rem;
    display: flex;
    cursor: pointer;
`;

const ButtonItem = styled.div`
    margin-left: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isOpen, setOpen] = useState(false);

    const MobileComponent = () => {
        return (
            <div>
                <NavbarContainer>
                    <Item>
                        <Image
                            src="/logo.png"
                            alt="Plinth Logo"
                            width={150}
                            height={100}
                            onClick={() => redirect("/")} />
                    </Item>
                    <Item>
                        <Image
                            src="/menu.png"
                            alt="Menu item"
                            width={35}
                            height={35}
                            onClick={() => setOpen(!isOpen)} />
                    </Item>
                </NavbarContainer>
                {
                    isOpen &&
                    <DropdownContainer>
                        <ItemContainer>
                            <Item onClick={() => redirect("/catalogue")}>
                                Catalogue
                            </Item>
                            <Item onClick={() => redirect("/login")}>
                                Login
                            </Item>
                            <Item onClick={() => redirect("/register")}>
                                Register
                            </Item>
                            <Item onClick={() => redirect("/contact")}>
                                Contact
                            </Item>
                        </ItemContainer>
                    </DropdownContainer>
                }
            </div>
        );
    };

    const DesktopComponent = () => {
        return (
            <div>
                <NavbarContainer>
                    <LContainer>
                        <Item>
                            <Image
                                src="/logo.png"
                                alt="Plinth Logo"
                                width={150}
                                height={100}
                                onClick={() => redirect("/")} />
                        </Item>
                        <Item onClick={() => redirect("/catalogue")}>
                            <GreenSmallText>Catalogue</GreenSmallText>
                        </Item>
                    </LContainer>
                    <ButtonContainer>
                        <ButtonItem>
                            <GreenRoundedButton width="7rem" onClick={() => redirect("/login")}>Connexion</GreenRoundedButton>
                        </ButtonItem>
                        <ButtonItem>
                            <WhiteRoundedButton onClick={() => redirect("/register")}>Créer un compte</WhiteRoundedButton>
                        </ButtonItem>
                    </ButtonContainer>
                </NavbarContainer>
            </div>
        );
    };

    const isLoggedMobileComponent = () => {
        return (
            <div>
                <NavbarContainer>
                    <Item>
                        <Image
                            src="/logo.png"
                            alt="Plinth Logo"
                            width={150}
                            height={100}
                            onClick={() => redirect("/")} />
                    </Item>
                </NavbarContainer>
            </div>
        );
    };

    const isLoggedDesktopComponent = () => {
        return (
            <div>
                <NavbarContainer>
                    <Item>
                        <Image
                            src="/logo.png"
                            alt="Plinth Logo"
                            width={150}
                            height={100}
                            onClick={() => redirect("/")} />
                        <GreenSmallText>Catalogue connecté</GreenSmallText>
                    </Item>
                </NavbarContainer>
            </div>
        );
    };

    return (
        <DesktopComponent />
    );

};

export default Navbar;