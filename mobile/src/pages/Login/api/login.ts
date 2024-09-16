import axios from 'axios';

export async function login(email: string, password: string) {
  try {
    const {data} = await axios.post('https://domennameabcdef.ru/api/login', {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error(error);
    return {error: 'Ошибка авторизации'};
  }
}
