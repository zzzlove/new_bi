function mergeStringListItem(list, item) {
  let listArray = JSON.parse(list);
  for (i of listArray) {
    if (i == item) {
      return list;
    }
  }
  return JSON.stringify([...listArray, item]);
}

function removeStringListItem(list, item) {
  let listArray = JSON.parse(list);
  let i = listArray.indexOf(item);
  if (i == -1) {
    return;
  }
  listArray.splice(i, 1);
  return JSON.stringify(listArray);
}

function hasStringListItem(list, item) {
  let listArray = JSON.parse(list);
  return listArray.indexOf(item) != -1;
}

export { mergeStringListItem, removeStringListItem, hasStringListItem };
