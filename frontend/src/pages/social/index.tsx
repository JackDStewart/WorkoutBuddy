import React, { useState, useEffect } from "react";
import FriendCard from "@/components/FriendCard";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import ProfileClient from "@/components/ProfileClient";
import { fetchUserNames } from "@/api/usersApi"; // Import the fetchUserNames function
import { useUser } from "@auth0/nextjs-auth0/client";

const Social: React.FC = () => {
  const { user, isLoading } = useUser();
  const [userNames, setUserNames] = useState<string[]>([]); // State to hold user names
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // Selected user

  useEffect(() => {
    // Fetch user names using the new API function
    const getUserNames = async () => {
      try {
        const fetchedUserNames = await fetchUserNames();
        setUserNames(fetchedUserNames); // Update the state with the fetched user names
      } catch (error) {
        console.error("Error fetching user names:", error);
        setUserNames([]); // Set to an empty array if there's an error
      }
    };
    getUserNames();
  }, []); // Run on component mount

  // Handle modal opening
  const openModal = (userName: string) => {
    setSelectedUser(userName);
    setIsModalOpen(true);
  };

  // Handle modal closing
  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const fetchUserIdByUserName = async (userName: string): Promise<string | null> => {
    try {
      const response = await fetch(
        `http://localhost:8080/friendship/userIdByUserName?userName=${userName}`
      );
  
      if (response.ok) {
        const userId = await response.json();
        return userId; // Return the userId
      } else {
        console.error("Error fetching userId");
        return null; // Return null if not found
      }
    } catch (error) {
      console.error("Error fetching userId:", error);
      return null; // Return null in case of error
    }
  };
  

  // Handle "Add Friend" button click
  const handleAddFriend = async (userName: string) => {
    try {
      const friendUserId = await fetchUserIdByUserName(userName);
  
      if (friendUserId && user) {
        const response = await fetch("http://localhost:8080/friendship/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.sub,  // Assuming `user?.sub` is your logged-in user's unique ID from Auth0
            friendId: friendUserId,
          }),
        });
  
        if (response.ok) {
          console.log(`Friend request sent to ${userName}`);
          alert(`Friend request sent to ${userName}`);
        } else {
          console.error("Failed to send friend request");
          alert("Failed to send friend request");
        }
      } else {
        console.error("User not found");
        alert("User not found");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };
  

  // Filter user names based on search query
  const filteredUserNames = userNames.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <ProfileClient />
      <div className="relative bg-darkPurple top-5 rounded-lg p-6 ml-20 mr-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">My Friends</h2>
          <button className="bg-purple text-white py-2 px-4 rounded hover:bg-purple">
            View All
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by username..."
          className="text-white bg-darkPurple p-2 border border-white rounded-lg hover:border-purple"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Display filtered user names */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {filteredUserNames.map((userName) => (
            <FriendCard
              key={userName}
              friend={{
                name: userName,
                active: false,
                lastLogged: 2,
                favExercise: { name: "Unknown", equipment: "k", muscleGroup: "l" },
              }}
              onClick={() => openModal(userName)}
              onAddFriend={() => handleAddFriend(userName)} // Pass the handler
            />
          ))}
        </div>
      </div>

      {/* Modal for User Details */}
      <Modal isOpen={isModalOpen} onClose={closeModal} width="w-[400px]">
        {selectedUser && (
          <div>
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p>Name: {selectedUser}</p>
            {/* Add additional details if available */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Social;
