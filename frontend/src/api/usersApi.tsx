export async function fetchUserNames() {
    try {
        const response = await fetch(`http://localhost:8080/user/all`);

        if (!response.ok) {
            throw new Error("Failed to fetch all names");
        }

        const users = await response.json();
        console.log("Fetched users:", users);

        // Extract only the 'name' field from each user object
        const names = users.map((user: { name: string }) => user.name);

        return names;
    } catch (error) {
        console.error("Error fetching all names:", error);
        return [];
    }
}
