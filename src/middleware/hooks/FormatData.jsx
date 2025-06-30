export const formatNumber = (val) => {
  if (val === null || val === undefined || val === "") return val;

  // Remove commas
  const cleaned = String(val).replace(/,/g, "").trim();

  const number = parseFloat(cleaned);
  if (isNaN(number)) return "";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatNumberBack = (number) => {
  return parseFloat(String(number).replace(/,/g, ""));
};

export const handleNumber = (e) => {
  return e.target.value.replace(/[^0-9.,]/g, "");
};

export const handleBlur = (e) => {
  return formatNumber(e.target.value);
};

export const formatSelectData = (array) => {
  return array.map(({ id, name }) => ({
    id,
    text: name,
  }));
};

export const formatDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${month}-${day}-${year}`;
};
