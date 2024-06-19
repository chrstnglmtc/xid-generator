export async function resultFormat(username, userId) {
    return (
      <div className="text-left">
        {`@${username}`}
        <br />
        {`${userId}`}
        <br />
        {`https://x.com/intent/user?user_id=${userId}`}
      </div>
    );
  }
  