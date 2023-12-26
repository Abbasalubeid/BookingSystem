import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";
import cookie from 'cookie';

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

        await sql`
            INSERT INTO reservations (list_id, user_id, coop_id, sequence) VALUES (${listId}, ${userId}, ${coopId}, ${sequence});
        `;

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
