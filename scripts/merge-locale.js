import * as fs from 'fs';
import {sync as globSync} from 'glob';
import {sync as mkdirpSync} from 'mkdirp';

/**
 * Pulls new `defineMessage` definitions and adds them to the locale JSON files for translating
 *
 * Script based on:
 *   https://github.com/yahoo/react-intl/blob/master/examples/translations/scripts/translate.js
 */

const MESSAGES_PATTERN = './build/messages/**/*.json';
const LOCALE_DIR       = './locale/';

let defaultMessages = globSync(MESSAGES_PATTERN)
  .map((filename) => fs.readFileSync(filename, 'utf8'))
  .map((file) => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({id, defaultMessage}) => {
      if (collection.hasOwnProperty(id)) {
        throw new Error('Duplicate message id: '+id);
      }

      collection[id] = defaultMessage;
    });

    return collection;
  }, {});

mkdirpSync(LOCALE_DIR);
let locales = ['en', 'es', 'de']
  .forEach((locale, i) => {
    let messages = JSON.parse(fs.readFileSync(LOCALE_DIR + locale + '.json', 'utf8'));

    fs.writeFileSync(
      LOCALE_DIR + locale + '.json',
      JSON.stringify(
        Object.keys(defaultMessages)
          .map((id) => [id, defaultMessages[id]])
          .reduce((collection, [id, defaultMessage]) => {
            collection[id] = messages[id] ? messages[id] : defaultMessage;
            return collection;
          },
          {}
        ),
        null,
        2)
    );
  });