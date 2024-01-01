import { sql } from "@vercel/postgres";
import { getDataFromToken } from "../../auth//authUtils";
const pusher = require("../../pusherConfig");

export async function GET(request) {
  try {
    const { admin } = getDataFromToken(request);

    if (admin > 0) {
        const listsQuery = await sql`
        SELECT l.*, c.title AS course_title
        FROM lists l
        JOIN courses c ON l.course_id = c.id;
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
    } else {
        console.error("Not admin but trying to fetch from admin page!");
        return new Response(JSON.stringify({ error: "Internal server error" }), {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        });
    }
  } catch (error) {
    console.error("Error fetching all lists:", error);
    return new Response(JSON.stringify({ error: "Not Authorized" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
