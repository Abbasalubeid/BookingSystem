import { sql } from '@vercel/postgres';
import jwt from "jsonwebtoken";
import cookie from 'cookie';

export async function POST(request) {
  try {
    const { newListData } = await request.json();
    console.log("YOOOOOOOOO");
    console.log(newListData);
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.authToken;

    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Check if the List already exists
    const existingList = await sql`
        SELECT 1 FROM lists 
        WHERE course_id = ${newListData.course_id}
        AND admin_id = ${userId}
        AND description = ${newListData.description}
        AND location = ${newListData.location}
        AND start = ${newListData.start}
        AND interval = ${newListData.interval}
        AND max_slots = ${newListData.max_slots};`;

    if (existingList.rowCount > 0) {
        console.log("List already exists");
      return new Response(JSON.stringify({ error: 'List already exists for this course' }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const { rows } = await sql`
    INSERT INTO lists (course_id, admin_id, description, location, start, interval, max_slots) VALUES 
    (${newListData.course_id}, ${userId}, ${newListData.description}, ${newListData.location},${newListData.start}, ${newListData.interval}, ${newListData.max_slots});`;


    return new Response(JSON.stringify({ message: 'List added' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
  } catch (error) {
    console.error('Error adding list: route ', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
