import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// This API route handles the POST request to create a new user.
export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Check if the user already exists
    const existingUser = await sql`
      SELECT 1 FROM users WHERE username = ${username}
    `;

    if (existingUser.rowCount > 0) {
      // User already exists
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Insert new user into the database
    const { rows } = await sql`
      INSERT INTO users (username, password, admin) VALUES (${username}, ${password}, ${0}) RETURNING id, username, admin
    `;

    if (rows.length > 0) {
      return NextResponse.json(rows[0]);
    } else {
      return new Response(JSON.stringify({ error: 'Unable to create user' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
