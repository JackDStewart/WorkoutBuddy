// app/api/auth/[auth0]/route.js
import { handleAuth } from '@auth0/nextjs-auth0';

/*export const GET = async (req, res) => {
  try {
    await handleAuth()(req, res);
  } catch (error) {
    console.error("Error in Auth0 handleAuth:", error);
  }
};*/

export const GET = handleAuth();

