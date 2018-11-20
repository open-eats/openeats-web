import formatQuantity from '../../recipe/utilts/formatQuantity'
import { GCD } from '../../recipe/utilts/gcd'

// Given an array of text values,
// Convert them into a single Fraction
// Examples:
//   1 1/2 sugar -> 3/2
//   2 3 inch pieces ginger -> 6/1
//   1/2 3 inch pieces ginger -> 3/2
//   3 1/2 inch pieces ginger -> 7/2
//   1/2 1/2 inch pieces ginger -> 1/4
const buildFraction = (textArray) => {
  let { numerator, denominator } = textArray.reduce((fraction, text) => {
    const split = text.split('/');
    let n = parseFloat(split[0]);
    let d = split.length > 1 ? parseFloat(split[1]) : 1;

    // If this is the first run of the func
    // return the n/d,
    if (fraction.denominator === 0)
      return { numerator: n, denominator: d };

    // Multiple if the next number is an int
    if (split.length === 1) {
      n *= fraction.numerator;
      d *= fraction.denominator;
      const gcd = GCD(n, d);
      return { numerator: n / gcd, denominator: d / gcd };
    }

    // If given a fraction, add them.
    n = fraction.numerator * d + fraction.denominator * n;
    d = fraction.denominator * d;
    const gcd = GCD(n, d);
    return { numerator: n / gcd, denominator: d / gcd };
  }, { numerator: 0, denominator: 0 });

  return {
    numerator,
    denominator,
  };
};

const numberSplit = number => {
  let last = -1;
  let length = number.length;
  let numbers = ['1','2','3','4','5','6','7','8','9','0'];
  numbers.map(n => {
    if (number.lastIndexOf(n) > last) {
      last = number.lastIndexOf(n)
    }
  });
  if (length === (last + 1)) {
    return {amount: number, measurement: ''}
  }
  return {amount: number.substring(0, last+1), measurement: number.substring(last+1, length)}
};

// Given an Ingredient as text, parse it into an Ingredient object
export default (line) => {
  // Split the line by the space char
  let tags = line.split(' ');

  if (tags.length === 1) {
    // If there is only one tag then that is the title
    return { title: line };
  } else if (tags.length === 2) {
    // If there are two tags
    // then we either have a two word title
    // or a quantity and a title.
    // If the first word is not a number,
    // then the whole thing is the title.
    if (isNaN(parseFloat(tags[0][0]))) {
      return { title: line };
    } else {
      let { amount, measurement } = numberSplit(tags[0]);
      if (measurement) {
        return { ...buildFraction([amount]), ...{ measurement: measurement, title: tags[1] } }
      }
      return { ...buildFraction([tags[0]]), ...{ title: tags[1] } }
    }
  } else {
    // More than 3 tags is the most common and
    // most difficult case to handle.
    // There are many scenarios that can come up.
    // We try and handle them in the most reasonable way possible.
    // TODO: We should add a check here to try and guess if a value
    // should be a measurement or a part of a title.
    // IE: 1 cup orange juice -> measurement
    // IE: 1g salt -> measurement
    // IE: 2 chicken wings -> no measurement
    if (isNaN(parseFloat(tags[0][0]))) {
      // If the first char is not a number,
      // then the whole thing is the title.
      return { title: line };
    } else if (isNaN(parseFloat(tags[1]))) {
      // If the second word is not a number,
      // then the first word is the quantity,
      // the second word is the measurement,
      // the last word(s) are the title.
      let { amount, measurement } = numberSplit(tags.splice(0,1)[0]);
      if (!measurement) {
        measurement = tags.splice(0,1)[0];
      }
      return {
        ...{ measurement: measurement, title: tags.join(' ') },
        ...buildFraction([amount])
      };
    } else {
      // If the second word is a number,
      // then the first two words are the quantity,
      let quantity = tags.splice(0,2);

      // If there is only one word left.
      // Make that the title,
      // otherwise the measurement is the next word
      // and title is the last word(s)
      let measurement = '';
      if (tags.length !== 1) {
        measurement = tags.splice(0,1)[0];
      }
      return {
        ...{ measurement: measurement, title: tags.join(' ') },
        ...buildFraction(quantity)
      };
    }
  }
};
