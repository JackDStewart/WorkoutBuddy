export async function fetchFriendships(userId: string) {
    try {
        const response = await fetch(`http://localhost:8080/friendship/all`);

        if (!response.ok) {
            throw new Error("Failed to fetch friendships");
        }

        const data = await response.json();
        console.log("Fetched friendships:", data);

        // Destructure the data based on the new response format
        const { friends, pendingRequests } = data;

        return { friends, pendingRequests };
    } catch (error) {
        console.error("Error fetching friendships:", error);
        return { friends: [], pendingRequests: [] };
    }
}
