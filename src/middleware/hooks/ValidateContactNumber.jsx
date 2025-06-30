const ValidateContactNumber = (data) => {
  let sample = true;

  if (data.length !== 11 || data.substring(0, 2) !== "09") {
    sample = false;
  }

  return sample;
};

export default ValidateContactNumber;
