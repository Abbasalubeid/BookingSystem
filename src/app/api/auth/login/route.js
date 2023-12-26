import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const { rows } = await sql`
      SELECT id, username, admin 
      FROM users 
      WHERE username = ${username} 
      AND password = ${password}
    `;

    if (rows.length > 0) {
      const user = rows[0];
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username, 
          admin: user.admin 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );

      const serializedCookie = cookie.serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        sameSite: 'strict',
        path: '/',
      });

      return new Response(JSON.stringify({ user: { id: user.id, username: user.username, admin: user.admin } }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': serializedCookie,
        },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
