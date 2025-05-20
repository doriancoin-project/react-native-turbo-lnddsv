describe("TurboLnd mock", () => {
  beforeEach(() => {
    // Reset the module before each test
    jest.resetModules();
    jest.doMock("../src/", () => {
      return require("../src/").default;
    });
  });
});
