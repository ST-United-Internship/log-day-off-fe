export const formatDate = (date) =>
  new Date(date).toISOString().slice(0, 10).split(":")[0];
