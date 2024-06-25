export async function ageFormat(username, userAge) {
  // Parse the date string into a Date object
  const dateObj = new Date(userAge);

  // Format the date according to the user's timezone
  const formattedDate = dateObj.toLocaleString(undefined, {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  // Get the current timezone abbreviation
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="text-center text-white">
      <span>@{username}</span>
      <br />
      <div className="badge badge-primary badge-outline">Account creation date</div>
      <br/>
      <span>{formattedDate}</span>
      <br />
      <div className="badge badge-primary badge-outline">Timezone</div>
      <br/>
      <span>{timezone}</span>
    </div>
  );
}
