import { sql } from "@vercel/postgres";
import { getDataFromToken } from "../../auth//authUtils";
const pusher = require("../../pusherConfig");

export async function GET(request) {
  try {
    const { admin } = getDataFromToken(request);

    if (admin > 0) {
      const reservationsQuery = await sql`
        SELECT r.*, l.description, l.start, l.interval, l.location, c.title as course_title,
        u.username as user_username, co.username as coop_username
        FROM reservations r
        JOIN lists l ON l.id = r.list_id
        JOIN courses c ON l.course_id = c.id
        LEFT JOIN users u ON r.user_id = u.id
        LEFT JOIN users co ON r.coop_id = co.id;`;

      return new Response(JSON.stringify(reservationsQuery.rows), {
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
    console.error("Error fetching reservations:", error);
    return new Response(JSON.stringify({ error: "Not Authorized" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const reservationId = url.searchParams.get("reservationId");

    const { admin } = getDataFromToken(request);

    if (admin > 0) {
      // Perform the deletion
      const deleteResult = await sql`
        DELETE FROM reservations WHERE id = ${reservationId};
    `;

      if (deleteResult.rowCount === 0) {
        throw new Error("Failed to delete reservation.");
      }

      // Trigger Pusher event after successful deletion
      pusher.trigger("reservation-channel", "reservation-deleted", {
        reservationId: reservationId,
      });

      return new Response(
        JSON.stringify({ message: "Reservation deleted successfully" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
        console.error("Not admin but trying to fetch from admin page!");
        return new Response(JSON.stringify({ error: "Not Authorized" }), {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        });
    }
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
