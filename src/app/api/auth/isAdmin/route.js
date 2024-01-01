import { getDataFromToken } from '../authUtils'

export async function GET(request) {
  try {

    const {admin} = getDataFromToken(request);

    if (admin > 0) {
      return new Response(JSON.stringify({ isAdmin: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.error("Non-admin user trying to access admin page.");
      return new Response(JSON.stringify({ error: "Access Forbidden" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error in authentication:", error);
    return new Response(JSON.stringify({ error: "Not Authorized" }), {
      status: 401, // Unauthorized access
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}