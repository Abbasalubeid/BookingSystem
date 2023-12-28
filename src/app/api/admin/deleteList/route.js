import { sql } from '@vercel/postgres';

export async function POST(request) {
  try {
    const { listId } = await request.json();
    await sql`DELETE FROM lists WHERE id = ${listId};`;

    return new Response(JSON.stringify({ message: 'List deleted' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    } catch (error) {
        console.error('Error deleting list:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
