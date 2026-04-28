import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  await prisma.productType.deleteMany();
  await prisma.productType.createMany({
    data: [
      { key: 'monitor', icon: '/products/monitor.png' },
      { key: 'phone', icon: '/products/phone.png' },
      { key: 'laptop', icon: '/products/laptop.png' },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
