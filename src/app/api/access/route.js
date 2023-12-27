import { sql } from "@vercel/postgres";

export async function GET(request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const courseId = url.searchParams.get('courseId');
  
    // Check if the user is registered in the course
    const accessQuery = await sql`
      SELECT COUNT(*) FROM access WHERE user_id = ${userId} AND course_id = ${courseId};
    `;
    const isRegistered = accessQuery.rows[0].count > 0;
  
    console.log(isRegistered);
    return new Response(JSON.stringify({ isRegistered }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  