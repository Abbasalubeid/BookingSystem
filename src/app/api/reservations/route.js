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
        console.log(coopId);
        await sql`
            INSERT INTO reservations (list_id, user_id, coop_id, sequence) VALUES (${listId}, ${userId}, ${coopId}, ${sequence});
        `;
        pusher.trigger('booking-channel', 'booking-event', {
            message: `user ${userId} made a booking on ${listId}`
          });

        return new Response(JSON.stringify({ message: 'Booking successful' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error booking slot:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
