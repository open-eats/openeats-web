
const ingRequired = val => {
  let tr = '';
  if (val) {
    val.map(ig => {
      if (ig.title) {
        tr += ig.title + ':\n';
      }
      ig.ingredients.map(i => {
        tr += i.quantity ? i.quantity + " " : '';
        tr += i.measurement ? i.measurement + " " : '';
        tr += i.title + '\n'
      });
      tr += '\n';
    });
  }

  return tr.trim() === '' ? 'This Field is Required.' : '';
};

const ratings = val => {
  val = parseInt(val);
  return val > 5 || val < 0 ? 'Please choose a number between 0-5.' : '';
};

const url = val => {
  const res = val.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return res || !val ? '' : 'Please enter a valid URL.';
};

const required = val => {
  return !val ? 'This Field is Required.' : '';
};

const double = val => {
  return isNaN(val) ? 'This Field must be a Number.' : '';
};

export default [
  { name: 'course', validators: [required, double] },
  { name: 'cuisine', validators: [required, double] },
  { name: 'tags', validators: [] },
  { name: 'prep_time', validators: [required, double] },
  { name: 'cook_time', validators: [required, double] },
  { name: 'servings', validators: [required, double] },
  { name: 'rating', validators: [ratings] },
  { name: 'source', validators: [url] },
  { name: 'title', validators: [required] },
  { name: 'info', validators: [] },
  { name: 'ingredient_groups', validators: [ingRequired] },
  { name: 'directions', validators: [required] },
  { name: 'subrecipes', validators: [] },
]
