import { resultFormat } from './resultFormat.jsx';

export async function userIdGenerator(usernames) {
  const promises = usernames.map(async username => {
    try {
      const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:SUDBYvZY/user?username=${username}`);
      const data = await response.json();

      if (!data.user || data.user.length === 0) {
        return `Username ${username} not found.`;
      }

      const userId = data.user[0].id_str;
      return resultFormat(username, userId);
    } catch (error) {
      return `An error occurred for ${username}.`;
    }
  });

  return Promise.all(promises);
}
