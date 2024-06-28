const apiEndpoint = 'https://x8ki-letl-twmt.n7.xano.io/api:SUDBYvZY';

const checkStatus = (result) => ({
    status: result && Array.isArray(result.timeline) && result.timeline.length > 0 ? 'success' : 'failure',
    message: result && Array.isArray(result.timeline) && result.timeline.length > 0 ? 'not' : '',
});

async function searchUserRepliesTop(username) {
    const response = await fetch(`${apiEndpoint}/searchUserRepliesTop?username=${username}`, {
        method: 'GET'
    });
    const data = await response.json();
    return { type: 'Ghostbanned', check: 'searchUserRepliesTop', ...checkStatus(data), username };
}

async function searchUserTop(username) {
    const response = await fetch(`${apiEndpoint}/searchUserTop?username=${username}`, {
        method: 'GET'
    });
    const data = await response.json();
    return { type: 'Searchbanned', check: 'searchUserTop', ...checkStatus(data), username };
}

async function searchUserRepliesLatest(username) {
    const response = await fetch(`${apiEndpoint}/searchUserRepliesLatest?username=${username}`, {
        method: 'GET'
    });
    const data = await response.json();
    return { type: 'Ghostbanned', check: 'searchUserRepliesLatest', ...checkStatus(data), username };
}

async function searchUserLatest(username) {
    const response = await fetch(`${apiEndpoint}/searchUserLatest?username=${username}`, {
        method: 'GET'
    });
    const data = await response.json();
    return { type: 'Searchbanned', check: 'searchUserLatest', ...checkStatus(data), username };
}

export async function shadowCheck(usernames) {
    const promises = usernames.map(async username => {
        try {
            const [repliesTopResult, topResult, repliesLatestResult, latestResult] = await Promise.all([
                searchUserRepliesTop(username),
                searchUserTop(username),
                searchUserRepliesLatest(username),
                searchUserLatest(username)
            ]);

            // Determine if searchbanned
            const isSearchbanned = topResult.status === 'failure' || latestResult.status === 'failure';
            // Determine if ghostbanned
            const isGhostbanned = repliesTopResult.status === 'failure' || repliesLatestResult.status === 'failure';

            return {
                username,
                searchbanned: isSearchbanned,
                ghostbanned: isGhostbanned
            };
        } catch (error) {
            return { username, status: 'failure', message: `An error occurred for ${username}: ${error.message}` };
        }
    });

    return Promise.all(promises);
}
