import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { _getList } from '@apis/api/corporation';
import { default as Header_ } from '@components/header';
import Footer from '@components/footer';

const sectors = [
  ['Machine', '기계'],
  ['Plastic', '플라스틱'],
  ['Automated System', '자동화'],
  ['Metal', '금속'],
  ['Textile', '섬유'],
  ['Chemicals', '화학물질'],
  ['Electronic', '전기/전자'],
  ['ETC', '기타'],
];

interface listProps {
  companyName: string;
  companyType: string;
  id: number;
  sector: string[];
  website: string;
}

function Sector() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [list, setList] = useState<listProps[]>([]); // 회사 리스트
  const [selected, setSelected] = useState(state.sector); // 현재 선택된 분야
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined); // 현재 페이지
  const [startNum, setStartNum] = useState<number>(0); // 페이지 시작 번호
  const [btnVisible, setBtnVisible] = useState<{
    left: boolean;
    right: boolean;
  }>({ left: false, right: true }); // 좌우 버튼 가시성 여부
  const [search, setSearch] = useState(''); // 검색어
  const [arrowState, setArrowState] = useState(false); // 페이징 좌우 화살표 클릭 여부

  // 검색칸에서 엔터를 눌렀을 경우
  const handleOnSearchKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      if (search.length === 0) {
        return;
      }
      navigate(`/search?val=${search}`);
    }
  };
  // 리스트 가져오기
  const getList = async () => {
    if (!currentPage) return;
    const result = await _getList({
      field: selected ? selected : '기계',
      pageno: currentPage,
    });
    setList(result.data.dataList);
    setTotalPages(result.data.totalPages);
  };
  /* 페이지 버튼 생성하기 */
  const create_PageBtn = () => {
    if (!totalPages) return;
    const buttonArray = [];
    const start = startNum * 5 + 1;
    let last = start + 4;
    last = last >= totalPages ? totalPages : last;
    for (let i = start; i <= last; i++) {
      buttonArray.push(
        <PageBtn
          key={i}
          onClick={() => {
            setCurrentPage(i);
          }}
          $color={i === currentPage}
        >
          {i}
        </PageBtn>
      );
    }
    return buttonArray;
  };

  /* 좌우로 이동하는 버튼 생성 여부 */
  useEffect(() => {
    if (!totalPages || !currentPage) return;
    if (totalPages <= 5) setBtnVisible({ left: false, right: false });
    else if (currentPage >= 1 && currentPage <= 5) {
      setBtnVisible({ left: false, right: true });
    } else if (startNum + 1 >= Number(totalPages / 5)) {
      setBtnVisible({ left: true, right: false });
    } else {
      setBtnVisible({ left: true, right: true });
    }
  }, [totalPages, currentPage]);
  // 현재 페이지 설정하는 부분
  useEffect(() => {
    if (arrowState) {
      setCurrentPage(startNum * 5 + 1);
    }
  }, [startNum]);

  // 제일 처음 렌더링될 때 이미 저장되어있는 값이 있다면 적용
  useEffect(() => {
    if (localStorage.getItem('selected')) {
      // localstorage에 selected 값이 있을 경우
      setSelected(localStorage.getItem('selected'));
    }
    if (localStorage.getItem('currentPage')) {
      // localstorage에 currentPage 값이 있을 경우
      setCurrentPage(Number(localStorage.getItem('currentPage')));
    } else {
      setCurrentPage(1);
    }
    if (localStorage.getItem('startNum')) {
      // localstorage에 startNum 값이 있을 경우
      setStartNum(Number(localStorage.getItem('startNum')));
    } else {
      setStartNum(0);
    }
  }, []);

  // 분야 선택 바꿀 때마다 적용
  useEffect(() => {
    localStorage.setItem('selected', selected);
  }, [selected]);
  // 현재 페이지 바꿀 때마다 적용
  useEffect(() => {
    if (currentPage) {
      let nStartNum = Math.floor(currentPage / 5);
      if (currentPage % 5 === 0) nStartNum--;
      // currentPage, startNum 설정
      localStorage.setItem('currentPage', String(currentPage));
      localStorage.setItem('startNum', String(nStartNum));
    }
  }, [currentPage]);
  useEffect(() => {
    getList();
  }, [selected, currentPage]);

  return (
    <SectorLayout>
      <Helmet>
        <meta
          name="description"
          content="Vietnam corporate information exchange platform 베트남 기업정보교류플랫폼"
        />
      </Helmet>
      <Header_ />
      <Header>
        <img
          src="images/main-logo.svg"
          onClick={() => {
            navigate('/');
          }}
        />
        <Search>
          <img src="icons/search-icon.svg" />
          <input
            placeholder="기업명을 검색하세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
            }}
            onKeyDown={handleOnSearchKeyPress}
          />
        </Search>
      </Header>
      <Main>
        <Sectors>
          {sectors.map((sector) => {
            return (
              <Sector_ key={sector[0]} $color={sector[1] === selected}>
                <span
                  onClick={() => {
                    setSelected(sector[1]);
                    setCurrentPage(1);
                    setStartNum(0);
                  }}
                >
                  {sector[0]}
                </span>
                <span
                  onClick={() => {
                    setSelected(sector[1]);
                    setCurrentPage(1);
                    setStartNum(0);
                  }}
                >
                  {sector[1]}
                </span>
              </Sector_>
            );
          })}
        </Sectors>

        <CorporationList>
          {list &&
            list?.map((value, index) => {
              return (
                <Corporation key={index}>
                  <div>
                    <div>
                      <h6
                        onClick={() => {
                          navigate(`/corporation/${value.id}`);
                        }}
                      >
                        {value.companyName}
                      </h6>
                      <div>
                        {/* {value.sector.map((x: any) => {
                      return <span key={x}>{x}</span>;
                    })} */}
                        <span>{value.sector[0]}</span>
                        <span>{value.companyType} 기업</span>
                      </div>
                    </div>

                    <p>{value.website}</p>
                  </div>
                </Corporation>
              );
            })}
          <Pagination>
            <MoveBtn
              $visible={btnVisible.left}
              onClick={() => {
                setStartNum((value) => value - 1);
                setArrowState(true);
              }}
              type="button"
              value="<"
            />
            {create_PageBtn()}
            <MoveBtn
              $visible={btnVisible.right}
              onClick={() => {
                setStartNum((value) => value + 1);
                setArrowState(true);
              }}
              type="button"
              value=">"
            />
          </Pagination>
        </CorporationList>
      </Main>
      <Footer />
    </SectorLayout>
  );
}

const SectorLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
  gap: 50px;

  & > img {
    width: 199.573px;
    height: 45.648px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 21px;
    margin: 21px auto;

    & > img {
      height: 25.563px;
      width: 111.761px;
    }
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
    padding: 13px 24px 13px 0;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;

    &::placeholder {
      color: rgba(6, 6, 23, 0.6);
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 20px;
    gap: 8px;

    & > img {
      width: 16px;
    }

    & > input {
      padding: 15px 20px 15px 0px;
      font-size: 1.6rem;

      &::placeholder {
        color: rgba(6, 6, 23, 0.6);
      }
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 100%;
  height: auto;
  max-width: 1200px;
  min-height: calc(100vh - 562px);
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (max-width: 768px) {
    gap: 44px;
    min-height: calc(100vh - 224px);
  }
`;

const Sectors = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
  width: 100%;
  gap: 16px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
  }
`;

const Sector_ = styled.div<{ $color: boolean }>`
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
    background: ${(props) => (props.$color ? '#303d48' : '#00a8bd')};
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

  @media screen and (max-width: 768px) {
    gap: 5px;

    & > span:nth-child(1) {
      width: 72px;
      height: 72px;
      font-size: 1.2rem;
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
`;

const CorporationList = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 130px;
  min-height: 500px;

  @media screen and (max-width: 768px) {
    margin-bottom: 115px;
    min-height: 200px;
  }
`;

const Corporation = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 25px 0;
  border-bottom: 1px solid #e4e7e9;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 15px;

    & > div {
      display: flex;
      flex-direction: row;
      width: 70%;
      gap: 15px;

      & > h6 {
        color: #060617;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 700;
        line-height: 22px;
        max-width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
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
          white-space: nowrap;
        }

        & > span {
          background: #00a8bd;
          color: #fff;
        }

        & > span:last-child {
          background: #e4e7e9;
          color: #757575;
        }
      }
    }

    & > p {
      color: rgba(6, 6, 23, 0.6);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 400;
      width: 30%;
      word-break: break-all;
      text-align: right;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 14px 0;

    & > div {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;

      & > div {
        flex-direction: column-reverse;
        gap: 4px;
        width: 100%;

        // 회사명
        & > h6 {
          max-width: 100%;
          font-size: 1.6rem;
        }

        & > div {
          & > span {
            padding: 4px 8px;
            font-size: 1.2rem;
          }
        }
      }

      & > p {
        font-size: 1.2rem;
        text-align: left;
        width: 100%;
      }
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-top: 80px;

  @media screen and (max-width: 768px) {
    gap: 0px;
    margin-top: 50px;
  }
`;

const PageBtn = styled.button<{ $color: boolean }>`
  width: 40px;
  height: 40px;
  background: none;
  color: ${(props) => (props.$color ? '#00a8bd' : '#4d4d4d')};
  border-radius: 10px;
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const MoveBtn = styled.input<{ $visible: boolean }>`
  display: ${(props) => (props.$visible === true ? 'visible' : 'none')};
  width: 40px;
  height: 40px;
  background-color: #6663ff;
  background: none;
  color: #4d4d4d;
  border-radius: 10px;
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export default Sector;
