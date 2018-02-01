import { wildcardMatchStringArray } from './array';

function urlInList(url, list) {
  return wildcardMatchStringArray(list, url);
}

export { urlInList };
