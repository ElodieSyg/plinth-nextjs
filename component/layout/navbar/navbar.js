import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
// UTILS FUNCTIONS
import redirect from "../../../utils/redirect";

// STYLED COMPONENTS
const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7em;
    box-shadow: -5px 3px 5px 5px #e5e6e6;
    padding: 0rem 0.5rem 0rem 0.5rem;

    @media only screen and (min-width: 768px) {
    };
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
`;

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
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
        </>
    );
};

export default Navbar;
