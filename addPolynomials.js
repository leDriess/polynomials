function addPolynomials(firstExpression, secondExpression) {
  function splitToExpArr(exp1, exp2) {
    // joining 2 strings depending what sign has first monomial of the second exp
    const expression = exp2[0] === "-" ? `${exp1}${exp2}` : `${exp1}+${exp2}`;

    // formatting and splitting string
    let arrayOfExp = expression
      .replace(/(?<=[^\^])-/g, "+-")
      .replace(/x(?![\^])/g, "x^1")
      .split("+");

    return arrayOfExp;
  }

  function mapExpArrayToObj(expArr) {
    let obj = {};

    expArr.map((item) => {
      // split single expression by its power, in case there's no exponent (just number) power is 0
      let [coef, pow = 0] = item.split("x^");
      // if there's x without number (ex. x^3 or -x^2) number '1' is added
      if (!coef || coef === "-") coef += "1";
      // saving coefficient value
      if (obj[`x^${pow}`]) {
        obj[`x^${pow}`] += Number(coef);
      } else obj[`x^${pow}`] = Number(coef);
    });

    return obj;
  }

  function convertObjToStringExp(obj) {
    // getting keys of the object sorted descending (ex. [x^5, x^3, x^2])
    const keys = Object.keys(obj).sort().reverse();

    let result = "";

    // getting values from the object
    keys.map((key) => {
      const sign = obj[key] > 0 ? "+" : "-";
      const coefficient = obj[key] === 1 ? "" : obj[key] < 0 ? obj[key] * -1 : obj[key];
      const exponent = key === "x^0" ? "" : key === "x^1" ? "x" : key;

      // nothing is added if coefficient equals 0
      if (coefficient !== 0) {
        // different strings added depending if result is empty
        if (result) {
          result += ` ${sign} ${coefficient}${exponent}`;
        } else {
          // no plus sign in the beggining of result string
          result = sign === "+" ? `${coefficient}${exponent}` : `${sign}${coefficient}${exponent}`;
        }
      }
    });

    return result;
  }

  // deleting spaces
  const exp1 = firstExpression.replace(/\s/g, "");
  const exp2 = secondExpression.replace(/\s/g, "");

  const arrayOfExp = splitToExpArr(exp1, exp2);
  const expObj = mapExpArrayToObj(arrayOfExp);
  const result = convertObjToStringExp(expObj);

  return result;
}

// example use of addPolynomials function
const exp1 = "2x^2 + 3";
const exp2 = "3x^3 + x^2";
const exp3 = addPolynomials(exp1, exp2);

console.log(exp3);
