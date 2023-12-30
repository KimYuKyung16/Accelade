/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import Footer from '@components/footer';
import Header from '@components/header';
import { _getCorporationInfo } from '@apis/api/corporation';

interface facilityStatusProps {
  machine: string;
  manuCom: string;
  manuCoun: string;
  model: string;
  quantity: string;
}

interface InformationProps {
  title: string;
  website: string;
  companyName: string;
  companyInfo: {
    FAX: string;
    email: string;
    factory: string;
    manager: string;
    tell: string;
  };
  companyOverview: {
    capital: string;
    info: string[];
    recentSales: string;
  };
  customersItems: {
    customer: string[];
    exportCountry: string[];
    exportItem: string[];
    fromMaterials: string[];
    importimgCountry: string[];
    importimgItem: string[];
    rawMaterials: string[];
  };
  facilityStatus: facilityStatusProps[];
  fieldTech: {
    currentProd: string;
    field: string[];
    mainProduct: string[];
    min: string;
    processMethod: string[];
    productivity: string;
    standard: string[];
  };
}

function CorporationDetail() {
  const params = useParams();
  const id = params.id;
  const [info, setInfo] = useState<InformationProps | undefined>(undefined);

  const dummy2 = [
    ['자본금', info?.companyOverview.capital],
    ['최근 매출', info?.companyOverview.recentSales],
    ['총 자산', 'N/A'],
    ['단기 자산', 'N/A'],
    ['장기 자산', 'N/A'],
  ];

  const dummy3 = [
    ['손이익', 'N/A'],
    ['세전이익', 'N/A'],
    ['세후이익', 'N/A'],
  ];

  const dummy4 = [
    ['수출국', info?.customersItems?.exportCountry.join(', ')],
    ['수출품', info?.customersItems?.exportItem.join(', ')],
    ['수입국', info?.customersItems?.importimgCountry.join(', ')],
    ['수입품', info?.customersItems?.importimgItem.join(', ')],
  ];

  const dummy5 = [
    ['원자재', info?.customersItems?.rawMaterials.join(', ')],
    [
      '원자재 출처',
      typeof info?.customersItems?.fromMaterials !== 'string'
        ? info?.customersItems?.fromMaterials.join(', ')
        : null,
    ],
  ];

  const dummy7 = [
    ['분야', info?.fieldTech.field.join(', ')],
    [
      '가공방식',
      info?.fieldTech.processMethod.length
        ? info?.fieldTech.processMethod.join(', ')
        : 'N/A',
    ],
    ['현생산량', info?.fieldTech.currentProd],
    ['최소주문', info?.fieldTech.min],
    ['생산능력', info?.fieldTech.productivity],
  ];

  const getCorporationInfo = async () => {
    if (id) {
      const result = await _getCorporationInfo(id);
      console.log(result.data);
      setInfo(result.data);
    }
  };

  useEffect(() => {
    getCorporationInfo();
  }, [id]);

  return (
    <CorporationDetailLayout>
      <Header />
      <CorporationInfo>
        <TitleBox>
          <h1>{info?.title}</h1>
          <p>{info?.website}</p>
        </TitleBox>
        <InformationBox>
          <div>
            <span>회사</span>
            <p>{info?.companyName ? info?.companyName : 'N/A'}</p>
          </div>
          <div>
            <span>공장</span>
            <p>
              {info?.companyInfo.factory ? info?.companyInfo.factory : 'N/A'}
            </p>
          </div>
          <div>
            <span>담당자</span>
            <p>
              {info?.companyInfo.manager ? info?.companyInfo.manager : 'N/A'}
            </p>
          </div>
          <div>
            <span>Tel</span>
            <p>{info?.companyInfo.tell ? info?.companyInfo.tell : 'N/A'}</p>
          </div>
          <div>
            <span>Email</span>
            <p>{info?.companyInfo.email ? info?.companyInfo.email : 'N/A'}</p>
          </div>
          <div>
            <span>Fax</span>
            <p>{info?.companyInfo.FAX ? info?.companyInfo.FAX : 'N/A'}</p>
          </div>
        </InformationBox>
      </CorporationInfo>
      <Main>
        <Overview>
          <h3>기업 개요</h3>
          <div>
            {info?.companyOverview.info.map((x, index) => {
              if (index === 4) {
                x = '자본 구조 100%';
              }
              return <span key={x}>{x}</span>;
            })}
          </div>
          <div>
            {dummy2.map((x) => {
              return (
                <div key={x[0]}>
                  <span>{x[0]}</span>
                  <p>{x[1]}</p>
                </div>
              );
            })}
          </div>
          <div>
            {dummy3.map((x) => {
              return (
                <div key={x[0]}>
                  <span>{x[0]}</span>
                  <p>{x[1]}</p>
                </div>
              );
            })}
          </div>
        </Overview>
        <Business>
          <h3>거래처 및 품목</h3>
          <div>
            <p>주요 고객</p>
            <div>
              {info?.customersItems.customer.map((customer) => {
                if (customer.trim().length === 0) return;
                return <span key={customer}>{customer}</span>;
              })}
            </div>
          </div>
          <div>
            {dummy4.map((x) => {
              if (!x[1]) {
                x[1] = 'N/A';
              }
              return (
                <div key={x[0]}>
                  <span>{x[0]}</span>
                  <p>{x[1]}</p>
                </div>
              );
            })}
          </div>
          <div>
            {dummy5.map((x) => {
              if (!x[1]) {
                x[1] = 'N/A';
              }
              return (
                <div key={x[0]}>
                  <span>{x[0]}</span>
                  <p>{x[1]}</p>
                </div>
              );
            })}
          </div>
        </Business>
        <Technology>
          <h3>분야 기술 생산 시설</h3>
          <div>
            <p>주제품</p>
            <div>
              {info?.fieldTech.mainProduct.map((x) => {
                return <span key={x}>{x}</span>;
              })}
            </div>
          </div>
          <div>
            <p>표준, 규격</p>
            <div>
              {typeof info?.fieldTech.standard !== 'string'
                ? info?.fieldTech.standard.map((x) => {
                    return <span key={x}>{x}</span>;
                  })
                : null}
            </div>
          </div>
          <div>
            {dummy7.map((x) => {
              if (!x[1]) {
                x[1] = 'N/A';
              }
              return (
                <div key={x[0]}>
                  <span>{x[0]}</span>
                  <p>{x[1]}</p>
                </div>
              );
            })}
          </div>
          {/* <div>
            {new Array(8).fill(0).map((_, index) => {
              return <img key={index} src="" alt="제품 이미지" />;
            })}
          </div> */}
        </Technology>
        {info?.facilityStatus && info?.facilityStatus.length !== 0 ? (
          <>
            <Facility>
              <h3>시설현황</h3>
              <table>
                <tr>
                  <th>구분</th>
                  <th>기계</th>
                  <th>모델</th>
                  <th>수량 (대)</th>
                  <th>제조사</th>
                  <th>제조국</th>
                </tr>
                <tr>
                  <td rowSpan={8}>시설</td>
                </tr>
                {info?.facilityStatus.map((x, index) => {
                  if (
                    x.machine === '-' &&
                    x.manuCom === '-' &&
                    x.manuCoun === '-' &&
                    x.model === '-' &&
                    x.quantity === '-'
                  )
                    return;
                  return (
                    <tr key={index}>
                      <td>{x.machine}</td>
                      <td>{x.model}</td>
                      <td>{x.quantity}</td>
                      <td>{x.manuCom}</td>
                      <td>{x.manuCoun}</td>
                    </tr>
                  );
                })}
              </table>
            </Facility>
          </>
        ) : null}
      </Main>
      <Footer />
    </CorporationDetailLayout>
  );
}

