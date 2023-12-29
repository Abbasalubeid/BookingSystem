import jwt from "jsonwebtoken";
import cookie from 'cookie';

export function getDataFromToken(request) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.authToken;

  if (!token) {
    throw new Error("No token provided");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
}