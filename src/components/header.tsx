import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

function Header() {
  return (
    <HeaderLayout>
      <div>
        <img src="/images/header-logo.svg" />
        <Navbar>
          <Link to="/">홈</Link>
          <Link to="/search">기업검색</Link>
        </Navbar>
      </div>
    </HeaderLayout>
  );
}

const HeaderLayout = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 92px;
  border-bottom: 1px solid #d7dcdd;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 2300px;
    padding: 0 12%;
    gap: 30px;

    & > img {
      width: 371.781px;
      height: 30px;
    }
  }

  @media screen and (max-width: 768px) {
    height: auto;
    border-bottom: none;

    & > div {
      padding: 20px;
      padding: 10px 20px;
      border-bottom: none;
      flex-direction: row-reverse;
      gap: 30px;
      flex-wrap: wrap;

      & > img {
        width: 173.498px;
        height: 14px;
      }
    }
  }

  @media screen and (max-width: 390px) {
    & > div {
      justify-content: center;
    }
  }
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 25px;

  & > a {
    height: 31px;
    color: #000;
    text-align: center;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    white-space: nowrap;
    padding: 5px;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid #060617;
    }
  }

  @media screen and (max-width: 768px) {
    & > a {
      font-size: 1.6rem;
      line-height: 20px;
    }
  }
`;
export default Header;
