export const getTimeElapsedString = (createTime) => {
  const now = new Date().getTime();
  const elapsedTime = now - createTime.getTime();

  const seconds = Math.floor(elapsedTime / 1000) - 7 * 60 * 60;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day(s) ago`;
  } else if (hours > 0) {
    return `${hours} hour(s) ago`;
  } else if (minutes > 0) {
    return `${minutes} minute(s) ago`;
  } else {
    return `${seconds} second(s) ago`;
  }
};
