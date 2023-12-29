import jwt from "jsonwebtoken";
import cookie from 'cookie';

export function getDataFromToken(request) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.authToken;

  if (!token) {
    throw new Error("Session is no longer valid. Log in to continue.");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
}