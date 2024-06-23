import { resultFormat } from './resultFormat.jsx';

export async function userIdGenerator(usernames) {
  const fetchUserId = async (username) => {
    const url = `https://tweethunter.io/api/convert?inputString=${username}`;

    const headers = {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cookie": "_ga_F7Q3BYCL54=GS1.1.1711930018.1.0.1711930060.0.0.0; _ga=GA1.1.136415787.1711930018; __kla_id=eyJjaWQiOiJaakprTkRZeU9UUXRNelkzTkMwME56TmlMVGcxTVRVdFl6Z3pZalUxWlRJMllUWTMiLCIkcmVmZXJyZXIiOnsidHMiOjE3MTg4NDI5OTIsInZhbHVlIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8iLCJmaXJzdF9wYWdlIjoiaHR0cHM6Ly90d2VldGh1bnRlci5pby8ifSwiJGxhc3RfcmVmZXJyZXIiOnsidHMiOjE3MTg4NDI5OTIsInZhbHVlIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8iLCJmaXJzdF9wYWdlIjoiaHR0cHM6Ly90d2VldGh1bnRlci5pby8ifX0=; __Host-next-auth.csrf-token=08be6598d91e2201ac0c3c16bdd2fa5448b0981a6b82219cbd31c26ac0303466; __Secure-next-auth.callback-url=https://app.tweethunter.io; amp_724fdb=veUZTlCeXN8iRJUVMQHuf6...1i0pgsjhf.1i0pgsjhf.0.0.0; amp_724fdb_tweethunter.io=veUZTlCeXN8iRJUVMQHuf6...1i0pgsjhf.1i0pgsjuq.0.0.0; _ga_BH3EC90N3P=GS1.1.1719182372.4.0.1719182372.60.0.0",
      "priority": "u=1, i",
      "referer": "https://tweethunter.io/twitter-id-converter",
      "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    };

    try {
      const response = await fetch(url, { headers });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching user ID for ${username}:`, error);
      throw error;
    }
  };

  const promises = usernames.map(async (username) => {
    try {
      const data = await fetchUserId(username);

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
