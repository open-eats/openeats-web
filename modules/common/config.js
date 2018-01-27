var apiHost = '';
if (process.env.API_URL) {
  apiHost = process.env.API_URL;
}

var apiUrl = apiHost + '/api/v1';

export var serverURLs = {
  auth_token: apiUrl + '/accounts/obtain-auth-token/',
  browse: apiUrl + '/recipe/recipes/?fields=id,title,pub_date,rating,photo_thumbnail,info',
  mini_browse: apiUrl + '/recipe/mini-browse/',
  cuisine_count: apiUrl + '/recipe_groups/cuisine-count/',
  cuisine: apiUrl + '/recipe_groups/cuisine/',
  course_count: apiUrl + '/recipe_groups/course-count/',
  course: apiUrl + '/recipe_groups/course/',
  ratings: apiUrl + '/recipe/rating/',
  tag: apiUrl + '/recipe_groups/tag/',
  ingredient: apiUrl + '/ingredient/ingredient/',
  direction: apiUrl + '/recipe/direction/',
  news: apiUrl + '/news/entry/',
  recipe: apiUrl + '/recipe/recipes/',
  import_recipe: apiUrl + '/recipe/import-recipe/',
  list: apiUrl + '/list/lists/',
  list_item: apiUrl + '/list/items/',
  bulk_list_item: apiUrl + '/list/bulk_item/',
};

export var measurements = [
  'tablespoon',
  'teaspoon',
  'cup',
  'pint',
  'gallon',
  'gram',
  'kilogram',
];


// http://www.bbc.co.uk/food/ingredients/by/letter/b
export var ingredient = [
  '',
];
