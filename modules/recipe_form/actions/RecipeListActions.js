import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'

export const fetchRecipeList = (searchTerm) => {
  return request()
    .get(serverURLs.recipe + '?fields=id,title&limit=5&search=' + searchTerm)
    .then(res => {
      let titles = [];
      res.body.results.map(recipe => {
        titles.push({ name: recipe.title, char: recipe.title });
      });
      return titles;
    })
    .catch(err => [])
};
