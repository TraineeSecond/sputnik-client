import axios from 'axios';

export async function register(
  email: string,
  password: string,
  checked: boolean,
  name: string,
) {
  try {
    const {data} = await axios.post('https://domennameabcdef.ru/api/register', {
      email,
      password,
      role: checked ? 'seller' : 'buyer',
      name,
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
