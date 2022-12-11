import url from 'url';
import fs from 'fs';
import path from 'path';
import langList from 'language-list';

const languages = langList();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname('../', __filename);

const locales =
  fs.readdirSync(path.resolve(__dirname, 'i18n'))
  .filter((file) => fs.statSync(path.resolve(__dirname, 'i18n', file)).isDirectory());

function deepInspect({ obj, parent = undefined, store }) {
  for (const [key, value] of Object.entries(obj)) {
    const name = parent ? `${parent}.${key}` : key;
    if (typeof value === 'object') {
      deepInspect({
        obj: value,
        parent: name,
        store,
      });
    } else {
      store[name] = true;
    }
  }
}

const missingKeys = {};
const knownKeys = {};
const translations = {};

for (const locale of locales) {
  translations[locale] = {};

  const files =
    fs.readdirSync(path.resolve(__dirname, 'i18n', locale))
    .filter((file) => file.endsWith('.json'));

  for (const file of files) {
    const name = file.replace('.json', '');
    const json = fs.readFileSync(`./i18n/${locale}/${file}`);
    const namespace = JSON.parse(json);
    if (!knownKeys[name]) {
      knownKeys[name] = [];
    }
    deepInspect({
      obj: namespace,
      store: knownKeys[name],
    });
    translations[locale][name] = {};
    deepInspect({
      obj: namespace,
      store: translations[locale][name],
    });
  }
}

for (const [locale, localeTranslations] of Object.entries(translations)) {
  for (const [namespace, namespaceTranslations] of Object.entries(localeTranslations)) {
    const known = knownKeys[namespace];
    for (const key of Object.keys(known)) {
      if (!namespaceTranslations[key]) {
        if (!missingKeys[locale]) {
          missingKeys[locale] = [];
        }
        missingKeys[locale].push(`${namespace}.${key}`);
      }
    }
  }
}

let result = '# Missing translations\n\n';

for (const [locale, keys] of Object.entries(missingKeys)) {
  const langName = languages.getLanguageName(locale);
  if (langName) {
    result += `## ${langName} (${locale})\n\n`;
  } else {
    result += `## ${locale}\n\n`;
  }

  for (const key of keys) {
    result += `- [ ] ${key}\n`;
  }

  result += '\n';
}

fs.writeFileSync('./missing-translations.md', result);

console.log('Missing translations written to file missing-translations.md');