class MockFunctionError extends Error {
  constructor() {
    super('This function is a mock and should not be called.');
    this.name = 'MockFunctionError';
  }
}

const isMockFunctionError = (error: unknown): error is MockFunctionError => {
  return error instanceof MockFunctionError && error.name === 'MockFunctionError';
};

const mockFunctionThrowError = () => {
  throw new MockFunctionError();
};

const mockFunction = () => {
  // noop
};

export { mockFunction, mockFunctionThrowError, isMockFunctionError };
