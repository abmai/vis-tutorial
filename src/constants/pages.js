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
    name: 'Starting With a Map',
    content: getDocUrl('demos/starting-with-map.md')
  },
  {
    name: 'Scatterplot Overlay',
    content: getDocUrl('demos/scatterplot-overlay.md')
  },
  {
    name: 'Add Charts',
    content: getDocUrl('demos/add-charts.md')
  },
  {
    name: 'Line Charts',
    content: getDocUrl('demos/line-charts.md')
  },
  {
    name: 'Scatterplot Charts',
    content: getDocUrl('demos/scatterplot-charts.md')
  }
]);
