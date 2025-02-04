import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://forsage.docs.apiary.io/api/products');
    const products = response.data;

    console.log('Полученные продукты:', products); // Посмотрим, что приходит с API

    for (const product of products) {
      console.log('Обрабатываем продукт:', product); // Проверим каждый продукт

      await prisma.product.upsert({
        where: { id: product.id },
        update: {},
        create: {
          id: product.id,
          name: product.name,
          description: product.description || '',
          price: product.price || 0,
          stock: product.stock || 0,
        },
      });
    }

    res.status(200).json({ message: 'Импорт товаров завершён!' });
  } catch (error) {
    console.error('Ошибка при импорте:', error);

    res.status(500).json({
      error: error.message,
      stack: error.stack,
      details: error.response ? error.response.data : 'Нет дополнительных данных',
    });
  }
}
