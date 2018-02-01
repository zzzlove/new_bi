function isEmptyObject(o) {
  return !o || Object.getOwnPropertyNames(o).length == 0;
}

export { isEmptyObject };
