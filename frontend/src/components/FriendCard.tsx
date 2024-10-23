import { getFriends } from "@/mockFriendRest";
import { getWorkouts } from "@/mockRest";
import { Friend } from "../types";
import React from "react";
import { FriendCardProps } from "../types";

const FriendCard: React.FC<FriendCardProps & { onClick?: () => void }> = ({ friend, onClick, className }) => {
  return (
    <div 
    className={`bg-black p-4 rounded-lg shadow-left-purple hover:ring-2 hover:ring-purple hover:cursor-pointer transition duration-300 ${className}`} 
    onClick = {onClick}
    >    
      <h3 className="text-lg font-semibold mb-2">{friend.name}</h3>
      <ul className="space-y-2 text-gray-600">
        <li>{friend.active ? "Active" : "Inactive"}</li>
        <li>Last logged: {friend.lastLogged} days ago</li>
        <li>Favorite Exercise: {friend.favExercise.name}</li>
      </ul>
    </div>
  );
};

export default FriendCard;
