/**
 * Mock backend should be turned off in prod mode
 */

class MockBackend {
  start(): void {}

  stop(): void {}
}

export default new MockBackend();
