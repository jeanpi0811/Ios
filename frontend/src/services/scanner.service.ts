import { ScanResultGroup } from '@/types';

/**
 * Ponto de integração com o scanner nativo.
 * Hoje devolve dados mockados para permitir desenvolvimento de UI;
 * a implementação real usa MediaStore (Android) e PhotoKit (iOS) via
 * um módulo nativo (ver docs/ARCHITECTURE.md, seção "Módulos nativos pendentes").
 */
export async function runDeviceScan(): Promise<ScanResultGroup[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, 1200));

  return [
    { id: '1', category: 'DUPLICATE_PHOTOS', label: 'Fotos duplicadas', itemCount: 128, recoverableBytes: 420 * 1024 * 1024 },
    { id: '2', category: 'SIMILAR_PHOTOS', label: 'Fotos semelhantes', itemCount: 84, recoverableBytes: 260 * 1024 * 1024 },
    { id: '3', category: 'LARGE_VIDEOS', label: 'Vídeos grandes', itemCount: 12, recoverableBytes: 1.8 * 1024 * 1024 * 1024 },
    { id: '4', category: 'LARGE_FILES', label: 'Arquivos grandes', itemCount: 31, recoverableBytes: 540 * 1024 * 1024 },
    { id: '5', category: 'DUPLICATE_CONTACTS', label: 'Contatos duplicados', itemCount: 19, recoverableBytes: 0 },
  ];
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 MB';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}
