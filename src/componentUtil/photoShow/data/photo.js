import qs from 'qs';

let prefix = 'http://minimo.live/picture';

export const getPhoto = index => {
  let search = qs.parse(window.location.search, {
    ignoreQueryPrefix: true
  });
  let addon = search.addon ? '.' + search.addon : '';
  return `${prefix}/photo${index + 1}${addon}.jpg`;
};
