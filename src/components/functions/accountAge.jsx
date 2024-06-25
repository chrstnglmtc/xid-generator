import { ageFormat } from "./ageFormat";

export async function accountAge(usernames) {
  const promises = usernames.map(async username => {
    try {
      const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:SUDBYvZY/user?username=${username}`);
      const data = await response.json();

      if (!data.user || data.user.length === 0) {
        return `Username ${username} not found.`;
      }

      const userAge = data.user[0].created_at;
      return ageFormat(username, userAge);
    } catch (error) {
      return `An error occurred for ${username}.`;
    }
  });

  return Promise.all(promises);
}
