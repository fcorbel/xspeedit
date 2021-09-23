// Articles      : 163841689525773
// Robot actuel  : 163/8/41/6/8/9/52/5/7/73 => 10 cartons utilisés
// Robot optimisé: 163/82/46/19/8/55/73/7   => 8  cartons utilisés

// Potentiel d'optimisation
export function getAvailableArticleIndex(
  maxSize: number,
  sortedArticles: number[]
): number | undefined {
  if (maxSize === 0) {
    return;
  }

  const availableArticleIndex = sortedArticles.indexOf(maxSize);

  if (availableArticleIndex !== -1) {
    return availableArticleIndex;
  } else {
    return getAvailableArticleIndex(maxSize - 1, sortedArticles);
  }
}

export function packArticles(
  sortedArticles: number[],
  packSize: number
): number[][] {
  if (sortedArticles.length === 0) {
    return [];
  }

  if (sortedArticles[0] > packSize) {
    throw new Error("Pack size too small");
  }

  const optimizedArticles = [];
  let currentPack = [];
  let currentPackLeftSize = packSize;

  while (sortedArticles.length !== 0 || currentPack.length) {
    const nextArticleIndex = getAvailableArticleIndex(
      currentPackLeftSize,
      sortedArticles
    );

    if (nextArticleIndex !== undefined) {
      currentPack.push(sortedArticles[nextArticleIndex]);
      currentPackLeftSize =
        currentPackLeftSize - sortedArticles[nextArticleIndex];
      sortedArticles.splice(nextArticleIndex, 1);
    } else {
      // On ne peut plus rien mettre dans ce pack, on en prend un nouveau
      optimizedArticles.push(currentPack);
      currentPack = [];
      currentPackLeftSize = packSize;
    }
  }

  return optimizedArticles;
}

const articles = "163841689525773";
const sortedArticles = articles
  .split("")
  .map((v) => +v)
  .sort((a, b) => b - a);

console.log(
  `${articles} ==> ${packArticles(sortedArticles, 10)
    .map((pack) => pack.join(""))
    .join("/")}`
);
