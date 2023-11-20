import React, { useState } from 'react';
import { styled } from 'styled-components';
import Footer from '@components/footer';
import { useNavigate } from 'react-router-dom';

const vitenam_db_center1 = [
  ['Machine', '기계'],
  ['Plastic', '플라스틱'],
  ['Automated System', '자동화'],
  ['Chemicals', '화학물질'],
];

const vitenam_db_center2 = [
  ['Electronic', '전기/전자'],
  ['Metal', '금속'],
  ['Textile', '섬유'],
  ['ETC', '기타'],
];

const PDF = ['3Os', '7.PROFILE VIET NHAT PRO 2023', '665_hungdung', 'AAA'];

const PDF2 = [
  'ABH',
  'Accuracy',
  'AMA Bac Ninh JSC - Corporate Profile',
  'DIGMAN VIETNAM',
  'DKBIKE',
  'EPT',
  'excelpoint',
  'GP Holdings',
  'Hawee',
  'HONG KY',
  'ISM',
  'M1',
  'MAVIN',
  'Phuong Dong General Hospital',
  'ROSTEK',
  'SOTAVILLE',
  'Sun Health Gloves',
  'THABILABCO',
  'The Greenmart Vietnam_0',
  'VANLONG',
  'VEAM',
];

function HOME() {
  const navigate = useNavigate();
  const [search, setSearch] = useState(''); // 검색어
  const [pdfList, setPdfList] = useState([...PDF]);
  const [btnVisible, setBtnVisible] = useState(true);

  // 검색칸에서 엔터를 눌렀을 경우
  const handleOnSearchKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      if (search.length === 0) {
        return;
      }
      navigate(`/search?val=${search}`);
    }
  };

  const onClickMore = () => {
    setPdfList((val) => [...val, ...PDF2]);
    setBtnVisible(false);
  };

  return (
    <HomeLayout>
      <Header>
        <img src="/images/header-logo.svg" />
      </Header>
      <Main>
        <MainLogo src="images/main-logo.svg" />
        <Video muted autoPlay loop>
          <source src="bannervideo.mp4" type="video/mp4" />
        </Video>
        <Main_Search>
          <div>
            <img src="icons/search-icon.svg" />
            <input
              placeholder="기업명을 검색하세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
              }}
              onKeyDown={handleOnSearchKeyPress}
            />
          </div>
        </Main_Search>
        <Main_DBCenter>
          <DBCenter>
            <h3>베트남 기업 DB센터</h3>
            <div>
              {vitenam_db_center1.map((center) => {
                return (
                  <div key={center[0]}>
                    <span
                      onClick={() => {
                        navigate('/corporation', {
                          state: { sector: center[1] },
                        });
                      }}
                    >
                      {center[0]}
                    </span>
                    <span
                      onClick={() => {
                        navigate('/corporation', {
                          state: { sector: center[1] },
                        });
                      }}
                    >
                      {center[1]}
                    </span>
                  </div>
                );
              })}
            </div>
            <div>
              {vitenam_db_center2.map((center) => {
                return (
                  <div key={center[0]}>
                    <span
                      onClick={() => {
                        navigate(`/corporation`, {
                          state: { sector: center[1] },
                        });
                      }}
                    >
                      {center[0]}
                    </span>
                    <span
                      onClick={() => {
                        navigate('/corporation', {
                          state: { sector: center[1] },
                        });
                      }}
                    >
                      {center[1]}
                    </span>
                  </div>
                );
              })}
            </div>
          </DBCenter>
        </Main_DBCenter>
        <Main_Logos>
          <img src="/images/agency-logo1.svg" />
          <img src="/images/agency-logo2.svg" />
          <img src="/images/agency-logo3.svg" />
          <img src="/images/agency-logo4.svg" />
          <img src="/images/agency-logo5.svg" />
        </Main_Logos>
        <Main_Info>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 250 270"
            preserveAspectRatio="xMinYMin meet"
          >
            <foreignObject
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/1999/xhtml"
            >
              <Info__Component1>
                <h4>뉴스레터 회원사</h4>
                <div>
                  <span>한국 기업</span>
                  <p>5,388개</p>
                </div>
                <div>
                  <span>현지 기업</span>
                  <p>2,384개</p>
                </div>
              </Info__Component1>
            </foreignObject>
          </svg>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 250 270"
            preserveAspectRatio="xMinYMin meet"
          >
            <foreignObject
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/1999/xhtml"
            >
              <Info__Component2>
                <h4>베트남 기업 DB</h4>
                <p>1,000곳</p>
                <img src="/icons/cloud-server-icon.svg" />
              </Info__Component2>
            </foreignObject>
          </svg>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 250 270"
            preserveAspectRatio="xMinYMin meet"
          >
            <foreignObject
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/1999/xhtml"
            >
              <Info__Component3>
                <h4>기술자문</h4>
                <p>104건</p>
                <img src="/icons/discussion-icon.svg" />
              </Info__Component3>
            </foreignObject>
          </svg>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 250 270"
            preserveAspectRatio="xMinYMin meet"
          >
            <foreignObject
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/1999/xhtml"
            >
              <Info__Component4>
                <h4>비즈니스 매칭</h4>
                <p>53건</p>
                <img src="/icons/cooperation-icon.svg" />
              </Info__Component4>
            </foreignObject>
          </svg>
        </Main_Info>
        <Main_Corporation>
          <h3>한국 기업과 비지니스 매칭을 원하는 기업</h3>
          <Corporation_List>
            {pdfList.map((pdf, index) => {
              return (
                <Corporation
                  key={index}
                  href={`/assets/pdf/${pdf}.pdf`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 340 285"
                    preserveAspectRatio="xMinYMin meet"
                  >
                    <foreignObject
                      width="100%"
                      height="100%"
                      xmlns="http://www.w3.org/1999/xhtml"
                    >
                      <img src={`/assets/pdfImage/${pdf}.png`} />
                      <h5>{pdf}</h5>
                    </foreignObject>
                  </svg>
                </Corporation>
              );
            })}
          </Corporation_List>
          <MoreBtn onClick={onClickMore} $visible={btnVisible}>
            기업 더보기
          </MoreBtn>
        </Main_Corporation>
      </Main>
      <Footer />
    </HomeLayout>
  );
}

