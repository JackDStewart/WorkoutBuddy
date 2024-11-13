import Header from "@/components/Header";
import FriendCard from "@/components/FriendCard";
import React, { useState } from "react"; //  useState for modal state
import Modal from "@/components/Modal"; // need modal component for popup
import { FriendCardProps, Friend } from "@/types";
import { getFriends } from "@/mockFriendRest";
import ProfileClient from "@/components/ProfileClient";

const Social: React.FC<FriendCardProps> = () => {
  const friends = getFriends();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const openModal = (friend: Friend) => {
    setSelectedFriend(friend);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedFriend(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />
      <ProfileClient />
      <div className="relative bg-darkPurple top-5 rounded-lg p-6 ml-20 mr-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">My Friends</h2>
          <button className="bg-purple text-white py-2 px-4 rounded hover:bg-purple-600">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {friends?.map((friend) => (
            <FriendCard
              key={friend.name}
              friend={friend}
              onClick={() => openModal(friend)}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} width="w-[400px]">
        {selectedFriend && (
          <div>
            <h2 className="text-xl font-bold mb-4">Friend Details</h2>
            <p>Name: {selectedFriend.name}</p>
            <p>Last logged: {selectedFriend.lastLogged} days ago</p>
            <p>Favorite Exercise: {selectedFriend.favExercise.name} </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Social;
