/**
 * Average Hash (aHash) + distância de Hamming.
 *
 * Recebe uma matriz de luminância 8x8 (0-255) já reduzida da imagem original
 * (redimensionamento e escala de cinza são feitos antes de chamar esta função —
 * no app real, por um módulo nativo que lê o arquivo via MediaStore/PhotoKit;
 * aqui a lógica de hashing e comparação já é 100% real e testável).
 */
export function averageHash(grayscale8x8: number[]): bigint {
  if (grayscale8x8.length !== 64) {
    throw new Error('averageHash espera exatamente 64 valores (grade 8x8).');
  }

  const avg = grayscale8x8.reduce((sum, v) => sum + v, 0) / 64;

  let hash = 0n;
  for (let i = 0; i < 64; i++) {
    hash <<= 1n;
    if (grayscale8x8[i] >= avg) {
      hash |= 1n;
    }
  }
  return hash;
}

export function hammingDistance(a: bigint, b: bigint): number {
  let diff = a ^ b;
  let distance = 0;
  while (diff > 0n) {
    distance += Number(diff & 1n);
    diff >>= 1n;
  }
  return distance;
}

/**
 * Duas imagens são consideradas duplicadas/semelhantes quando a distância de
 * Hamming entre seus hashes é baixa. 0 = idênticas; até ~10 = muito semelhantes
 * (bons valores de corte para fotos de 64 bits de hash).
 */
export function areSimilar(hashA: bigint, hashB: bigint, threshold = 10): boolean {
  return hammingDistance(hashA, hashB) <= threshold;
}

export interface HashedPhoto {
  id: string;
  hash: bigint;
}

/** Agrupa fotos por semelhança usando union-find sobre a distância de Hamming. */
export function groupSimilarPhotos(photos: HashedPhoto[], threshold = 10): string[][] {
  const parent = new Map<string, string>();
  const find = (id: string): string => {
    if (!parent.has(id)) parent.set(id, id);
    let root = id;
    while (parent.get(root) !== root) root = parent.get(root)!;
    parent.set(id, root);
    return root;
  };
  const union = (a: string, b: string) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parent.set(rootA, rootB);
  };

  for (const p of photos) find(p.id);

  for (let i = 0; i < photos.length; i++) {
    for (let j = i + 1; j < photos.length; j++) {
      if (areSimilar(photos[i].hash, photos[j].hash, threshold)) {
        union(photos[i].id, photos[j].id);
      }
    }
  }

  const groups = new Map<string, string[]>();
  for (const p of photos) {
    const root = find(p.id);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(p.id);
  }

  return Array.from(groups.values()).filter((g) => g.length > 1);
}
