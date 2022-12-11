import url from 'url';
import fs from 'fs';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname('../', __filename);

const locales =
  fs.readdirSync(path.resolve(__dirname, 'i18n'))
  .filter((file) => fs.statSync(path.resolve(__dirname, 'i18n', file)).isDirectory());

const missing = {};
const known = {};

function deepInspect({ obj, parent, store }) {
  for (const [key, value] of Object.entries(obj)) {
    const name = parent ? `${parent}.${key}` : key;
    if (typeof value === 'object') {
      deepInspect({
        obj: value,
        parent: name,
        store,
      });
    } else {
      if (!store[name]) {
        store[name] = true;
      }
    }
  }
}

for (const locale of locales) {
  const files =
    fs.readdirSync(path.resolve(__dirname, 'i18n', locale))
    .filter((file) => file.endsWith('.json'));

  for (const file of files) {
    const name = file.replace('.json', '');
    const json = fs.readFileSync(`./i18n/${locale}/${file}`);
    const namespace = JSON.parse(json);
    known[name] = {};
    deepInspect({
      obj: namespace,
      store: known[name],
    });
  }

  for (const file of files) {
    const name = file.replace('.json', '');
    const json = fs.readFileSync(`./i18n/${locale}/${file}`);
    const namespace = JSON.parse(json);
    const translations = {};
    deepInspect({
      obj: namespace,
      store: translations,
    });

    for (const key of Object.keys(known[name])) {
      if (!translations[key]) {
        if (!missing[name]) {
          missing[name] = [];
        }
        missing[name].push(key);
      }
    }
  }
}

console.log(missing);