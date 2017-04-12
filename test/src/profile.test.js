import configuration from "../../lib/configuration";
import profile from "../../lib/profile";
import chai from "chai";
import chaiAsPromise from "chai-as-promised";
import _ from "lodash";

chai.use(chaiAsPromise);

const expect = chai.expect;
const assert = chai.assert;

describe("Profile", () => {
  it("getNightwatchConfig", () => {
    const argv = {
      seleniumgrid_host: "FAKE_HOST",
      seleniumgrid_port: "4444"
    };
    configuration.validateConfig({}, argv);
    const config = profile.getNightwatchConfig({ desiredCapabilities: { browser: "chrome" } });
    
    expect(config.selenium_host).to.equal(argv.seleniumgrid_host);
    expect(config.selenium_port).to.equal(argv.seleniumgrid_port);
    expect(config.desiredCapabilities.browser).to.equal("chrome");
  });

  describe("getProfiles", () => {
    it("with seleniumgrid_browser", () => {
      let argvMock = {
        seleniumgrid_browser: "chrome"
      };

      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .getProfiles(opts, argvMock)
        .then((p) => {
          expect(p.length).to.equal(1);
          expect(p[0].desiredCapabilities.browserName).to.equal("chrome");
          expect(p[0].executor).to.equal("seleniumgrid");
          expect(p[0].nightwatchEnv).to.equal("chrome");
          expect(p[0].id).to.equal("chrome");
        })
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });

    it("with seleniumgrid_browsers", () => {
      let argvMock = {
        seleniumgrid_browsers: "chrome,safari"
      };

      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .getProfiles(opts, argvMock)
        .then((p) => {
          expect(p.length).to.equal(2);
          expect(p[0].desiredCapabilities.browserName).to.equal("chrome");
          expect(p[0].executor).to.equal("seleniumgrid");
          expect(p[0].nightwatchEnv).to.equal("chrome");
          expect(p[0].id).to.equal("chrome");

          expect(p[1].desiredCapabilities.browserName).to.equal("safari");
          expect(p[1].executor).to.equal("seleniumgrid");
          expect(p[1].nightwatchEnv).to.equal("safari");
          expect(p[1].id).to.equal("safari");
        })
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });

    it("without seleniumgrid_browsers or seleniumgrid_browser", () => {
      let argvMock = {};

      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .getProfiles(opts, argvMock)
        .then(p => expect(p).to.equal(undefined))
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });
  });

  describe("getCapabilities", () => {
    it("succeed", () => {
      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .getCapabilities("chrome", opts)
        .then((p) => {
          expect(p.desiredCapabilities.browserName).to.equal("chrome");
          expect(p.executor).to.equal("seleniumgrid");
          expect(p.nightwatchEnv).to.equal("chrome");
          expect(p.id).to.equal("chrome");
        })
        .catch(err => assert(false, "getCapabilities isn't functional" + err));
    });

    it("succeed", () => {
      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .getCapabilities("android", opts)
        .then((p) => assert(false, "getCapabilities isn't functional"))
        .catch(err => expect(err).to.equal("profile: android isn't found"));
    });

    it("listBrowsers", (done) => {
      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .listBrowsers(opts, () => {
          done();
        });
    });
  });
});