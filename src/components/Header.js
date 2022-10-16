import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {firebaseAuth, firebaseProvider} from "../firebase";

import {selectUserName, selectUserPhoto, setSignOut, setUserLoginDetails} from "../features/user/userSlice";

function Header(props) {
    const nav_items = [
        {link: "home", label: "Home"},
        {link: "search", label: "Search"},
        {link: "watchlist", label: "Watchlist"},
        {link: "original", label: "Originals"},
        {link: "movie", label: "Movies"},
        {link: "series", label: "Series"},
    ]

    const dispatch = useDispatch()
    const history = useHistory()
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)

    useEffect(() => {
        firebaseAuth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user)
                history.push('/home')
            }
        })
    }, [userName])

    const handleAuth = () => {
        if (!userName) {
            firebaseAuth
                .signInWithPopup(firebaseProvider)
                .then(r => {
                    setUser(r.user)
                })
                .catch(e => {
                    alert(e.message)
                })
        } else if (userName) {
            firebaseAuth
                .signOut()
                .then(() => {
                    dispatch(setSignOut())
                    history.push("/")
                })
                .catch(e => alert(e.message))
        }
    }

    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }))
    }

    return (
        <Nav>
            <Logo>
                <img src={"/images/logo.svg"} alt={""}/>
            </Logo>

            {!userName ?
                <LoginButton onClick={handleAuth}> Login </LoginButton>
                :
                <>
                    <NavMenu>
                        {nav_items.map((item, i) =>
                            <a href={`/${item.link}`} key={i}>
                                <img src={`/images/icons/${item.link}-icon.svg`} alt={item.label}/>
                                <span>{item.label}</span>
                            </a>
                        )}
                    </NavMenu>
                    <SignOut>
                        <UserImg src={userPhoto} alt={userName}/>
                        <Dropdown>
                            <span onClick={handleAuth}>Sign out</span>
                        </Dropdown>
                    </SignOut>
                </>
            }
        </Nav>
    );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  padding: 0;
  position: relative;
  margin: 0 auto 0 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      width: 20px;
      min-width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px;
      white-space: nowrap;
      position: relative;
      text-transform: uppercase;

      &:before {
        content: '';
        background-color: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        height: 2px;
        opacity: 0;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all .2s ease-out;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
  padding: 10px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 90%;
  }

  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: .5s;
    }
  }
`;

export default Header;