import axios from "axios";
import cheerio from "cheerio";

export async function fetchTwitterProfile(username) {
  const url = `https://twitter.com/${username}`;
  
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const profileName = $('.ProfileHeaderCard-nameLink').text().trim();
    const profileHandle = $('.ProfileHeaderCard-screenname').text().trim();
    const profileBio = $('.ProfileHeaderCard-bio').text().trim();
    const profileLocation = $('.ProfileHeaderCard-locationText').text().trim();
    const profileWebsite = $('.ProfileHeaderCard-urlText').text().trim();
    const userId = $('div[data-testid="UserProfileHeader_Items"] > span').first().text().trim();

    return {
      success: true,
      data: {
        username: username,
        profileName: profileName,
        profileHandle: profileHandle,
        profileBio: profileBio,
        profileLocation: profileLocation,
        profileWebsite: profileWebsite,
        userId: userId
      }
    };
  } catch (error) {
    return {
      success: false,
      message: `An error occurred for ${username}. Error: ${error.message}`
    };
  }
}
