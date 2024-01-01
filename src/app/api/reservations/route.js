import { sql } from "@vercel/postgres";
import { getDataFromToken } from "../auth//authUtils";
const pusher = require('../pusherConfig');

export async function POST(request) {
    try {
        const { userId, listId, sequence, coopId } = await request.json();

        // Begin transaction
        await sql`BEGIN`;

        // Check if the slot is already booked
        const existingBooking = await sql`
            SELECT * FROM reservations 
            WHERE list_id = ${listId} AND sequence = ${sequence};
        `;

        if (existingBooking.count > 0) {
            // Slot is already booked, rollback and return error
            await sql`ROLLBACK`;
            throw new Error("Slot already booked");
        }

        // Insert the booking
        await sql`
            INSERT INTO reservations (list_id, user_id, coop_id, sequence) 
            VALUES (${listId}, ${userId}, ${coopId}, ${sequence});
        `;

        // Commit transaction
        await sql`COMMIT`;

        pusher.trigger('booking-channel', 'booking-event', {
            message: `userid ${userId} made a booking on list ${listId} with coopId ${coopId}`
        });

        return new Response(JSON.stringify({ message: 'Booking successful' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error booking slot:', error);

        // Make sure to rollback in case of any error
        await sql`ROLLBACK`;

        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function GET(request) {
  try {

    const { userId } = getDataFromToken(request);

    const reservationsQuery = await sql`
    SELECT r.*, l.description, l.start, l.interval, l.location, c.title as course_title,
    u.username as user_username, co.username as coop_username
    FROM reservations r
    JOIN lists l ON l.id = r.list_id
    JOIN courses c ON l.course_id = c.id
    LEFT JOIN users u ON r.user_id = u.id
    LEFT JOIN users co ON r.coop_id = co.id
    WHERE r.user_id = ${userId} OR r.coop_id = ${userId};
    `;

    return new Response(JSON.stringify(reservationsQuery.rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
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

        const {userId} = getDataFromToken(request);
        
        // Check if the user is the booker of the reservation
        const reservationQuery = await sql`
            SELECT user_id FROM reservations WHERE id = ${reservationId};
        `;

        if (reservationQuery.rows.length === 0) {
            throw new Error("Reservation not found.");
        }

        if (reservationQuery.rows[0].user_id !== userId) {
            throw new Error("Cannot delete reservation: You are not the booker of this reservation.");
        }

        // Perform the deletion
        const deleteResult = await sql`
            DELETE FROM reservations WHERE id = ${reservationId};
        `;

        if (deleteResult.rowCount === 0) {
            throw new Error("Failed to delete reservation.");
        }

        // Trigger Pusher event after successful deletion
        pusher.trigger('reservation-channel', 'reservation-deleted', {
            reservationId: reservationId
        });

        return new Response(JSON.stringify({ message: "Reservation deleted successfully" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}


