export const updateFormFieldArray = (data, e) => {
  return {
    ...data,
    [e.target.name]: e.target.value,
  };
};

export const updateFormFieldSwitch = (data, e) => {
  return {
    ...data,
    [e.target.name]: e.target.checked,
  };
};

export const updateFormFieldArrayNumber = (data, e) => {
  return {
    ...data,
    [e.target.name]: handleNumber(e),
  };
};

export const updateFormFieldArrayNumberBlur = (data, e) => {
  return {
    ...data,
    [e.target.name]: handleBlur(e),
  };
};

// ------------------------------------------------------------------------------

export const formatNumber = (val) => {
  if (val === null || val === undefined || val === "") return val;

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
