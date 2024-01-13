import { login } from '@apis/api/admin';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface LoginVals {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [loginVals, setLoginVals] = useState<LoginVals>({
    username: '',
    password: '',
  }); // 아이디, 패스워드

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVals((value) => ({ ...value, username: e.target.value }));
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVals((value) => ({ ...value, password: e.target.value }));
  };

  const onClickLoginBtn = async () => {
    const result = await login(loginVals);

    if (result.status === 401) {
      alert('아이디 혹은 패스워드를 잘못 입력하셨습니다. 다시 시도해주세요');
      return;
    }
    // token 받아서 저장
    const token = result.data.token;
    localStorage.setItem('accessToken', token);
    navigate('/admin', { state: { permit: true } });
  };

  return (
    <LoginLayout>
      <Helmet>
        <meta
          name="description"
          content="Vietnam corporate information exchange platform 베트남 기업정보교류플랫폼"
        />
      </Helmet>
      <LoginBox>
        <h3>System Admin</h3>
        <InputLabelBox>
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            name="id"
            placeholder="아이디를 입력해주세요"
            onChange={onChangeId}
          />
        </InputLabelBox>
        <InputLabelBox>
          <label htmlFor="pw">패스워드</label>
          <input
            type="password"
            name="pw"
            placeholder="패스워드를 입력해주세요"
            onChange={onChangePw}
          />
        </InputLabelBox>
        <LoginBtn onClick={onClickLoginBtn}>로그인</LoginBtn>
      </LoginBox>
    </LoginLayout>
  );
}

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #00a8bd;
  background: linear-gradient(135deg, #00a8bd 50%, #303d48 50%);
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 450px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px 20px 20px 20px;
  box-shadow: 0 0 20px 5px #00000035;
  gap: 15px;
  margin-bottom: 80px;

  & > h3 {
    font-size: 3rem;
    text-align: center;
    color: #636363;
  }
`;

const InputLabelBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  & > label {
    font-size: 1.5rem;
    font-weight: 600;
    color: #303d48;
  }

  & > input {
    width: 100%;
    padding: 10px 15px;
    font-size: 1.7rem;
    border-radius: 10px;
    border: 2px solid #303d48;

    &::placeholder {
      color: #7a7a7a;
    }

    &:focus {
      border: 2px solid #00a8bd;
      color: #00a8bd;
    }
  }
`;

const LoginBtn = styled.button`
  background: #00a8bd;
  border-radius: 10px;
  font-size: 2rem;
  color: white;
  padding: 10px;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background: #303d48;
  }
`;

export default Login;
