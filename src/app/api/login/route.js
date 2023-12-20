import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// This API route handles the POST request to authenticate a user.
export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const { rows } = await sql`
      SELECT id, username, admin FROM users WHERE username = ${username} AND password = ${password}
    `;
    if (rows.length > 0) {
      return NextResponse.json(rows[0]);
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
