// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Add });
    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Multiply });
    expect(result).toBe(15);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 3, action: Action.Divide });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 2, action: Action.Exponentiate });
    expect(result).toBe(36);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 6, b: 2, action: 'invalid' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({ a: '6', b: 2, action: Action.Add });
    expect(result1).toBeNull();

    const result2 = simpleCalculator({ a: 6, b: null, action: Action.Subtract });
    expect(result2).toBeNull();

    const result3 = simpleCalculator({ a: undefined, b: 2, action: Action.Multiply });
    expect(result3).toBeNull();

    const result4 = simpleCalculator({ a: undefined, b: 2, action: Action.Divide });
    expect(result4).toBeNull();

    const result5 = simpleCalculator({ a: 6, b: '6', action: Action.Exponentiate });
    expect(result5).toBeNull();
  });
});
