import prisma from '../src/prisma/client';
import bcrypt from 'bcrypt';

async function main(){
  const email = process.env.ADMIN_EMAIL || 'smrgtrrzz@gmail.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const exists = await prisma.user.findUnique({ where: { email } });
  if (!exists) {
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { email, password: hash, role: 'admin' } });
    console.log('Admin user created:', email);
  } else {
    console.log('Admin already exists');
  }
}

main().catch(e => { console.error(e); process.exit(1); }).finally(()=> prisma.$disconnect());
