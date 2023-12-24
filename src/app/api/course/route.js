import { sql } from "@vercel/postgres";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("id");

    // Fetch lists for the course
    const listsQuery = await sql`
      SELECT l.*, c.title AS course_title
      FROM lists l
      JOIN courses c ON l.course_id = c.id
      WHERE l.course_id = ${courseId};
    `;
    const lists = listsQuery.rows;

    // Fetch reservations for each list and append to the list data
    for (let list of lists) {
      const reservationsQuery = await sql`
        SELECT * FROM reservations WHERE list_id = ${list.id};
      `;
      list.reservations = reservationsQuery.rows;
    }

    return new Response(JSON.stringify(lists), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching course lists:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
