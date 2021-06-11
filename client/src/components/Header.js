import React from 'react'
import styled from "styled-components";

const Header = () => {
    return (
        <Head>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Logo href="">
                Chatting <span>App</span>
            </Logo>
        </Head>
    )
}
const Head = styled.div`
  padding: 0 1rem;  
  background: #40514E;
  margin-top: 70px;
  margin-right: 12px;
`;

const Logo = styled.div `
  padding: 1.2rem 0;
  color: #7b7fda;
  text-decoration: none;
  font-weight: 800; 
  font-size: 2.5rem;
  span {
    font-weight: 500;
    font-size: 2.1rem;
    color: darkgray;
  }
`

export default Header
