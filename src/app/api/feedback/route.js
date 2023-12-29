import { sql } from '@vercel/postgres';
import jwt from "jsonwebtoken";
import cookie from 'cookie';

export async function POST(request) {
  try {
    const { comment, rating, courseId } = await request.json();
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.authToken;

    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Check if the List already exists
    const existingFeedback = await sql`
        SELECT 1 FROM feedback 
        WHERE user_id = ${userId}
        AND course_id = ${courseId}
        AND comment = ${comment}
        AND rating = ${rating};`;

    if (existingFeedback.rowCount > 0) {
        console.log("Feedback already provided");
      return new Response(JSON.stringify({ error: 'This exact feedback has already been provided for this course.' }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const { rows } = await sql`
    INSERT INTO feedback (user_id, course_id, comment, rating, time) VALUES 
    (${userId}, ${courseId}, ${comment}, ${rating}, NOW());`;


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
