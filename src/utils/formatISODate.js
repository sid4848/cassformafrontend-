const formatISODate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString(undefined, options);
};

export default formatISODate;
