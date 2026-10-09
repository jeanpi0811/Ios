import { averageHash, hammingDistance, areSimilar, groupSimilarPhotos } from '../utils/perceptualHash';

describe('perceptualHash', () => {
  it('gera o mesmo hash para grades idênticas', () => {
    const grid = new Array(64).fill(128);
    expect(averageHash(grid)).toBe(averageHash(grid));
  });

  it('distância de Hamming é 0 entre hashes iguais', () => {
    const grid = Array.from({ length: 64 }, (_, i) => (i * 4) % 255);
    const h = averageHash(grid);
    expect(hammingDistance(h, h)).toBe(0);
  });

  it('detecta padrões muito diferentes como não semelhantes', () => {
    const leftDark = Array.from({ length: 64 }, (_, i) => (i < 32 ? 10 : 20));
    const leftLight = Array.from({ length: 64 }, (_, i) => (i < 32 ? 245 : 235));
    expect(areSimilar(averageHash(leftDark), averageHash(leftLight))).toBe(false);
  });

  it('agrupa fotos semelhantes e ignora únicas', () => {
    const base = Array.from({ length: 64 }, (_, i) => (i * 3) % 255);
    const almostSame = [...base];
    almostSame[0] = almostSame[0] > 128 ? 0 : 255; // 1 bit de diferença

    const totallyDifferent = new Array(64).fill(0).map((_, i) => (i % 2 === 0 ? 0 : 255));

    const photos = [
      { id: 'a', hash: averageHash(base) },
      { id: 'b', hash: averageHash(almostSame) },
      { id: 'c', hash: averageHash(totallyDifferent) },
    ];

    const groups = groupSimilarPhotos(photos, 10);
    expect(groups).toEqual([['a', 'b']]);
  });
});
