import { create } from 'zustand';
import { ScanResultGroup } from '@/types';

interface AppState {
  isScanning: boolean;
  scanResults: ScanResultGroup[];
  totalRecoverableBytes: number;
  startScan: () => void;
  setScanResults: (results: ScanResultGroup[]) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isScanning: false,
  scanResults: [],
  totalRecoverableBytes: 0,
  startScan: () => set({ isScanning: true }),
  setScanResults: (results) => {
    const total = results.reduce((sum, r) => sum + r.recoverableBytes, 0);
    set({ scanResults: results, isScanning: false, totalRecoverableBytes: total });
  },
}));
