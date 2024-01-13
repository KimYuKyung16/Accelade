/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultInstance, authInstance, fileInstance } from '../utils/instance';

interface UserAuthProps {
  username: string;
  password: string;
}

// export const signup = async () => {
//   try {
//     const { data, status } = await defaultInstance.post(`/admin/signup`, {
//       username: 'kim',
//       password: '1234',
//     });
//     return { data, status };
//   } catch (e: any) {
//     return {
//       status: e.response.status, // error status
//     };
//   }
// };

export const login = async (info: UserAuthProps) => {
  try {
    const { data, status } = await defaultInstance.post(`/admin/login`, info);
    return { data, status };
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

export const uploadExcelFile = async (excel: FormData) => {
  try {
    const { data, status } = await fileInstance.post(`/admin/upload`, excel);
    return { data, status };
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

export const confirmToken = async () => {
  try {
    const { data, status } = await authInstance.post(`/admin/token`);
    return { data, status };
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
