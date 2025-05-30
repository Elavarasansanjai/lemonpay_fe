const MobileNumberRegex = (number) => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(number);
};
const userNameRegex = (name) => {
  const mobileRegex = /^[A-Za-z\s]{2,50}$/;
  return mobileRegex.test(name);
};

module.exports = {
  MobileNumberRegex,
  userNameRegex,
};
