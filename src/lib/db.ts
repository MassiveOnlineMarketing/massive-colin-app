// npm i -D prisma
// npx prisma init
// npm i @prisma/client
// npx prisma generate 
// npx prisma db push 

// npm install @prisma/client @auth/prisma-adapter
// npm install prisma --save-dev


import { PrismaClient } from '@prisma/client'


declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

// Save the db instance in globalThis to avoid duplicate instances 
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db


