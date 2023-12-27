import { sql } from "@vercel/postgres";

export async function GET(request) {
  try {
    const coursesQuery = await sql`
    SELECT *
    FROM courses;`;
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