const CorporationDetailLayout = styled.div`
  width: 100%;
`;

// 회사의 대표적인 정보
const CorporationInfo = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1240px;
  margin: 80px auto 80px auto;
  padding: 0 20px;
  gap: 50px;
  // 문의 버튼
  & > button {
    display: flex;
    justify-content: center;
    padding: 7px 0px;
    width: 145px;
    border-radius: 100px;
    background: #6663ff;
    color: #fff;
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
  }

  @media screen and (max-width: 768px) {
    margin: 20px auto 46px auto;
    gap: 30px;
    // 문의 버튼
    & > button {
      padding: 12px 0px;
      width: 100%;
      font-size: 1.6rem;
      line-height: 20px;
    }
  }
`;

// 회사명 & 웹사이트
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  // 회사명
  & > h1 {
    color: #0b0a0a;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
  }
  // 웹사이트
  & > p {
    color: rgba(11, 10, 10, 0.6);
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  @media screen and (max-width: 768px) {
    gap: 6px;
    // 회사명
    & > h1 {
      font-size: 1.8rem;
      line-height: 22px;
    }
    // 웹사이트
    & > p {
      font-size: 1.4rem;
      line-height: 14px;
    }
  }
`;

// 회사 상세 정보
const InformationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  // label & 내용
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    // label
    & > span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 74px;
      min-width: 74px;
      padding: 7px 0px;
      border-radius: 10px;
      background: #e4e7e9;
      color: #0b0a0a;
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      white-space: nowrap;
    }
    // 내용
    & > p {
      color: rgba(11, 10, 10, 0.8);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
    }
  }

  @media screen and (max-width: 768px) {
    gap: 12px;
    // label & 내용
    & > div {
      gap: 6px;
      // label
      & > span {
        width: 48px;
        min-width: 48px;
        padding: 4px 0px;
        border-radius: 6px;
        font-size: 1.4rem;
        line-height: 18px;
      }
      // 내용
      & > p {
        font-size: 1.2rem;
        line-height: 16px;
      }
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 1000px);
  background-color: #eef7fb;
  margin: 0 auto;
  padding: 80px 20px 130px 20px;
  gap: 50px;

  @media screen and (max-width: 768px) {
    padding: 40px 20px 100px 20px;
    gap: 20px;
  }
`;

// 기업 개요
const Overview = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  max-width: 1200px;
  background: #ffffff;
  border: 1px solid #ededed;
  border-radius: 24px;
  padding: 30px 30px 40px 30px;
  gap: 30px;
  // 타이틀
  & > h3 {
    color: #0b0a0a;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
  }
  // 기업 특성, 설립일, 종업원 수, 공장 면적, 자본 구조
  & > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    // label
    & > span {
      background: #ebefff;
      color: #0b0a0a;
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      border-radius: 100px;
      white-space: nowrap;
      padding: 12px 20px;
      // 자본 구조
      &:nth-child(5) {
        background: #ffe9ed;
      }
    }
  }
  // 자본 관련 내용
  & > div:nth-child(3) {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    // label & 내용
    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      // label
      & > span {
        color: #0b0a0a;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        padding: 8px 10px;
        border-radius: 10px;
        background: #e4e7e9;
        white-space: nowrap;
      }
      // 내용
      & > p {
        color: rgba(11, 10, 10, 0.9);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
      // 3~5번째 label 선택
      &:nth-child(n + 3):nth-child(-n + 5) {
        & > span {
          color: #ffffff;
          background: #00a8bd;
        }
      }
    }
  }
  // 이익 관련 내용
  & > div:nth-child(4) {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    // label & 내용
    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      // label
      & > span {
        color: #0b0a0a;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        padding: 8px 10px;
        border-radius: 10px;
        background: #e4e7e9;
        white-space: nowrap;
      }
      // 내용
      & > p {
        color: rgba(11, 10, 10, 0.9);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    border-radius: 10px;
    padding: 16px 16px 16px 22px;
    gap: 16px;
    // 타이틀
    & > h3 {
      font-size: 1.6rem;
      line-height: 20px;
    }
    // 기업 특성, 설립일, 종업원 수, 공장 면적, 자본 구조
    & > div:nth-child(2) {
      gap: 8px 6px;
      // label
      & > span {
        font-size: 1.2rem;
        line-height: 16px;
        padding: 6px 14px;
      }
    }
    // 자본 관련 내용
    & > div:nth-child(3) {
      margin-top: 4px;
      gap: 8px 6px;
      // label & 내용
      & > div {
        gap: 6px;
        // label
        & > span {
          font-size: 1.2rem;
          line-height: 16px;
          padding: 4px 6px;
          border-radius: 6px;
        }
        // 내용
        & > p {
          font-size: 1.2rem;
        }
      }
    }
    // 이익 관련 내용
    & > div:nth-child(4) {
      display: flex;
      margin-top: 4px;
      gap: 8px 6px;
      // label & 내용
      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
        // label
        & > span {
          font-size: 1.2rem;
          line-height: 16px;
          padding: 4px 6px;
          border-radius: 6px;
        }
        // 내용
        & > p {
          font-size: 1.2rem;
        }
      }
    }
  }
`;

// 거래처 및 품목
const Business = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  max-width: 1200px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #ededed;
  padding: 30px 30px 40px 30px;
  gap: 30px;
  // 타이틀
  & > h3 {
    color: #0b0a0a;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
  }
  // 주요 고객
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    // 타이틀
    & > p {
      color: rgba(11, 10, 10, 0.8);
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
    // label
    & > div {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 12px;
      // label
      & > span {
        padding: 10px 20px;
        border-radius: 10px;
        background: #00a8bd;
        color: #ffffff;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        white-space: nowrap;
      }
    }
  }
  // 수출국 ~ 수입품
  & > div:nth-child(3) {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    // label & 내용
    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      // label
      & > span {
        color: #0b0a0a;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        padding: 8px 10px;
        border-radius: 10px;
        background: #e4e7e9;
        white-space: nowrap;
      }
      // 내용
      & > p {
        color: rgba(11, 10, 10, 0.9);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    }
  }
  // 원자재
  & > div:nth-child(4) {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    // label & 내용
    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      // label
      & > span {
        color: #0b0a0a;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        padding: 8px 10px;
        border-radius: 10px;
        background: #e4e7e9;
        white-space: nowrap;
      }
      // 내용
      & > p {
        color: rgba(11, 10, 10, 0.9);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    border-radius: 10px;
    padding: 16px 16px 16px 22px;
    gap: 0px;
    // 타이틀
    & > h3 {
      font-size: 1.6rem;
      line-height: 20px;
    }
    // 주요 고객
    & > div:nth-child(2) {
      margin-top: 16px;
      gap: 8px;
      // 타이틀
      & > p {
        font-size: 1.4rem;
        line-height: 18px;
      }
      // label
      & > div {
        gap: 6px;
        // label
        & > span {
          font-size: 1.2rem;
          line-height: 16px;
          border-radius: 6px;
          padding: 4px 6px;
        }
      }
    }
    // 수출국 ~ 수입품
    & > div:nth-child(3) {
      gap: 8px 6px;
      margin-top: 20px;
      // label & 내용
      & > div {
        gap: 6px;
        // label
        & > span {
          font-size: 1.2rem;
          line-height: 16px;
          padding: 4px 6px;
          border-radius: 6px;
        }
        // 내용
        & > p {
          font-size: 1.2rem;
        }
      }
    }
    // 원자재
    & > div:nth-child(4) {
      margin-top: 8px;
      gap: 8px 6px;
      // label & 내용
      & > div {
        gap: 6px;
        // label
        & > span {
          font-size: 1.2rem;
          line-height: 16px;
          padding: 4px 6px;
          border-radius: 6px;
        }
        // 내용
        & > p {
          font-size: 1.2rem;
        }
      }
    }
  }
`;

// 분야 기술 생산 시설
const Technology = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  max-width: 1200px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #ededed;
  padding: 30px 30px 40px 30px;
  gap: 30px;
  // 타이틀
  & > h3 {
    color: #0b0a0a;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
  }
  // 주제품
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    // 타이틀
    & > p {
      color: rgba(11, 10, 10, 0.8);
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
    // label
    & > div {
      display: flex;
      flex-direction: row;
      gap: 8px;
      flex-wrap: wrap;

      & > span {
        padding: 10px 20px;
        border-radius: 10px;
        background: #e4e7e9;
        color: #0b0a0a;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        white-space: nowrap;
      }
    }
  }
  // 표준, 규격
  & > div:nth-child(3) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    // 타이틀
    & > p {
      color: rgba(11, 10, 10, 0.8);
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
    // label
    & > div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 12px;

      & > span {
        color: #fff;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        padding: 10px 20px;
        border-radius: 10px;
        background: #00a8bd;
        white-space: nowrap;
      }
    }
  }
  // 분야 ~ 생산능력
  & > div:nth-child(4) {
    display: flex;
    flex-direction: column;
    gap: 15px;
    // label & 내용
    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      // label
      & > span {
        width: 92px;
        min-width: 92px;
        text-align: center;
        color: #ffffff;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        padding: 8px 0px;
        border-radius: 10px;
        background: #303d48;
        white-space: nowrap;
      }
      // 내용
      & > p {
        color: rgba(11, 10, 10, 0.9);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    border-radius: 10px;
    padding: 16px 16px 16px 22px;
    gap: 0px;
    // 타이틀
    & > h3 {
      font-size: 1.6rem;
      line-height: 20px;
    }
    // 주제품
    & > div:nth-child(2) {
      margin-top: 16px;
      gap: 8px;
      // 타이틀
      & > p {
        font-size: 1.4rem;
        line-height: 18px;
      }
      // label
      & > div {
        gap: 8px 6px;
        // label
        & > span {
          font-size: 1.2rem;
          line-height: 16px;
          border-radius: 6px;
          padding: 4px 6px;
        }
      }
    }
    // 표준, 규격
    & > div:nth-child(3) {
      gap: 8px 6px;
      margin-top: 20px;
      // 타이틀
      & > p {
        font-size: 1.4rem;
        line-height: 18px;
      }
      // label & 내용
      & > div {
        gap: 6px;
        // label
        & > span {
          font-size: 1.2rem;
          line-height: 16px;
          padding: 4px 6px;
          border-radius: 6px;
        }
        // 내용
        & > p {
          font-size: 1.2rem;
        }
      }
    }
    // 분야 ~ 생산능력
    & > div:nth-child(4) {
      flex-direction: row;
      flex-wrap: wrap;
      margin-top: 20px;
      gap: 8px 6px;
      // label & 내용
      & > div {
        gap: 6px;
        // label
        & > span {
          width: 54px;
          min-width: 54px;
          font-size: 1.2rem;
          line-height: 16px;
          padding: 4px 0px;
          border-radius: 6px;
        }
        // 내용
        & > p {
          font-size: 1.2rem;
        }
      }
    }
  }
`;

const Facility = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  width: 100%;
  max-width: 1200px;
  padding: 30px 30px 40px 30px;
  border-radius: 24px;
  border: 1px solid #ededed;
  gap: 30px;
  overflow: auto;
  // 타이틀
  & > h3 {
    color: #0b0a0a;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
    position: sticky;
    top: 0;
    left: 0;
  }
  // 테이블
  & > table {
    /* position: absolute; */
    border-collapse: collapse;
    width: auto;
    border-radius: 12px;
    border-style: hidden;
    box-shadow: 0 0 0 1px #666;
    overflow: hidden;

    th,
    td {
      border: 1px solid #7e839b;
      padding: 12px 35px;
      color: #0b0a0a;
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      text-align: center;
      white-space: nowrap;
    }
    // 테이블 헤더
    th {
      background: #eaf1f4;
      white-space: nowrap;
      &:nth-child(1) {
        width: 140px;
      }
      /* &:nth-child(2) {
        width: 350px;
      } */
      /* &:nth-child(3) {
        width: 140px;
      }
      &:nth-child(3) {
        width: 310px;
      } */
    }
    // 시설
    & > tr:nth-child(2) {
      & > td:nth-child(1) {
        background: #eaf1f4;
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 16px 16px 16px 22px;
    border-radius: 10px;
    gap: 16px;
    // 타이틀
    & > h3 {
      font-size: 1.6rem;
      line-height: 20px;
    }
    // 테이블
    & > table {
      border-radius: 12px;
      border-style: hidden;
      box-shadow: 0 0 0 1px #666;
      overflow: hidden;

      th,
      td {
        border: 1px solid #7e839b;
        padding: 12px 35px;
        color: #0b0a0a;
        font-size: 1.2rem;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        text-align: center;
      }
      // 테이블 헤더
      th {
        background: #eaf1f4;
        white-space: nowrap;
        &:nth-child(1) {
          width: 140px;
        }
      }
      td {
        font-size: 1rem;
        font-weight: 400;
      }
      // 시설
      & > tr:nth-child(2) {
        & > td:nth-child(1) {
          font-size: 1.2rem;
          font-weight: 500;
        }
      }
    }
  }
`;

export default CorporationDetail;
