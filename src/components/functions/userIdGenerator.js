import { resultFormat } from './resultFormat.jsx';

export async function userIdGenerator(usernames) {
  const corsProxy = 'https://corsproxy.io/?';

  const promises = usernames.map(async username => {
    try {
      const apiUrl = `https://twitvd.com/twuserid.php?username=${username}`;
      const proxiedUrl = corsProxy + encodeURIComponent(apiUrl);

      const response = await fetch(proxiedUrl);
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
