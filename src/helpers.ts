// Exclude duplicated itens of array
export function getUniqueArray(arr, comp) {
  const unique = arr.map(e => e[comp].toString())
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => arr[e]).map(e => arr[e]);
  return unique
}
