export async function fetchIncomingFriendRequests(userId: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/friendship/incoming/${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch friendships");
    }

    const data = await response.json();
    console.log("Fetched incoming requests:", data);

    return data;
  } catch (error) {
    console.error("Error fetching friendships:", error);
    return { friends: [], pendingRequests: [] };
  }
}

export const sendFriendRequest = async (
  userId: string,
  friendUserId: string
): Promise<string> => {
  try {
    if (!friendUserId) throw new Error("User not found");

    const response = await fetch(
      `http://localhost:8080/friendship/send?senderId=${userId}&receiverId=${friendUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to send friend request.");
    }

    const returnMessage = await response.text();
    
    return returnMessage;
  } catch (error: any) {
    console.error("Error sending friend request:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

export const acceptFriendRequest = async (requestId: number) => {
  try {
    const response = await fetch(
      `http://localhost:8080/friendship/${requestId}/accept`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to accept friend request");
    }
    return true;
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return false;
  }
};

export const declineFriendRequest = async (requestId: number) => {
  try {
    const response = await fetch(
      `http://localhost:8080/friendship/${requestId}/decline`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to decline friend request");
    }
    return true;
  } catch (error) {
    console.error("Error declining friend request:", error);
    return false;
  }
};

export const fetchUserFriends = async (userId: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/friendship/${userId}/friends`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch friends");
    }

    const data = await response.json();
    console.log("Fetched friends:", data);

    return data;
  } catch (error) {
    console.error("Error fetching friends:", error);
    return [];
  }
};
