export const formatDate = (
  date,
  locale = "zh-TW",
  options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
) => new Date(date).toLocaleDateString(locale, options).replaceAll("/", "-");
