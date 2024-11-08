export const reduceList = list => list.reduce((result, num) => num ? result.concat(num) : result, []);

export const combineList = combinator => list => {
  for(let i=1; i<list.length; i++) {
    if (list[i] && list[i-1] === list[i]) {
      list.splice(i-1, 2, combinator(list[i]));
    }
  }
  return list;
}

export const fetchValues = (grid, index, useColumn = false, reverse = false) => {
  const length = useColumn ? grid.length : grid[index].length;
  const result = [];
  for(let i=0; i<length; i++) {
    result.push(grid[useColumn ? i : index][useColumn ? index : i]);
  }
  return reverse ? result.reverse() : result;
}

export const replaceValues = (values, grid, index, useColumn = false, reverse = false) => {
  const length = useColumn ? grid.length : grid[index].length;
  const replacement = reverse ? values.reverse() : values;
  for(let i=0; i<length; i++) {
    grid[useColumn ? i : index][useColumn ? index : i] = replacement[i] || null;
  }
}

export const stretch = (list, length) => {
  while(list.length < length) {
    list.push(null);
  }
  return list;
}