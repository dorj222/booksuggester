import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Backdrop from "../../assets/svg/Backdrop";
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import { auth } from '../../firebase/firebase.utils';

export default function TopNavbar({ currentUser }) { 
  const [y, setY] = useState(window.scrollY);
  const [sidebaropen, toggleSidebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setY(window.scrollY);
    };

    // Check if window object is defined (running in the browser)
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <>
      <Sidebar sidebaropen={sidebaropen.toString()} toggleSidebar={toggleSidebar} currentUser={currentUser} />
      {sidebaropen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper style={{ height: y > 100 ? "60px" : "80px" }}>
        <NavInner>
          <LinkWrapper to="/" className="flexNullCenter pointer" activeClassName="inactive">
            <LogoIcon />
            <h5 style={{ marginLeft: "5px", marginTop: "5px" }} >BookSuggester</h5>
          </LinkWrapper>
          <BurgerWrapper onClick={() => toggleSidebar(!sidebaropen)}>
            <BurgerIcon />
          </BurgerWrapper>
          <NavLinks>
            <li>
              <StyledNavLink exact to="/" isActive={() => location.pathname === "/"}>Home</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/discover" isActive={() => location.pathname === "/discover"}>Discover</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/bookshelf" isActive={() => location.pathname === "/bookshelf"}>Bookshelf</StyledNavLink>
            </li>
            {currentUser ? (
              <li>
                <StyledNavLink to="/login" isActive={() => location.pathname === "/login"} onClick={() => auth.signOut()}>Logout</StyledNavLink>
              </li>
            ) : (
              <li>
                <StyledNavLink to="/login" isActive={() => location.pathname === "/login"}>Login</StyledNavLink>
              </li>
            )}
          </NavLinks>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`;
const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  height: 100%;
`;
const LinkWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
`;
const BurgerWrapper = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  @media (max-width: 760px) {
    display: block;
  }
`;
const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  @media (max-width: 760px) {
    display: none;
  }
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px 15px;
  cursor: pointer;
  &.active {
    border-bottom: 2px solid blue; /* You can adjust the active link styling */
  }
`;
