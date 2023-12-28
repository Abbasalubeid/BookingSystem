import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";
import cookie from 'cookie';
const pusher = require('../pusherConfig');

export async function POST(request) {
    try {
        const cookies = cookie.parse(request.headers.get('cookie') || '');
        const token = cookies.authToken;

        if (!token) {
            throw new Error("No token provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const { listId, sequence, coopId } = await request.json();

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
