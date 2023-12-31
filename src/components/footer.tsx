import React from 'react';
import { styled } from 'styled-components';

function Footer() {
  return (
    <FooterLayout>
      <div>
        <img src="/images/ACC-logo-white.svg" />
        <p>서울시 영등포구 여의대방로 65길 20, 918호</p>
        <p>
          <span>비즈니스매칭 문의</span>withasia2018@naver.com
        </p>
        <p>Copyright © 2023 Asia Cooperation Center All Rights Reserved.</p>
      </div>
    </FooterLayout>
  );
}

const FooterLayout = styled.footer`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  background: #303d48;
  color: #ffffff;
  width: 100%;
  height: 350px;

  div {
    /* max-width: 1240px; */
    width: 100%;
    padding: 80px 0px 100px 10vw;
  }

  img {
    width: 103.226px;
    height: 32px;
  }

  p {
    color: #ffffff;
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;

    &:nth-child(2) {
      padding-top: 20px;
      padding-bottom: 14px;
    }

    &:nth-child(3) {
      padding-bottom: 44px;
    }
  }

  span {
    color: #ffffff;
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    padding-right: 15px;
  }

  @media screen and (max-width: 768px) {
    height: 224px;

    div {
      padding: 50px 0px 90px 20px;
    }

    img {
      width: 64.517px;
      height: 20px;
    }

    p {
      font-size: 1.2rem;

      &:nth-child(2) {
        padding-top: 30px;
        padding-bottom: 10px;
        /* background-color: antiquewhite; */
      }

      &:nth-child(3) {
        padding-bottom: 44px;
      }

      &:nth-child(4) {
        display: none;
      }
    }

    span {
      font-size: 1.2rem;
      padding-right: 10px;
    }
  }
`;
export default Footer;
