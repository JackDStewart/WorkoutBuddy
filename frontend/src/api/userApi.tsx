import { UserProfile } from '@auth0/nextjs-auth0/client';

export async function syncUser(user: UserProfile | undefined): Promise<void> {
  if (!user) return; // Exit if user is undefined


  // Ensure the user has an Auth0 ID before making the API request
  const id = user.sub;
  const email = user.email;
  const name = user.name;
  console.log("sending user:", user)

  if (id && email && name) {
    await fetch('http://localhost:8080/user/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        email,
        name,
      }),
    });
  }
}