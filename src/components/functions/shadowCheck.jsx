const apiEndpoint = 'https://x8ki-letl-twmt.n7.xano.io/api:SUDBYvZY';

const checkStatus = (result) => {
    const isSuccess = result && Array.isArray(result.timeline) && result.timeline.length > 0;
    return {
        status: isSuccess ? 'success' : 'failure',
        message: isSuccess ? '' : 'No timeline found',
    };
};

async function fetchData(endpoint, username) {
    const response = await fetch(`${apiEndpoint}/${endpoint}?username=${username}`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
}

async function searchUserRepliesTop(username) {
    return fetchData('searchUserRepliesTop', username);
}

async function searchUserTop(username) {
    return fetchData('searchUserTop', username);
}

async function searchUserRepliesLatest(username) {
    return fetchData('searchUserRepliesLatest', username);
}

async function searchUserLatest(username) {
    return fetchData('searchUserLatest', username);
}

async function checkSearchban(username) {
    const [topResult, latestResult] = await Promise.all([
        searchUserTop(username),
        searchUserLatest(username),
    ]);

    const topStatus = checkStatus(topResult).status;
    const latestStatus = checkStatus(latestResult).status;

    const searchbanned = topStatus === 'failure' && latestStatus === 'failure';
    return { searchbanned };
}

async function checkGhostban(username) {
    const [repliesTopResult, repliesLatestResult] = await Promise.all([
        searchUserRepliesTop(username),
        searchUserRepliesLatest(username),
    ]);

    const repliesTopStatus = checkStatus(repliesTopResult).status;
    const repliesLatestStatus = checkStatus(repliesLatestResult).status;

    const ghostbanned = repliesTopStatus === 'failure' && repliesLatestStatus === 'failure';
    return { ghostbanned };
}

export async function shadowCheck(usernames) {
    const promises = usernames.map(async (username) => {
        try {
            const [searchbanResult, ghostbanResult] = await Promise.all([
                checkSearchban(username),
                checkGhostban(username),
            ]);

            return {
                username,
                ...searchbanResult,
                ...ghostbanResult,
            };
        } catch (error) {
            console.error(`An error occurred for ${username}:`, error);
            return {
                username,
                status: 'failure',
                message: `An error occurred: ${error.message}`,
            };
        }
    });

    return Promise.all(promises);
}
