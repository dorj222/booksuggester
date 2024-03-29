import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CloseIcon from "../../assets/svg/CloseIcon";
import LogoIcon from "../../assets/svg/Logo";
import { auth } from '../../firebase/firebase.utils';

export default function Sidebar({ sidebaropen, toggleSidebar, currentUser }) {
  const handleLogout = () => {
    auth.signOut();
    toggleSidebar(false); 
  };

  return (
    <Wrapper className="animate darkBg" sidebaropen={sidebaropen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <LogoIcon />
          <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
            BookSuggester
          </h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebaropen)} className="animate pointer">
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebaropen)}
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebaropen)}
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="/discover"
          >
            Discover
          </Link>
        </li>
        <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebaropen)}
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="/bookshelf"
          >
            Bookshelf
          </Link>
        </li>
        <li className="semiBold font15 pointer">
          {currentUser ? (
            <Link
              onClick={handleLogout}
              className="whiteColor"
              style={{ padding: "10px 15px" }}
              to="/login"
            >
              Logout
            </Link>
          ) : (
            <Link
              onClick={() => toggleSidebar(!sidebaropen)}
              className="whiteColor"
              style={{ padding: "10px 15px" }}
              to="/login"
            >
              Login
            </Link>
          )}
        </li>
      </UlStyle>
    </Wrapper>
  );
}
const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebaropen === "true" ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
