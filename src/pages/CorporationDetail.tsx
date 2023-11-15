/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import Footer from '@components/footer';
import { _getCorporationInfo } from '@apis/api/corporation';

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
  facilityStatus: string[];
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

  // const dummy1 = [
  //   '민간 기업',
  //   '2012년 설립',
  //   '종업원수 956명',
  //   '공장면적 13,000m2',
  //   '자본 구조 100%',
  // ];

  const dummy2 = [
    ['자본금', info?.companyOverview.capital],
    ['최근 매출', info?.companyOverview.recentSales],
    ['총 자산', '21,692,087 VND'],
    ['단기 자산', '16,723,565 VND'],
    ['장기 자산', '4,968,522 VND'],
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

  // const dummy6 = [
  //   '원사제품',
  //   '재킷',
  //   '미니스커트',
  //   '반바지',
  //   '남녀 진/카키/벨벳',
  //   '아동복',
  //   '티셔츠',
  //   '셔츠',
  //   '수트',
  //   '외투',
  // ];

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
      // console.log(result.data);
      setInfo(result.data);
    }
  };

  useEffect(() => {
    getCorporationInfo();
  }, [id]);

  return (
    <CorporationDetailLayout>
      <CorporationInfo>
        <TitleBox>
          <div>
            <h1>{info?.title}</h1>
            <p>{info?.website}</p>
          </div>
          {/* <img src="/images/corporation-logo.svg" /> */}
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
        <button>문의</button>
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
        <Facility>
          <h3>시설현황</h3>
          <table>
            <tr>
              <th>구분</th>
              <th>시설명칭</th>
              <th>수량 (대)</th>
              <th>제조사</th>
              <th>제조국</th>
            </tr>
            <tr>
              <td rowSpan={6}>시설</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>

            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </Facility>
      </Main>
      <Footer />
    </CorporationDetailLayout>
  );
}

const CorporationDetailLayout = styled.div`
  width: 100%;
  min-width: 1920px;
`;

const CorporationInfo = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 1920px;
  width: 100%;
  padding: 0 360px;
  max-width: 1920px;
  margin: 0 auto;
  gap: 50px;
  margin-top: 120px;
  margin-bottom: 80px;

  & > button {
    display: flex;
    align-self: flex-start;
    height: 54px;
    padding: 7px 0px;
    width: 145px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: #6663ff;
    color: #fff;
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & > h1 {
      color: #0b0a0a;
      font-size: 3rem;
      font-style: normal;
      font-weight: 600;
      line-height: 34px;
    }

    & > p {
      color: rgba(11, 10, 10, 0.6);
      font-size: 2rem;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }
  }

  & > img {
    width: 230px;
    height: 46px;
  }
`;

const InformationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    & > span {
      display: flex;
      width: 74px;
      padding: 7px 0px;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background: #e4e7e9;
      color: #0b0a0a;
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      white-space: nowrap;
    }

    & > p {
      color: rgba(11, 10, 10, 0.8);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eef7fb;
  width: 100%;
  min-width: 1920px;
  width: 100%;
  padding: 80px 360px 130px 360px;
  margin: 0 auto;
  gap: 50px;
`;

const Overview = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid #ededed;
  background: #fff;
  width: 1200px;
  height: auto;
  padding: 30px 0px 40px 30px;
  gap: 30px;

  & > h3 {
    color: #0b0a0a;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    gap: 15px;
    flex-wrap: wrap;

    & > span {
      padding: 12px 20px;
      background: #ebefff;
      color: #0b0a0a;
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      border-radius: 100px;
      white-space: nowrap;

      &:nth-child(5) {
        background: #ffe9ed;
      }
    }
  }

  & > div:nth-child(3) {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;

    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

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

      & > p {
        color: rgba(11, 10, 10, 0.9);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }

      &:nth-child(n + 3):nth-child(-n + 5) {
        & > span {
          color: #ffffff;
          background: #00a8bd;
        }
      }
    }
  }

  & > div:nth-child(4) {
    display: flex;
    gap: 15px;

    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      & > span {
        color: #0b0a0a;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        padding: 8px 10px;
        border-radius: 10px;
        background: #e4e7e9;
      }

      & > p {
        color: rgba(11, 10, 10, 0.9);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    }
  }
`;

const Business = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid #ededed;
  background: #fff;
  width: 1200px;
  height: auto;
  padding: 30px 30px 40px 30px;
  gap: 30px;

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

    & > div {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 12px;

      & > span {
        padding: 10px 20px;
        border-radius: 10px;
        background: #00a8bd;
        color: #fff;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        white-space: nowrap;
      }
    }

    & > p {
      color: rgba(11, 10, 10, 0.8);
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
  }

  // 수출국 ~ 수입품
  & > div:nth-child(3) {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;

    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;

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

    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

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

      & > p {
        color: rgba(11, 10, 10, 0.9);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    }
  }
`;

const Technology = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid #ededed;
  background: #fff;
  width: 1200px;
  height: auto;
  padding: 30px 30px 40px 30px;
  gap: 30px;

  & > h3 {
    color: #0b0a0a;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & > p {
      color: rgba(11, 10, 10, 0.8);
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }

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

  & > div:nth-child(3) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

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

    & > p {
      color: rgba(11, 10, 10, 0.8);
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
  }

  & > div:nth-child(4) {
    display: flex;
    flex-direction: column;
    gap: 15px;

    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      & > span {
        width: 92px;
        text-align: center;
        color: #ffffff;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        padding: 8px 10px;
        border-radius: 10px;
        background: #303d48;
        white-space: nowrap;
      }

      & > p {
        color: rgba(11, 10, 10, 0.9);
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    }
  }

  & > div:nth-child(5) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
    & > img {
      width: 262.5px;
      height: 180px;
      border-radius: 14px;
      background: linear-gradient(0deg, #969696 0%, #969696 100%),
        linear-gradient(0deg, #969696 0%, #969696 100%), #969696;
    }
  }
`;

const Facility = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid #ededed;
  background: #fff;
  width: 1200px;
  height: auto;
  padding: 30px 0px 40px 30px;
  gap: 30px;

  & > h3 {
    color: #0b0a0a;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
  }

  & > table {
    border-collapse: collapse;
    border: 1px solid #444444;
    table-layout: fixed;
    width: 1140px;
    border-radius: 12px;

    th,
    td {
      border: 1px solid #444444;
      padding: 12px 35px;
      color: #0b0a0a;
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      text-align: center;
    }

    th {
      background: #eaf1f4;

      &:nth-child(2) {
        width: 140px;
      }
      &:nth-child(2) {
        width: 350px;
      }
      &:nth-child(3) {
        width: 140px;
      }
      &:nth-child(3) {
        width: 310px;
      }
      &:nth-child(3) {
        width: 200px;
      }
    }
    & > tr:nth-child(2) {
      & > td:nth-child(1) {
        background: #eaf1f4;
        padding: 0;
      }
    }

    td {
      padding: 14px 35px;
    }
  }
`;

export default CorporationDetail;
