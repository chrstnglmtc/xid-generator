export async function userIdGenerator(usernames) {
  const fetchTwitterUserId = async (username) => {
    const url = `http://localhost:3000/twitter/user-lookup?screen_name=${username}`; // Ensure the query parameter matches

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      
      // Assuming usernames are unique and you expect only one user per request
      if (Array.isArray(data) && data.length > 0) {
        const user = data[0];
        return user.id_str;
      } else {
        throw new Error(`Username ${username} not found.`);
      }
    } catch (error) {
      console.error(`Error fetching user ID for ${username}:`, error);
      throw error;
    }
  };

  const promises = usernames.map(async (username) => {
    try {
      const userId = await fetchTwitterUserId(username);
      return `${username}: ${userId}`;
    } catch (error) {
      return `An error occurred for ${username}.`;
    }
  });

  return Promise.all(promises);
}
