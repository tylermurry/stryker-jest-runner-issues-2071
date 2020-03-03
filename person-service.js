const generatePerson = (firstName, lastName, age) => {
  const fullName = `${firstName} ${lastName}`;
  const retired = age > 65;
  const minor = age < 18;

  return { firstName, lastName, fullName, retired, minor };
};

module.exports = { generatePerson };
