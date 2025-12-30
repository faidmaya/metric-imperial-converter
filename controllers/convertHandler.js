function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    const numMatch = input.match(/^[\d./]+/);

    if (!numMatch) return 1;

    const numStr = numMatch[0];
    const fractions = numStr.split('/');

    if (fractions.length > 2) return 'invalid number';

    if (fractions.length === 2) {
      result = parseFloat(fractions[0]) / parseFloat(fractions[1]);
    } else {
      result = parseFloat(numStr);
    }

    if (isNaN(result)) return 'invalid number';

    return result;
  };

  this.getUnit = function(input) {
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return 'invalid unit';

    const unit = unitMatch[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) return 'invalid unit';

    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function(initUnit) {
    const map = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return map[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const map = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return map[unit];
  };

  this.convert = function(initNum, initUnit) {
    const rates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592
    };

    let result = initNum * rates[initUnit];
    return Number(result.toFixed(5));
  };

}

module.exports = ConvertHandler;
