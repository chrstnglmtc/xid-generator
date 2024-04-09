export async function resultFormat(username, userId) {
    return (
      <div>
        {`@${username}`}
        <br />
        {`${userId}`}
        <br />
        {`https://twitter.com/intent/user?user_id=${userId}`}
      </div>
    );
  }
  