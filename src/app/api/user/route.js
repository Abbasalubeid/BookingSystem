import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";
import cookie from 'cookie';

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const username = url.searchParams.get('username');

        if (username) {
            // Fetch user ID by username
            const userQuery = await sql`SELECT * FROM users WHERE LOWER(username) = LOWER(${username});`
            const user = userQuery.rows[0];
            if (user) {
                return new Response(JSON.stringify({ id: user.id, username: user.username  }), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                return new Response(JSON.stringify({ error: 'User not found' }), {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        } else {
            // Handle user authentication using token
            const cookies = cookie.parse(request.headers.get('cookie') || '');
            const token = cookies.authToken;
            if (!token) {
                return new Response(JSON.stringify({ error: "No token provided" }), {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return new Response(JSON.stringify({ id: decoded.userId, username: decoded.username  }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        console.error('Error in /api/user:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
