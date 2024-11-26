import React from "react";
import { User } from "../types";

interface FriendCardProps {
  friend: User;
  onClick?: () => void;
  onAddFriend?: () => void;
}

const FriendCard: React.FC<FriendCardProps> = ({
  friend,
  onClick,
  onAddFriend,
}) => {
  return (
    <div
      className={`bg-black p-4 rounded-lg shadow-left-purple hover:ring-2 hover:ring-purple hover:cursor-pointer transition duration-300`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{friend.name}</h3>
      <ul className="space-y-2 text-gray-600"></ul>
      {/* Add Friend Button */}
      {onAddFriend && (
        <button
          className="bg-purple text-white py-1 px-4 mt-2 rounded hover:bg-darkpurple"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the onClick for the card
            onAddFriend();
          }}
        >
          Add Friend
        </button>
      )}
    </div>
  );
};

export default FriendCard;
