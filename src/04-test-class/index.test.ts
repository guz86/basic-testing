// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(8);
    expect(account.getBalance()).toBe(8);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(8);
    expect(() => account.withdraw(9)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(8);
    const toAccount = getBankAccount(8);
    expect(() => account.transfer(9, toAccount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(8);
    expect(() => account.transfer(9, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(8);
    account.deposit(2);
    expect(account.getBalance()).toBe(10);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(8);
    account.withdraw(8);
    expect(account.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const account = getBankAccount(2);
    const toAccount = getBankAccount(2);
    account.transfer(1, toAccount);
    expect(account.getBalance()).toBe(1);
    expect(toAccount.getBalance()).toBe(3);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(2);
    const balance = await account.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(2);
    const fetchBalanceMock = jest.spyOn(account, 'fetchBalance').mockResolvedValue(5);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(5);
    fetchBalanceMock.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(2);
    const fetchBalanceMock = jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
    fetchBalanceMock.mockRestore();
  });
});
