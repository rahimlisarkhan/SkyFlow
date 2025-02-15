import { toTitleCaseWithSpace } from '../ellipsisText'; // Adjust the import path

describe('toTitleCaseWithSpace', () => {
  it('should convert underscore-separated text to title case with spaces', () => {
    expect(toTitleCaseWithSpace('hello_world')).toBe('Hello world');
    expect(toTitleCaseWithSpace('my_name_is_John')).toBe('My name is john');
  });

  it('should handle empty string input', () => {
    expect(toTitleCaseWithSpace('')).toBe('');
  });

  it('should handle null input gracefully', () => {
    expect(toTitleCaseWithSpace(null)).toBe('');
  });

  it('should capitalize only the first word and lowercase the rest', () => {
    expect(toTitleCaseWithSpace('test_CASE_example')).toBe('Test case example');
  });

  it('should handle text without underscores', () => {
    expect(toTitleCaseWithSpace('hello')).toBe('Hello');
  });
});
