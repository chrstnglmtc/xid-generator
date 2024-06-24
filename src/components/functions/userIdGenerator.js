import { resultFormat } from './resultFormat.jsx'; // Adjust the path as necessary
import { fetchUserData } from '../../../server.js';

export async function userIdGenerator(usernames) {
  const promises = usernames.map(async (username) => {
    try {
      const userData = await fetchUserData(username);

      if (!userData) {
        return `User ${username} not found.`;
      }

      const userId = userData.id_str; // Access id_str directly from userData
      return userId || `User ${username} has no ID.`; // Example fallback
    } catch (error) {
      console.error(`An error occurred for ${username}:`, error);
      return `An error occurred for ${username}: ${error.message}`;
    }
  });

  return Promise.all(promises);
}