const MoreBtn = styled.button<{ $visible: boolean }>`
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  height: 46px;
  /* padding: 12px 95px; */
  border-radius: 100px;
  background: #6663ff;
  color: #fff;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  width: 100%;
  max-width: 240px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    height: 40px;
    max-width: none;
    font-size: 1.6rem;
  }
`;

const Main_Info = styled.section`
  display: grid;
  /* flex-direction: row;
  justify-content: space-between; */
  width: 100%;
  margin-bottom: 100px;
  max-width: 1240px;
  gap: 40px;
  grid-template-columns: repeat(4, minmax(auto, auto));
  padding: 0 20px;

  @media screen and (max-width: 768px) {
    gap: 15px;
    grid-template-columns: repeat(2, minmax(auto, auto));

    margin-bottom: 5vw;
  }
`;

const Info__Component = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 270px; */
  height: 250px;
  border-radius: 20px;
  background: #eef7fb;
  padding-top: 25px;

  & > h4 {
    color: rgba(6, 6, 23, 0.8);
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    padding-bottom: 31px;
  }

  & > p {
    color: #060617;
    font-size: 3.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 42px;
    margin-bottom: 23px;
  }
`;

const Info__Component1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 270px; */
  height: 250px;
  border-radius: 20px;
  background: #eef7fb;
  padding: 25px 0;

  & > h4 {
    color: rgba(6, 6, 23, 0.8);
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    padding-bottom: 31px;
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-bottom: 19px;

    & > span {
      border-radius: 100px;
      background: #d3ddff;
      color: rgba(6, 6, 23, 0.8);
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 600;
      line-height: 18px;
      padding: 3px 10px;
      text-align: center;
      margin-bottom: 4px;
    }

    & > p {
      color: #060617;
      font-size: 3rem;
      font-style: normal;
      font-weight: 600;
      line-height: 34px;
    }
  }

  & > div:nth-child(3) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    & > span {
      border-radius: 100px;
      background: #ffdde3;
      color: rgba(6, 6, 23, 0.8);
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 600;
      line-height: 18px;
      padding: 3px 10px;
      text-align: center;
      margin-bottom: 4px;
    }

    & > p {
      color: #060617;
      font-size: 3rem;
      font-style: normal;
      font-weight: 600;
      line-height: 34px;
    }
  }
`;

const Video = styled.video`
  width: 100%;
  height: 800px;
  /* min-width: 1920px; */
  object-fit: cover;
  /* margin-bottom: 80px; */
  /* position: absolute; */
  /* top: 50px; */

  & > source {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    height: 604px;
  }
`;

const Info__Component2 = styled(Info__Component)``;

const Info__Component3 = styled(Info__Component)`
  & > p {
    margin-bottom: 21px;
  }
`;

const Info__Component4 = styled(Info__Component)`
  & > p {
    margin-bottom: 21px;
  }
`;

const Main_Logos = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 150px 0;

  flex-wrap: wrap;
  gap: 50px;
  padding: 0 20px;

  @media screen and (max-width: 768px) {
    margin: 50px 0;
    gap: 20px;

    & > img {
      height: 6vw;
      min-height: 24px;
    }
  }
`;

const Main_Corporation = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1240px;
  width: 100%;
  padding: 0 18px;

  & > h3 {
    align-self: flex-start;
    color: #0b0a0a;
    font-size: 3rem;
    /* font-size: 1.5vw; */
    font-style: normal;
    font-weight: 700;
    line-height: 34px;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 768px) {
    /* padding: 0 18px; */

    & > h3 {
      font-size: 1.4rem;
      font-size: 3vw;
      margin-bottom: 16px;
    }
  }
`;

