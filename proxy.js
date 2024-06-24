import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import https from 'https';

const app = express();
const PORT = 3000;

// Enable CORS for all origins (adjust as needed for security)
app.use(cors());

// Custom HTTPS agent to disable SSL verification
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Proxy endpoint for fetching user data from Twitter
app.get('/twitter/user-lookup', async (req, res) => {
  const { screen_name } = req.query;
  const url = `https://api.twitter.com/1.1/users/lookup.json?screen_name=${screen_name}`;

  try {
    const response = await fetch(url, {
      headers: {
        "authority": "twitter.com",
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        "cookie": "_ga=GA1.2.1987660856.1713947866; g_state={\"i_p\":1713955068859,\"i_l\":1}; kdt=jhW6dgFMBZmvnktbCmdkvYcpENmxXfejeXx6MPVY; dnt=1; auth_multi=\"966499939185442816:b7e67884e4dc8a7c80efd2b2d537ec0edfd19835\"; auth_token=a8f164b7dd6a24010a59fcfeabb0cc31416e908c; guest_id=v1%3A171809498809591119; twid=u%3D1481064308490780677; ct0=0e87ad0a51a55ef4cd75e7ce7f90fc48538f521ad894f92a0542544af1e528dd4bb73b8a38341d000e118fd33edf5ac09cc2d63ce0d1f4bab316de18c10ee08fdc122888b09e4de7cea62cdd806b5d0d; guest_id_ads=v1%3A171809498809591119; guest_id_marketing=v1%3A171809498809591119; lang=en; personalization_id=\"v1_KiBs8v6PpuvQcYRQm2OfkA==\"; guest_id=v1%3A171918543300780887",
        "referer": "https://twitter.com/kirzstin",
        "sec-ch-ua": "\"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
        "x-client-transaction-id": "WYVFDTE+ikPn/0DwxZyPLS3GDlXJ3uQGip6lboZVyCWok+Cndz1TZDvXJNRVjR7Y/PUPcFvKqq95SGFhAGxEzXl99bW4Wg",
        "x-csrf-token": "0e87ad0a51a55ef4cd75e7ce7f90fc48538f521ad894f92a0542544af1e528dd4bb73b8a38341d000e118fd33edf5ac09cc2d63ce0d1f4bab316de18c10ee08fdc122888b09e4de7cea62cdd806b5d0d",
        "x-twitter-active-user": "yes",
        "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-client-language": "en"
      },
      agent: httpsAgent, // Use the custom agent here
    });

    if (!response.ok) {
      console.log(url);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(url);
    console.error('Error fetching user data from Twitter:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
