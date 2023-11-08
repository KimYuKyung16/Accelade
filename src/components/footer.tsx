import React from 'react';
import { styled } from 'styled-components';

function Footer() {
  return (
    <FooterLayout>
      <img src="/images/ACC-logo-white.svg" />
      <p>서울시 영등포구 여의대방로 65길 20, 918호</p>
      <p>
        <span>비즈니스매칭 문의</span>withasia2018@naver.com
      </p>
      <p>Copyright © 2023 Asia Cooperation Center All Rights Reserved.</p>
    </FooterLayout>
  );
}

const FooterLayout = styled.footer`
  background: #303d48;
  color: #ffffff;
  padding: 80px 360px 100px 360px;
  width: 100%;
  height: 350px;
  /* position: relative;
  transform: translateY(-100%); */

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
  }
`;
export default Footer;
