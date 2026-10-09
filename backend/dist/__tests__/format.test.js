"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("../utils/format");
describe('formatBytes', () => {
    it('formata zero e negativos como 0 B', () => {
        expect((0, format_1.formatBytes)(0)).toBe('0 B');
        expect((0, format_1.formatBytes)(-10)).toBe('0 B');
    });
    it('formata bytes, KB, MB e GB corretamente', () => {
        expect((0, format_1.formatBytes)(512)).toBe('512.0 B');
        expect((0, format_1.formatBytes)(2048)).toBe('2.0 KB');
        expect((0, format_1.formatBytes)(5 * 1024 * 1024)).toBe('5.0 MB');
        expect((0, format_1.formatBytes)(1.5 * 1024 * 1024 * 1024)).toBe('1.5 GB');
    });
});
