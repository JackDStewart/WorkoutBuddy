import React from 'react';
import Header from '@/components/Header';
import FriendCard from "@/components/FriendCard";

const Social = () => {
  const friends = ['Mateen', 'Jack', 'Noah', 'Owen']; 

  return (
    <div>
      <Header />

      <div className="relative bg-darkPurple top-10 rounded-lg p-6 ml-20 mr-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">My Friends</h2>
          <button className="bg-purple text-white py-2 px-4 rounded hover:bg-purple-600">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {friends.map((friend) => (
            <FriendCard key={friend} name={friend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Social;
