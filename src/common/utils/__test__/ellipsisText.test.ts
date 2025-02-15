import { ellipsisText } from '../ellipsisText'; // Adjust the import path

describe('ellipsisText', () => {
  it('should return the string itself if it is shorter than the max length', () => {
    expect(ellipsisText('short', 10)).toBe('short');
  });

  it('should truncate the string and add ellipsis if it exceeds the max length', () => {
    expect(ellipsisText('This is a long sentence.', 10)).toBe('This is a...');
  });

  it('should handle null input and convert it to an empty string', () => {
    expect(ellipsisText(null, 5)).toBe('');
  });

  it('should convert non-string input to a string', () => {
    expect(ellipsisText(12345, 3)).toBe('123...');
  });

  it('should handle empty string input gracefully', () => {
    expect(ellipsisText('', 5)).toBe('');
  });

  it('should return the exact text if it is equal to maxLength', () => {
    expect(ellipsisText('exact', 6)).toBe('exact');
  });
});
