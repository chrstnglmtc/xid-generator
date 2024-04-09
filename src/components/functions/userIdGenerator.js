import { resultFormat } from './resultFormat.jsx';

export async function userIdGenerator(usernames) {
  const promises = usernames.map(async username => {
    try {
      const response = await fetch(`https://twitvd.com/twuserid.php?username=${username}`);
      const data = await response.json();

      if (!data.success) {
        return `Username ${username} not found.`;
      }

      const userId = data.data.user_id;
      return resultFormat(username, userId);
    } catch (error) {
      return `An error occurred for ${username}.`;
    }
  });

  return Promise.all(promises);
}
