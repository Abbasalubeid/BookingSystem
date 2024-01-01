import { sql } from '@vercel/postgres';

export async function POST(request) {
    try {
      const { courseId } = await request.json();
  
      const feedback = await sql`
          SELECT f.id AS feedback_id, u.username, f.comment, f.rating, f.time 
          FROM feedback f
          JOIN users u ON f.user_id = u.id
          WHERE f.course_id = ${courseId};
      `;
  
      // Assuming that 'feedback' contains the query results
      return new Response(JSON.stringify(feedback), {
          status: 200,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      console.error('Error fetching feedback: route ', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  
