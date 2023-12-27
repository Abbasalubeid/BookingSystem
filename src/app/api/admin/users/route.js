import { sql } from "@vercel/postgres";

export async function GET() {
    try {
        const usersQuery = await sql`SELECT * FROM users;`
        const users = usersQuery.rows;

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in /api/users:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}