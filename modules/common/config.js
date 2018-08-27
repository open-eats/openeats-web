let apiHost = window.location.origin;
if (process.env.NODE_API_URL) {
  apiHost = process.env.NODE_API_URL;
}

const apiUrl = apiHost + '/api/v1';

export const serverURLs = {
  refresh_token: apiUrl + '/accounts/refresh-auth-token/',
  auth_token: apiUrl + '/accounts/obtain-auth-token/',
  browse: apiUrl + '/recipe/recipes/?fields=id,slug,title,pub_date,rating,photo_thumbnail,info',
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
  menu: apiUrl + '/menu/menu/',
  menuCopy: apiUrl + '/menu/menu-copy/',
  menu_item: apiUrl + '/menu/menu-item/',
  menu_recipe: apiUrl + '/menu/menu-recipes/',
};
