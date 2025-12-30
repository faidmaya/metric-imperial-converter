'use strict';

module.exports = function (app) {

  app.route('/api/convert')
    .get(function (req, res) {

      const input = req.query.input;

      // =====================
      // 1. Parse unit (CASE SENSITIVE)
      // =====================
      const unitMatch = input.match(/[a-zA-Z]+$/);
      const initUnit = unitMatch ? unitMatch[0] : null;

      const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const isValidUnit = validUnits.includes(initUnit);

      // =====================
      // 2. Parse number
      // =====================
      let initNum;
      const numMatch = input.match(/^[\d/.]+/);

      if (!numMatch) {
        initNum = 1;
      } else {
        const numStr = numMatch[0];

        if ((numStr.match(/\//g) || []).length > 1) {
          if (!isValidUnit) return res.send('invalid number and unit');
          return res.send('invalid number');
        }

        initNum = eval(numStr);
      }

      // =====================
      // 3. Invalid unit
      // =====================
      if (!isValidUnit) {
        return res.send('invalid unit');
      }

      // =====================
      // 4. Return unit
      // =====================
      let returnUnit;

      switch (initUnit) {
        case 'gal': returnUnit = 'L'; break;
        case 'L':   returnUnit = 'gal'; break;
        case 'mi':  returnUnit = 'km'; break;
        case 'km':  returnUnit = 'mi'; break;
        case 'lbs': returnUnit = 'kg'; break;
        case 'kg':  returnUnit = 'lbs'; break;
      }

      // =====================
      // 5. Convert
      // =====================
      let returnNum;

      switch (initUnit) {
        case 'gal': returnNum = initNum * 3.78541; break;
        case 'L':   returnNum = initNum / 3.78541; break;
        case 'mi':  returnNum = initNum * 1.60934; break;
        case 'km':  returnNum = initNum / 1.60934; break;
        case 'lbs': returnNum = initNum * 0.453592; break;
        case 'kg':  returnNum = initNum / 0.453592; break;
      }

      returnNum = Number(returnNum.toFixed(5));

      // =====================
      // 6. Spell out
      // =====================
      const spellOutUnit = (unit) => {
        switch (unit) {
          case 'gal': return 'gallons';
          case 'L':   return 'liters';
          case 'mi':  return 'miles';
          case 'km':  return 'kilometers';
          case 'lbs': return 'pounds';
          case 'kg':  return 'kilograms';
        }
      };

      // =====================
      // 7. Final response
      // =====================
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: `${initNum} ${spellOutUnit(initUnit)} converts to ${returnNum} ${spellOutUnit(returnUnit)}`
      });
    });
};
