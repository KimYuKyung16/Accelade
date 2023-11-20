import { _getSearchedList } from '@apis/api/corporation';
import Footer from '@components/footer';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

interface ListProps {
  companyName: string;
  companyType: string;
  id: number;
  sector: string[];
  website: string;
}

function _Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('val');
  const [list, setList] = useState<ListProps[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startNum, setStartNum] = useState<number>(0); // 패이지 시작 번호
  const [totalCount, setTotalCount] = useState(0);
  const [btnVisible, setBtnVisible] = useState<{
    left: boolean;
    right: boolean;
  }>({ left: false, right: true }); // 좌우 버튼 가시성 여부
  const [search, setSearch] = useState(keyword); // 검색어

  // 검색칸에서 엔터를 눌렀을 경우
  const handleOnSearchKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      if (search && search.length === 0) {
        return;
      }
      getSearchedList();
      setCurrentPage(1);
      setStartNum(0);
    }
  };

  const getSearchedList = async () => {
    if (search) {
      const result = await _getSearchedList({
        keyword: search,
        pageno: currentPage, // 임시로 1페이지로 설정
      });
      setList(result.data.dataList);
      setTotalCount(result.data.totalCount);
      setTotalPages(result.data.totalPages);
    }
  };

  /* 페이지 버튼 생성하기 */
  const create_PageBtn = () => {
    const buttonArray = [];
    const start = startNum * 5 + 1;
    let last = start + 4;
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

  useEffect(() => {
    getSearchedList();
  }, [keyword, currentPage]);

  /* 버튼 생성 여부 */
  useEffect(() => {
    if (totalPages <= 5) setBtnVisible({ left: false, right: false });
    else if (currentPage >= 1 && currentPage <= 5) {
      setBtnVisible({ left: false, right: true });
    } else if (startNum + 1 >= Number(totalPages / 5)) {
      setBtnVisible({ left: true, right: false });
    } else {
      setBtnVisible({ left: true, right: true });
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    setCurrentPage(startNum * 5 + 1);
  }, [startNum]);

  return (
    <SearchLayout>
      <Main>
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
        <div>
          <p>검색 결과</p>
          <p>{totalCount}건</p>
        </div>
        <CorporationList>
          {list.map((company, index) => {
            return (
              <Corporation key={index}>
                <div>
                  <div>
                    <h6
                      onClick={() => {
                        navigate(`/corporation/${company.id}`);
                      }}
                    >
                      {company.companyName}
                    </h6>
                    <div>
                      {/* {company.sector.map((x) => {
                        return <span key={x}>{x}</span>;
                      })} */}
                      <span>{company.sector[0]}</span>
                      <span>{company.companyType} 기업</span>
                    </div>
                  </div>

                  <p>{company.website}</p>
                </div>
              </Corporation>
            );
          })}
        </CorporationList>
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
                  setCurrentPage(Number((e.target as HTMLElement).innerText));
                }}
                $color={index + 1 === currentPage}
              >
                {index + 1}
              </PageBtn>
            );
          })} */}
        </Pagination>
      </Main>
      <Footer />
    </SearchLayout>
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
  margin-bottom: 130px;

  & > button {
    width: 40px;
    height: 40px;
    background: none;
    color: #4d4d4d;
    border-radius: 10px;
    font-size: 2rem;
    font-weight: 600;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    gap: 0px;
    margin-top: 50px;
    margin-bottom: 115px;

    & > button {
      font-size: 1.5rem;
    }
  }
`;

const SearchLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  /* min-width: 1920px; */
  /* max-width: 1200px; */
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  /* min-width: 1920px; */
  width: 100%;
  /* padding: 0 360px; */
  /* max-width: 1920px; */
  max-width: 1200px;
  margin: 80px auto;
  /* padding: 0 20px; */

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
    padding: 13px 0;
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  /* margin-bottom: 330px; */
  min-height: calc(100vh - 349px);
  /* min-height: 100vh; */
  padding: 0 20px;

  & > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin-bottom: 50px;

    & > p:nth-child(1) {
      color: rgba(6, 6, 23, 0.8);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
    }

    & > p:nth-child(2) {
      color: rgba(6, 6, 23, 0.8);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
    }
  }

  @media screen and (max-width: 768px) {
    gap: 0px;
    min-height: calc(100vh - 224px);

    & > div:nth-child(2) {
      margin-bottom: 30px;
    }
  }
`;

const CorporationList = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
  /* margin-bottom: 130px; */

  @media screen and (max-width: 768px) {
    min-height: 200px;
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
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    /* background-color: #757575; */

    & > div {
      display: flex;
      flex-direction: row;
      gap: 15px;
      width: 70%;

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

  & > p {
    color: rgba(6, 6, 23, 0.6);
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
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

export default _Search;
