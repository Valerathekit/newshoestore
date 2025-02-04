import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://forsage.docs.apiary.io/api/products');
    const products = response.data;

    for (const product of products) {
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

    res.status(200).json({ message: 'Импорт товаров завершен!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при импорте товаров' });
  }
}