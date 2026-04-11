import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const types = ['Monitors', 'Phones', 'Laptops'];

function r(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  await prisma.price.deleteMany();
  await prisma.product.deleteMany();
  await prisma.order.deleteMany();

  for (let i = 1; i <= 10; i++) {
    await prisma.order.create({
      data: {
        title: `Order ${i}`,
        description: 'test',
        date: new Date(),
        products: {
          create: Array.from({ length: 3 }).map((_, j) => ({
            title: `Product ${i}-${j}`,
            serialNumber: Math.floor(Math.random() * 10000),
            type: r(types),
            isNew: Math.random() > 0.5,
            photo: 'img.jpg',
            specification: 'spec',
            date: new Date(),
            guaranteeStart: new Date(),
            guaranteeEnd: new Date(),
            prices: {
              create: [
                { value: 100, symbol: 'USD', isDefault: false },
                { value: 2500, symbol: 'UAH', isDefault: true },
              ],
            },
          })),
        },
      },
    });
  }

  console.log('done');
}

main().finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
