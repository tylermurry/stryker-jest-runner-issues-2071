const { generatePerson } = require('./person-service');

describe('Person Service Tests', () => {

  it('should generate a normal person', () => {
    expect(generatePerson('John', 'Smith', 30)).toMatchSnapshot();
  });

  it('should generate a retired person', () => {
    expect(generatePerson('Jane', 'Smith', 75)).toMatchSnapshot();
  });

  it('should generate a minor', () => {
    expect(generatePerson('Joe', 'Smith', 16)).toMatchSnapshot();
  });

});
