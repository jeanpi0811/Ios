import { formatBytes } from '../utils/format';

describe('formatBytes', () => {
  it('formata zero e negativos como 0 B', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(-10)).toBe('0 B');
  });

  it('formata bytes, KB, MB e GB corretamente', () => {
    expect(formatBytes(512)).toBe('512.0 B');
    expect(formatBytes(2048)).toBe('2.0 KB');
    expect(formatBytes(5 * 1024 * 1024)).toBe('5.0 MB');
    expect(formatBytes(1.5 * 1024 * 1024 * 1024)).toBe('1.5 GB');
  });
});
