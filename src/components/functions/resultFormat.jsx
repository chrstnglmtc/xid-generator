export async function resultFormat(username, userId) {
    return (
      <div className="text-left">
        {`@${username}`}
        <br />
        {`${userId}`}
        <br />
        {`https://twitter.com/intent/user?user_id=${userId}`}
      </div>
    );
  }
  