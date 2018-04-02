import formatQuantity from '../../recipe/utilts/formatQuantity'

// Given an array of text values,
// Convert them into a single Fraction
const buildFraction = (textArray) => {
  let { numerator, denominator } = textArray.reduce((fraction, text) => {
    const split = text.split('/');
    let n=1, d=1;
    n = parseFloat(split[0]);
    d = split.length > 1 ? parseFloat(split[1]) : 1;
    return {
      numerator: fraction.numerator * n,
      denominator: fraction.denominator * d > 0 ? parseFloat(d) : 1
    };
  }, { numerator: 1, denominator: 1 });

  return {
    numerator,
    denominator,
    quantity: formatQuantity(1,1,numerator,denominator)
  };
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
    if (isNaN(parseFloat(tags[0]))) {
      return { title: line };
    } else {
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
    // IE: 2 chicken wings -> no measurement

    if (isNaN(parseFloat(tags[0]))) {
      // If the first word is not a number,
      // then the whole thing is the title.
      return { title: line };
    } else if (isNaN(parseFloat(tags[1]))) {
      // If the second word is not a number,
      // then the first word is the quantity,
      // the second word is the measurement,
      // the last word(s) are the title.
      let quantity = tags.splice(0,1);
      let measurement = tags.splice(0,1)[0];
      return {
        ...{ measurement: measurement, title: tags.join(' ') },
        ...buildFraction(quantity)
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
