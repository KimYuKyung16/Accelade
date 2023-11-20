/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultInstance } from '../utils/instance';

interface ListProps {
  field: string;
  pageno: number;
}

export const _getList = async (category: ListProps) => {
  try {
    const { data, status } = await defaultInstance.get(
      `/excels?field=${category.field}&pageno=${category.pageno}`
    );
    return { data, status };
  } catch (e: any) {
    console.log(e);
    return {
      error: e.response.data.detail, // error 상세사항
      status: e.response.status, // error status
      code: e.response.data.code, // error 코드
    };
  }
};

export const _getCorporationInfo = async (id: string) => {
  try {
    const { data, status } = await defaultInstance.get(`/excels/${id}`);
    return { data, status };
  } catch (e: any) {
    console.log(e);
    return {
      error: e.response.data.detail, // error 상세사항
      status: e.response.status, // error status
      code: e.response.data.code, // error 코드
    };
  }
};

interface InfoProps {
  keyword: string;
  pageno: number;
}

export const _getSearchedList = async (info: InfoProps) => {
  try {
    const { data, status } = await defaultInstance.get(
      `/excels/search?keyword=${info.keyword}&pageno=${info.pageno}`
    );
    return { data, status };
  } catch (e: any) {
    // console.log(e);
    return {
      error: e.response.data.detail, // error 상세사항
      status: e.response.status, // error status
      code: e.response.data.code, // error 코드
    };
  }
};