const Corporation_List = styled.div`
  display: grid;
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap; */
  width: 100%;
  gap: 0px 20px;
  /* column-gap: 20px; */
  margin-bottom: 70px;
  grid-template-columns: repeat(4, minmax(auto, auto));

  @media screen and (max-width: 768px) {
    margin-bottom: 40px;
    grid-template-columns: repeat(2, minmax(auto, auto));
  }
`;

const Corporation = styled.a`
  /* height: 340px; */
  /* width: 285px; */
  /* background-color: #00a8bd; */
  margin-bottom: 40px;

  & img {
    /* width: 285px; */
    width: 100%;
    height: 80%;
    border-radius: 10px;
    background: #e4e7e9;
    overflow: hidden;
  }

  & h5 {
    color: #0b0a0a;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    padding: 12px 15px;
  }

  /* & > div:nth-child(1) {
    width: 285px;
    height: 200px;
    border-radius: 10px;
    background: #e4e7e9;
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  } */

  /* & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 140px;
    padding: 12px 15px;
    cursor: pointer;

    & > div:nth-child(1) {
      display: flex;
      flex-direction: column;
      gap: 6px;

      & > h5 {
        color: #0b0a0a;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 700;
        line-height: 22px;
      }

      & > p {
        color: rgba(6, 6, 23, 0.6);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
    }

    & > div:nth-child(2) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      & > div {
        display: flex;
        flex-direction: row;
        gap: 6px;

        & > span {
          padding: 5px 10px;
          border-radius: 8px;
          background: #00a8bd;
          color: #fff;
          font-size: 1.4rem;
          font-style: normal;
          font-weight: 600;
          line-height: 16px;

          &:last-child {
            background: #e4e7e9;
            color: #757575;
          }
        }
      }

      & > span {
        color: #757575;
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
      }
    }
  } */
`;

const HomeLayout = styled.div`
  width: 100%;
  /* max-width: 1920px; */
  /* padding: 0 20px; */
`;

const Header = styled.header`
  width: 100%;
  padding: 35px 0px 72.18px 12vw;

  @media screen and (max-width: 768px) {
    padding: 20px 0px 37.65px 20px;

    & > img {
      height: 16px;
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* padding: 0 360px; */
  max-width: 1920px;
  margin: 0 auto;
  margin-bottom: 130px;

  @media screen and (max-width: 768px) {
    margin-bottom: 100px;
  }
`;

const MainLogo = styled.img`
  width: 339.274px;
  height: 77.602px;
  margin-bottom: 72.21px;

  @media screen and (max-width: 768px) {
    height: 52.952px;
    width: 100%;
    margin-bottom: 37.4px;
  }
`;

const Main_Search = styled.section`
  display: flex;
  justify-content: center;
  margin: 80px 0 100px 0;
  width: 100%;
  padding: 0 20px;

  & > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 540px;
    border-radius: 100px;
    border: 1px solid rgba(48, 61, 72, 0.2);
    background: #eef7fb;
    gap: 15px;
    overflow: hidden;
    padding-left: 24px;

    & > input {
      background: none;
      width: 100%;
      padding: 17px 0;
      font-size: 1.8rem;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;

      &::placeholder {
        color: rgba(6, 6, 23, 0.6);
      }
    }
  }

  @media screen and (max-width: 768px) {
    margin: 50px 0;

    & > div {
      gap: 8px;
      padding-left: 20px;

      & > img {
        width: 16.001px;
      }

      & > input {
        background: none;
        width: 100%;
        padding: 17px 0;
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;

        &::placeholder {
          color: rgba(6, 6, 23, 0.6);
        }
      }
    }
  }
`;

const Main_DBCenter = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;

  h3 {
    align-self: flex-start;
    color: #0b0a0a;
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: 34px;
  }
`;

const DBCenter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

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
        cursor: pointer;

        &:hover {
          background: #303d48;
        }
      }

      & > span:nth-child(2) {
        color: rgba(6, 6, 23, 0.8);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 768px) {
    gap: 16px;

    & > h3 {
      font-size: 3vw;
    }

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
      /* flex-shrink: 1; */
      /* background-color: #303d48; */

      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;

        & > span:nth-child(1) {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 72px;
          height: 72px;
          border-radius: 100px;
          background: #00a8bd;
          color: #fff;
          font-size: 1.2rem;
          font-style: normal;
          font-weight: 600;
          line-height: 11px;
          text-align: center;
          cursor: pointer;

          &:hover {
            background: #303d48;
          }
        }

        & > span:nth-child(2) {
          color: rgba(6, 6, 23, 0.8);
          font-size: 1.2rem;
          font-style: normal;
          font-weight: 600;
          line-height: 16px;
          cursor: pointer;
        }
      }
    }
  }
`;

export default HOME;
