export const hashTable = (cart) =>
  cart.reduce((a, c) => {
    if (a[c.id]) {
      a[c.id][0] += 1;
    } else {
      a[c.id] = [1, c, c.price];
    }
    return a;
  }, {});
