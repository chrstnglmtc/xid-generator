import axios from 'axios';

export async function fetchUserData(username) {
  const url = `https://api.x.com/1.1/users/lookup.json?screen_name=${username}`;

  const headers = {
    // Your headers here
    "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
    "Cookie": "_ga=GA1.2.1987660856.1713947866; g_state={\"i_p\":1713955068859,\"i_l\":1}; kdt=jhW6dgFMBZmvnktbCmdkvYcpENmxXfejeXx6MPVY; dnt=1; auth_multi=\"966499939185442816:b7e67884e4dc8a7c80efd2b2d537ec0edfd19835\"; auth_token=a8f164b7dd6a24010a59fcfeabb0cc31416e908c; guest_id=v1%3A171809498809591119; twid=u%3D1481064308490780677; ct0=0e87ad0a51a55ef4cd75e7ce7f90fc48538f521ad894f92a0542544af1e528dd4bb73b8a38341d000e118fd33edf5ac09cc2d63ce0d1f4bab316de18c10ee08fdc122888b09e4de7cea62cdd806b5d0d; guest_id_ads=v1%3A171809498809591119; guest_id_marketing=v1%3A171809498809591119; lang=en; personalization_id=\"v1_KiBs8v6PpuvQcYRQm2OfkA==\"",
    "x-csrf-token": "0e87ad0a51a55ef4cd75e7ce7f90fc48538f521ad894f92a0542544af1e528dd4bb73b8a38341d000e118fd33edf5ac09cc2d63ce0d1f4bab316de18c10ee08fdc122888b09e4de7cea62cdd806b5d0d",
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data[0]; // Assuming response is an array and we want the first item
  } catch (error) {
    console.error(`Error fetching user data for ${username}:`, error);
    throw error;
  }
}
