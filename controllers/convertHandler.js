function ConvertHandler() {

  // Parse the number from input
  this.getNum = function(input) {
    const numMatch = input.match(/^[\d/.]+/);
    if (!numMatch) return 1;

    const numStr = numMatch[0];
    const fractions = numStr.split('/');

    if (fractions.length > 2) return 'invalid number';

    let result;
    if (fractions.length === 2) {
      result = parseFloat(fractions[0]) / parseFloat(fractions[1]);
    } else {
      result = parseFloat(numStr);
    }

    if (isNaN(result)) return 'invalid number';
    return result;
  };

  // Parse the unit from input
  this.getUnit = function(input) {
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return 'invalid unit';

    const unit = unitMatch[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) return 'invalid unit';
    return unit === 'l' ? 'L' : unit;
  };

  // Get the corresponding return unit
  this.getReturnUnit = function(initUnit) {
    const lower = initUnit.toLowerCase();
    const map = {
      gal: 'L',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return map[lower];
  };

  // Spell out full unit names
  this.spellOutUnit = function(unit) {
    const lower = unit.toLowerCase();
    const map = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return map[lower];
  };

  // Perform the conversion
  this.convert = function(initNum, initUnit) {
    const rates = {
      gal: 3.78541,
      l: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592
    };

    const lowerUnit = initUnit.toLowerCase();
    const result = initNum * rates[lowerUnit];
    return Number(result.toFixed(5));
  };

}

module.exports = ConvertHandler;
