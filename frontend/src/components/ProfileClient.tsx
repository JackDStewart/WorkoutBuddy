'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function ProfileClient() {
  const { user, error, isLoading} = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log("user: ", user)
  const profileImage =  user?.picture || '/white_db2.png';  


  return (
    user && (
      <div className="absolute top-5 right-5 flex items-center space-x-2">
        {/* Display the user's profile image */}
       
          <img
            src={profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        {/* Display the user's name */}
        {user.name && <p className="text-white">{user.name}</p>}
      </div>
    )
  );
}