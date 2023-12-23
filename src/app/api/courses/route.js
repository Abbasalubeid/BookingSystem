import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";
import cookie from 'cookie';

export async function GET(request) {
  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.authToken; // The name of the cookie where the JWT is stored

    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; 
    console.log("userId: " + userId);

    // Fetch courses for the user
    const coursesQuery = await sql`
    SELECT *
    FROM courses c
    JOIN access a ON c.id = a.course_id
    WHERE a.user_id = ${userId};
    `;
    const courses = coursesQuery.rows;

    //console.log(courses);

    return new Response(JSON.stringify(courses), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
