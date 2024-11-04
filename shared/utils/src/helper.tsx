export function formatDate(dateString: Date): string {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    // throw new Error('Invalid date string provided');
  }

  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Today: show time
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else if (diffDays < 7) {
    // Within a week: show weekday name
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  } else {
    // Otherwise: show date in dd/mm/yyyy format
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
