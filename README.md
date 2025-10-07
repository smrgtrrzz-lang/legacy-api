# legacy-api

TypeScript + Express backend for Replit/Supabase.  
Includes JWT auth, Prisma models, and a Post resource.

## Quickstart (Replit)

1. Create a new Replit project and upload the ZIP contents.
2. Create a `.env` file (copy from `.env.example`) and set `DATABASE_URL` to your Supabase connection string.
3. In Replit Shell, run:
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   # optionally run seed to create admin:
   node ./node_modules/.bin/ts-node prisma/seed.ts
   npm run dev
   ```
4. Open the webview and visit `/api/health`.

## Admin user

Sample admin email: smrgtrrzz@gmail.com  
Sample password: admin123

## API Endpoints

- `POST /api/auth/register` - { email, password }
- `POST /api/auth/login` - { email, password }
- `GET /api/posts` - protected
- `POST /api/posts` - protected
- `PUT /api/posts/:id` - protected
- `DELETE /api/posts/:id` - protected
- `GET /api/health` - public health check

## Notes

- Replace values in `.env` (DATABASE_URL, JWT_SECRET) before production.
- This project uses ESM modules and nodemon for development.
