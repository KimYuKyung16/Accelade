import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Footer from '@components/footer';

function Sector() {
  const sectors = [
    ['Machine', '기계'],
    ['Plastic', '플라스틱'],
    ['Automated System', '자동화'],
    ['Chemicals', '화학물질'],
    ['Electronic', '전기/전자'],
    ['Metal', '금속'],
    ['Textile', '섬유'],
    ['ETC', '기타'],
  ];

  return (
    <SectorLayout>
      <Header>
        <img src="images/main-logo.svg" />
        <Search>
          <img src="icons/search-icon.svg" />
          <input placeholder="기업명을 검색하세요." />
        </Search>
      </Header>
      <Main>
        <Sectors>
          {sectors.map((sector) => {
            return (
              <div key={sector[0]}>
                <span>{sector[0]}</span>
                <span>{sector[1]}</span>
              </div>
            );
          })}
        </Sectors>
        <CorporationList>
          {new Array(10).fill(0).map((_, index) => {
            return (
              <Corporation key={index}>
                <div>
                  <h6>HQA THO 섬유 주식회사</h6>
                  <div>
                    <span>섬유</span>
                    <span>민간 기업</span>
                  </div>
                  <p>www.hoatho.com.vn</p>
                </div>
                <p>자세히</p>
              </Corporation>
            );
          })}
          <button>기업 더보기</button>
        </CorporationList>
      </Main>
      <Footer />
    </SectorLayout>
  );
}

const SectorLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 80px;
  gap: 50px;
  width: 100%;
  min-width: 1920px;
  width: 100%;
  padding: 0 360px;
  max-width: 1920px;
  margin: 0 auto;
  margin-top: 80px;

  & > img {
    width: 199.573px;
    height: 45.648px;
  }
`;

const Search = styled.section`
  display: flex;
  flex-direction: row;
  width: 540px;
  border-radius: 100px;
  border: 1px solid rgba(48, 61, 72, 0.2);
  background: #eef7fb;
  gap: 15px;
  overflow: hidden;
  padding-left: 24px;

  & > input {
    background: none;
    width: 100%;
    padding: 13px 0;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;

    &::placeholder {
      color: rgba(6, 6, 23, 0.6);
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 100%;
  min-width: 1920px;
  width: 100%;
  padding: 0 360px;
  max-width: 1920px;
  margin: 0 auto;
  margin-top: 80px;
  height: auto;
  /* min-height: 100%; */
  /* padding-bottom: 350px; */
`;

const Sectors = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    &:nth-child(7) {
      & > span:nth-child(1) {
        background: #303d48;
      }
    }

    & > span:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 92px;
      height: 92px;
      border-radius: 100px;
      background: #00a8bd;
      color: #fff;
      font-size: 1.1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 11px;
      text-align: center;
    }

    & > span:nth-child(2) {
      color: rgba(6, 6, 23, 0.8);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
    }
  }
`;

const CorporationList = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 130px;

  & > button {
    height: 46px;
    padding: 12px 95px;
    border-radius: 100px;
    background: #6663ff;
    color: #fff;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    margin-top: 80px;
  }
`;

const Corporation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 25px 0;
  border-bottom: 1px solid #e4e7e9;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;

    & > h6 {
      color: #060617;
      font-size: 1.8rem;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
    }

    & > div {
      display: flex;
      flex-direction: row;
      gap: 6px;

      & > span {
        border-radius: 8px;
        display: flex;
        padding: 5px 10px;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
      }

      & > span:nth-child(1) {
        background: #00a8bd;
        color: #fff;
      }

      & > span:nth-child(2) {
        background: #e4e7e9;
        color: #757575;
      }
    }

    & > p {
      color: rgba(6, 6, 23, 0.6);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
  }

  & > p {
    color: rgba(6, 6, 23, 0.6);
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  }
`;

export default Sector;
