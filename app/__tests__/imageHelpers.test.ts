import { describe, it, expect } from '@jest/globals';
import { validateImageFile, formatConfidence, dataURLtoBlob } from '../utils/imageHelpers';

describe('validateImageFile', () => {
  it('accepts valid JPEG image', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const result = validateImageFile(file);
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('accepts valid PNG image', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const result = validateImageFile(file);
    expect(result.valid).toBe(true);
  });

  it('rejects invalid file type', () => {
    const file = new File([''], 'test.gif', { type: 'image/gif' });
    const result = validateImageFile(file);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid file type');
  });

  it('rejects file too large', () => {
    const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'large.jpg', {
      type: 'image/jpeg',
    });
    const result = validateImageFile(largeFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('5MB');
  });
});

describe('formatConfidence', () => {
  it('formats confidence as percentage', () => {
    expect(formatConfidence(0.95)).toBe('95.0%');
    expect(formatConfidence(0.8122)).toBe('81.2%');
    expect(formatConfidence(0.5)).toBe('50.0%');
  });

  it('handles edge cases', () => {
    expect(formatConfidence(0)).toBe('0.0%');
    expect(formatConfidence(1)).toBe('100.0%');
  });
});

describe('dataURLtoBlob', () => {
  it('converts data URL to blob', () => {
    const dataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    const blob = dataURLtoBlob(dataURL);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/jpeg');
  });
});
