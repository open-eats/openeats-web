import moment from 'moment'

const isDate = val => {
  return moment(val).isValid() ? '' : 'Please entry a valid date.';
};

const double = val => {
  return !isNaN(val) ? '' : 'This field is required.';
};

const notNull = val => {
  return val ? '' : 'This field is required.';
};

export const menuItemValidation = [
  { name: 'menu', validators: [double] },
  { name: 'recipe', validators: [double] },
  { name: 'start_date', validators: [isDate] },
  { name: 'end_date', validators: [isDate] },
];

export const menuValidation = [
  { name: 'title', validators: [notNull] },
  { name: 'description', validators: [notNull] },
];

export const copyMenuValidation = [
  { name: 'title', validators: [notNull] },
  { name: 'description', validators: [notNull] },
  { name: 'start', validators: [isDate] },
];
