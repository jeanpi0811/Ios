export type ScanCategory =
  | 'DUPLICATE_PHOTOS'
  | 'SIMILAR_PHOTOS'
  | 'LARGE_VIDEOS'
  | 'LARGE_FILES'
  | 'DUPLICATE_CONTACTS';

export interface ScanResultGroup {
  id: string;
  category: ScanCategory;
  label: string;
  itemCount: number;
  recoverableBytes: number;
}

export interface StorageBreakdownItem {
  label: string;
  bytes: number;
  color: string;
}
