import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'

export const fetchRecipeList = (searchTerm) => {
  return request()
    .get(serverURLs.recipe + '?fields=id,title&limit=5&search=' + searchTerm)
    .then(res => {
      return res.body.results.filter(recipe => {
        return { name: recipe.title, char: recipe.title };
      });
    })
    .catch(err => [])
};
