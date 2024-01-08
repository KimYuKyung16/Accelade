import { uploadExcelFile } from '@apis/api/admin';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Main() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const [uploadFile, setUploadFile] = useState<File | undefined>(undefined);

  const upload_excelFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const upload_file = e.target.files?.[0];

    if (upload_file) {
      setFileName(upload_file.name);
      setUploadFile(upload_file);
    }
  };

  const saveFile = async () => {
    if (uploadFile) {
      const fd = new FormData();
      fd.append('file', uploadFile);

      const result = await uploadExcelFile(fd);
      if (result.status !== 200) return;
      alert(result.data);
    }
  };

  useEffect(() => {
    if (!state || !state.permit) {
      // url 직접 접근 방지
      alert('접근할 수 없습니다');
      navigate('/admin/login');
    }
  }, []);

  return (
    <MainLayout>
      <MenuBox>
        <MenuList>
          <li>엑셀 파일 변경</li>
        </MenuList>
      </MenuBox>
      <Contents>
        <ExcelBox>
          <img src="/icons/document-icon.svg" />
          <p>{fileName}</p>
          <label htmlFor="file">Excel 파일 찾기</label>
          <input
            id="file"
            type="file"
            accept=".xls, .xlsx"
            onChange={upload_excelFile}
          />
          <button onClick={saveFile}>저장</button>
        </ExcelBox>
      </Contents>
    </MainLayout>
  );
}

const ExcelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  & > img {
    width: 150px;
    height: 150px;
  }

  & > p {
    font-size: 2rem;
  }

  & > label {
    display: inline-block;
    padding: 10px 20px;
    color: #ffffff;
    vertical-align: middle;
    background-color: #aaaaaa;
    font-size: 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    min-width: 150px;
  }

  & > input {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    border: 0;
    overflow: hidden;
  }

  & > button {
    background: #303d48;
    color: white;
    padding: 10px 20px;
    min-width: 150px;
    border-radius: 10px;
    font-size: 1.7rem;
    cursor: pointer;
  }
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;

const MenuBox = styled.section`
  width: 30%;
  height: 100%;
  background: #00a8bd;
  min-width: 200px;
`;

const MenuList = styled.ul`
  & > li {
    color: white;
    font-size: 2rem;
    font-weight: 500;
    padding: 15px 8px;
    border-bottom: 1px solid white;
    cursor: pointer;

    &:hover {
      background: #303d48;
    }
  }
`;

const Contents = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  width: 70%;
  min-width: 400px;
  padding-bottom: 100px;
`;

export default Main;
