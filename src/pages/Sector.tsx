import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Footer from '@components/footer';
import { _getList } from '@apis/api/corporation';

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
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startNum, setStartNum] = useState<number>(0); // 패이지 시작 번호
  const [btnVisible, setBtnVisible] = useState<{
    left: boolean;
    right: boolean;
  }>({ left: false, right: true }); // 좌우 버튼 가시성 여부
  const [search, setSearch] = useState(''); // 검색어

  // 검색칸에서 엔터를 눌렀을 경우
  const handleOnSearchKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      if (search.length === 0) {
        return;
      }
      navigate(`/search?val=${search}`);
    }
  };

  /* 페이지 버튼 생성하기 */
  const create_PageBtn = () => {
    const buttonArray = [];
    const start = startNum * 10 + 1;
    let last = start + 9;
    last = last >= totalPages ? totalPages : last;
    for (let i = start; i <= last; i++) {
      buttonArray.push(
        <button
          key={i}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </button>
      );
    }
    return buttonArray;
  };

  const getList = async () => {
    const result = await _getList({
      field: selected ? selected : '기계',
      pageno: currentPage, // 일단 기본으로 1, 아직 페이징 처리X
    });
    setList(result.data.dataList);
    setTotalPages(result.data.totalPages);
  };

  useEffect(() => {
    getList();
  }, [selected, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setStartNum(0);
  }, [selected]);

  /* 버튼 생성 여부 */
  useEffect(() => {
    if (totalPages <= 10) setBtnVisible({ left: false, right: false });
    else if (currentPage >= 1 && currentPage <= 10) {
      setBtnVisible({ left: false, right: true });
    } else if (startNum + 1 >= Number(totalPages / 10)) {
      setBtnVisible({ left: true, right: false });
    } else {
      setBtnVisible({ left: true, right: true });
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    setCurrentPage(startNum * 10 + 1);
  }, [startNum]);

  return (
    <SectorLayout>
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
                  }}
                >
                  {sector[0]}
                </span>
                <span
                  onClick={() => {
                    setSelected(sector[1]);
                  }}
                >
                  {sector[1]}
                </span>
              </Sector_>
            );
          })}
        </Sectors>
        {list.length ? (
          <CorporationList>
            {list.map((value, index) => {
              return (
                <Corporation key={index}>
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
                }}
                type="button"
                value="<"
              />
              {create_PageBtn()}
              <MoveBtn
                $visible={btnVisible.right}
                onClick={() => {
                  setStartNum((value) => value + 1);
                }}
                type="button"
                value=">"
              />
              {/* {new Array(totalPages).fill(0).map((_, index) => {
                return (
                  <PageBtn
                    key={index}
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                      setSelectedPage(
                        Number((e.target as HTMLElement).innerText)
                      );
                    }}
                    $color={index + 1 === selectedPage}
                  >
                    {index + 1}
                  </PageBtn>
                );
              })} */}
            </Pagination>
          </CorporationList>
        ) : null}
      </Main>
      <Footer />
    </SectorLayout>
  );
}

interface IVisible_Props {
  $visible: boolean;
}

const MoveBtn = styled.input<IVisible_Props>`
  display: ${(props: IVisible_Props) =>
    props.$visible === true ? 'visible' : 'none'};
  width: 40px;
  height: 40px;
  background-color: #6663ff;
  color: #ffffff;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
`;

// const PageBtn = styled.button<{ $color: boolean }>`
//   width: 40px;
//   /* padding: 0 15px; */
//   height: 40px;
//   background-color: ${(props) => (props.$color ? '#3e3cb7' : '#6663ff')};
//   color: #ffffff;
//   border-radius: 10px;
//   font-size: 1.5rem;
//   font-weight: 600;
//   cursor: pointer;
// `;

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-top: 80px;

  & > button {
    width: 40px;
    height: 40px;
    background-color: #6663ff;
    color: #ffffff;
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: 600;
    cursor: pointer;
  }
`;

const SectorLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1920px;
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
    cursor: pointer;
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
  min-height: calc(100vh - 562px);
`;

const Sectors = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CorporationList = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 130px;

  /* & > button {
    height: 46px;
    padding: 12px 95px;
    border-radius: 100px;
    background: #6663ff;
    color: #fff;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;

  } */
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
      max-width: 480px;
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
`;

export default Sector;
