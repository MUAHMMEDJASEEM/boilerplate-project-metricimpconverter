function ConvertHandler() {
  
  this.getNum = function(input) {
    const englishAlphabet = /[a-zA-Z]/;
    const idx = input.split("").findIndex((char) => englishAlphabet.test(char));
    if (idx === 0) {
      return 1;
    }

    let quantityStr;
    if (idx < 0) {
      quantityStr = input.slice(0);
    } else {
      quantityStr = input.slice(0, idx);
    }

    const quantityArr = quantityStr.split("/");

    if (quantityArr.length === 1) {
      const quantity = quantityArr[0];
      if (quantity === "") return "invalid number";
      return isNaN(+quantity) ? "invalid number" : +quantity;
    }
    if (quantityArr.length === 2) {
      if (quantityArr.some((num) => num === "")) {
        return "invalid number";
      }
      const numerator = +quantityArr[0];
      const denominator = +quantityArr[1];
      return isNaN(numerator) || isNaN(denominator)
        ? "invalid number"
        : numerator / denominator;
    }

    return "invalid number";
  };
  
  this.getUnit = function(input) {
    const englishAlphabet = /[a-zA-Z]/;
    const idx = input.split("").findIndex((char) => englishAlphabet.test(char));
    if (idx < 0) {
      return "invalid unit";
    }
    const unit = input.slice(idx);
    return this.spellOutUnit1(unit);
  };
  
  this.getReturnUnit = function(initUnit) {
    const units = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    return units[initUnit] || "invalid unit";
  };

  this.spellOutUnit = function(unit) {
    const unitMapping = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    if (unit === "L" || unit === "l") return "L";
    return unitMapping[unit.toLowerCase()] || "invalid unit";
  };
  this.spellOutUnit1 = function(unit) {
    const unitMapping = {
      gal: "gal",
      L: "L",
      mi: "mi",
      km: "km",
      lbs:"lbs" ,
      kg: "kg",
    };
    if (unit === "L" || unit === "l") return "L";
    return unitMapping[unit.toLowerCase()] || "invalid unit";
  };
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    if (initNum === "invalid number" || initUnit === "invalid unit") {
      return "invalid number and unit";
    }
    
    if (initUnit === "gal") {
      return Math.round(initNum * galToL * 1e5) / 1e5;
    } else if (initUnit === "L") {
      return Math.round(initNum / galToL * 1e5) / 1e5;
    } else if (initUnit === "mi") {
      return Math.round(initNum * miToKm * 1e5) / 1e5;
    } else if (initUnit === "km") {
      return Math.round(initNum / miToKm * 1e5) / 1e5;
    } else if (initUnit === "lbs") {
      return Math.round(initNum * lbsToKg * 1e5) / 1e5;
    } else if (initUnit === "kg") {
      return Math.round(initNum / lbsToKg * 1e5) / 1e5;
    } else {
      return "invalid unit";
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return "invalid number and unit";
    } else if (initNum === "invalid number") {
      return "invalid number";
    } else if (initUnit === "invalid unit") {
      return "invalid unit";
    } else {
      return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    }
  };
}

module.exports = ConvertHandler;
