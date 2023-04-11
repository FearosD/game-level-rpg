// Array.prototype.parse2D = function (columns) {
//   const rows = [];
//   for (let i = 0; i < this.length; i += columns) {
//     rows.push(this.slice(i, i + columns));
//   }
//   return rows;
// };

export default function parse2D(array, columns) {
  const rows = [];
  for (let i = 0; i < array.length; i += columns) {
    rows.push(array.slice(i, i + columns));
  }
  return rows;
}
