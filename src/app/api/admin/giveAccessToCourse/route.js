import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// This API route handles the POST request to create a new user.
export async function POST(request) {
  try {
    const { user, course, role } = await request.json();

    // Check if the access already exists
    const existingUser = await sql`
        SELECT 1 FROM access 
        WHERE user_id = ${user}
        AND course_id = ${course}
        AND access_level = ${role}`;

    if (existingUser.rowCount > 0) {
        console.log("User has access");
      // User already has access to course
      return new Response(JSON.stringify({ error: 'User already has access to course' }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Insert new user into the database
    const { rows } = await sql`
        INSERT INTO access (user_id, course_id, access_level) VALUES (${user}, ${course}, ${role}) RETURNING user_id, course_id, access_level
    `;

    if (rows.length > 0) {
      return NextResponse.json(rows[0]);
    } else {
        console.log("Unable to give access in route, response bad");
      return new Response(JSON.stringify({ error: 'Unable to give access to user' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Access error: route', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
