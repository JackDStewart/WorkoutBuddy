import React from "react";

interface FriendCardProps {
    name: string;
  }

  const FriendCard: React.FC<FriendCardProps> = ({ name }) => {
    return (
      <div className="bg-black p-4 rounded-lg shadow-md hover:ring-2 hover:ring-purple hover:cursor-pointer transition duration-300">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <ul className="space-y-2 text-gray-600">
                <li>Active</li>
                <li>Last logged: 2 days ago</li>
                <li>Favorite Workout: Legs</li>
            </ul>
      </div>
    );
  };

export default FriendCard;
