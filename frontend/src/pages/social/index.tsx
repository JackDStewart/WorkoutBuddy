import React, { useState, useEffect } from "react";
import FriendCard from "@/components/FriendCard";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import ProfileClient from "@/components/ProfileClient";
import { fetchUsers } from "@/api/userApi";
import {
  fetchUserFriends,
  fetchIncomingFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
} from "@/api/friendshipApi";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Friendship, User } from "@/types";
import ProgressPage from "../progress/progress";

const Social: React.FC = () => {
  const { user, isLoading } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"userDetails" | "friendRequests">(
    "userDetails"
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [pendingRequests, setPendingRequests] = useState<Friendship[]>([]);

  useEffect(() => {
    const getFriendsAndUsers = async () => {
      try {
        if (user?.sub) {
          const userId = user.sub.substring(14);
          const fetchedFriends = await fetchUserFriends(userId);
          const fetchedUsers = await fetchUsers();
          setFriends(fetchedFriends);
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching friends or users:", error);
        setFriends([]);
        setUsers([]);
      }
    };

    getFriendsAndUsers();
  }, [user]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    const getFriendRequests = async () => {
      try {
        if (user?.sub) {
          const requests = await fetchIncomingFriendRequests(
            user.sub.substring(14)
          );
          setPendingRequests(requests);
        }
      } catch (error) {
        console.error("Error fetching friend requests:", error);
        setPendingRequests([]);
      }
    };

    getUsers();
    getFriendRequests();
  }, [user]);

  const openUserDetailsModal = (user: User) => {
    setSelectedUser(user);
    setModalType("userDetails");
    setIsModalOpen(true);
  };

  const openFriendRequestsModal = () => {
    setModalType("friendRequests");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleAddFriend = async (friendUserId: string) => {
    if (!user || !user.sub) return;
    try {
      const responseMessage = await sendFriendRequest(
        user.sub.substring(14),
        friendUserId
      );
      alert(responseMessage);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleAccept = async (requestId: number) => {
    try {
      await acceptFriendRequest(requestId); // Your API call
      setPendingRequests((prev) => prev.filter((req) => req.id !== requestId));
      const updatedFriends = await fetchUserFriends(user!.sub!.substring(14));
      setFriends(updatedFriends);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDecline = async (requestId: number) => {
    try {
      await declineFriendRequest(requestId); // Your API call
      setPendingRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  const filteredUsers =
    searchQuery.trim() === ""
      ? []
      : users.filter((u: User) => {
          return (
            u.name.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
            u.id !== user?.sub?.substring(14) && // Exclude the current user
            !friends.some((friend) => friend.id === u.id)
          );
        });

  return (
    <div>
      <Header />
      <ProfileClient />
      <div className="relative bg-darkPurple top-5 rounded-lg p-6 ml-20 mr-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">My Friends</h2>
          <button
            onClick={openFriendRequestsModal}
            className="bg-purple text-white py-2 px-4 rounded hover:bg-purple"
          >
            Notifications
            {/* Display the red circle if there are pending friend requests */}
            {pendingRequests.length > 0 && (
              <span className="absolute top-4 right-4 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">
                {pendingRequests.length}
              </span>
            )}
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by username..."
          className="text-white bg-darkPurple p-2 border border-white rounded-lg hover:border-purple mb-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <br />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {filteredUsers.map((user) => (
            <FriendCard
              key={user.id}
              friend={user}
              onAddFriend={() => handleAddFriend(user.id)}
            />
          ))}
        </div>
        <br />
        <div className="grid grid-cols-3 gap-4">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onClick={() => openUserDetailsModal(friend)} // You can add modal opening logic here
              />
            ))
          ) : (
            <p className="text-white">You have no friends yet.</p>
          )}
        </div>
        <br />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        width={modalType === "userDetails" ? "w-[1200px]" : "w-[400px]"}
      >
        {modalType === "userDetails" && selectedUser && (
          <div>
            <h2 className="text-xl font-bold">{selectedUser.name}</h2>
            <ProgressPage user={selectedUser} compareUser={user} />
          </div>
        )}
        {modalType === "friendRequests" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Pending Friend Requests</h2>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between bg-darkPurple p-3 mb-4 rounded-lg border border-gray-600"
                >
                  <p className="text-white">{request.sender.name}</p>
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDecline(request.id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No pending requests.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Social;
