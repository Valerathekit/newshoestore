import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://forsage.docs.apiary.io/api/products');
    console.log('Ответ от API:', response.data); // Логируем ответ

    res.status(200).json(response.data); // Возвращаем данные API напрямую
  } catch (error) {
    console.error('Ошибка при подключении к API:', error);

    res.status(500).json({
      error: error.message,
      stack: error.stack,
      details: error.response ? error.response.data : 'Нет дополнительных данных',
    });
  }
}
