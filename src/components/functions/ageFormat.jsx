export async function ageFormat(username, userAge) {
  // Parse the date string into a Date object
  const dateObj = new Date(userAge);

  // Calculate the difference between the current date and the account creation date
  const now = new Date();
  const ageInMilliseconds = now - dateObj;

  // Convert the age from milliseconds to a more readable format
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
  const ageInYears = Math.floor(ageInDays / 365);
  const ageInMonths = Math.floor((ageInDays % 365) / 30);

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
      <div className="badge badge-primary">Account creation date</div>
      <br/>
      <span>{formattedDate}</span>
      <br />
      <div className="badge badge-primary">Timezone</div>
      <br/>
      <span>{timezone}</span>
      <br />
      <div className="badge badge-primary">Account Age</div>
      <br/>
      <span>{ageInYears} years, {ageInMonths} months</span>
    </div>
  );
}
