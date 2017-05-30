function getDocUrl(filename) {
  return `docs/${filename}`;
}

// mapping from file path in source to generated page url
export const markdownFiles = {};

function generatePath(tree, parentPath = '') {
  if (Array.isArray(tree)) {
    tree.forEach(branch => generatePath(branch, parentPath));
  }
  if (tree.name) {
    tree.path = tree.name
      .match(/(GeoJson|3D|API|([A-Z]|^)[a-z'0-9]+|\d+)/g)
      .join('-')
      .toLowerCase()
      .replace(/[^\w-]/g, '');
  }
  if (tree.children) {
    generatePath(tree.children, `${parentPath}/${tree.path}`);
  }
  if (typeof tree.content === 'string') {
    markdownFiles[tree.content] = `${parentPath}/${tree.path}`;
  }

  return tree;
}

export const docPages = generatePath([
  {
    name: 'Introduction',
    content: getDocUrl('demos/introduction.md')
  },
  {
    name: 'A Mapping App',
    content: getDocUrl('demos/mapping-app.md')
  },
  {
    name: 'Adding charts',
    content: getDocUrl('demos/mapping-app-with-charts.md')
  },
  {
    name: 'Line charts',
    content: getDocUrl('demos/line-charts.md')
  },
  {
    name: 'Scatterplot',
    content: getDocUrl('demos/scatterplot.md')
  }
]);
