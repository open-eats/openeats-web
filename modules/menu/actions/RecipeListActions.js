import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'

export const fetchRecipeList = (searchTerm) => {
  return request()
    .get(serverURLs.recipe + '?fields=id,title&limit=5&search=' + searchTerm)
    .then(res => {
      let titles = [];
      res.body.results.map(recipe => {
        titles.push({ value: parseInt(recipe.id, 10), label: recipe.title });
        return recipe;
      });
      return titles;
    })
    .catch(err => [])
};
