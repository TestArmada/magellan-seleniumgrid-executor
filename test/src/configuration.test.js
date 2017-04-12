import configuration from "../../lib/configuration";
import settings from "../../lib/settings";
import chai from "chai";
import chaiAsPromise from "chai-as-promised";
import _ from "lodash";

chai.use(chaiAsPromise);

const expect = chai.expect;
const assert = chai.assert;

describe("Configuration", () => {
  it("getConfig", () => {
    const config = configuration.getConfig();

    expect(config.seleniumgridHost).to.equal(null);
    expect(config.seleniumgridPort).to.equal(null);
    expect(config.seleniumgridURL).to.equal(null);
  });

  describe("validateConfig", () => {
    afterEach(() => {
      settings.config = {
        seleniumgridHost: null,
        seleniumgridPort: null,
        seleniumgridURL: null
      };
    });

    it("only URL is set", () => {
      const argv = {
        seleniumgrid_url: "http://FAKE_HOST:PORT/wd/hub"
      };
      const config = configuration.validateConfig({}, argv);

      expect(config.seleniumgridURL).to.equal(argv.seleniumgrid_url);
      expect(config.seleniumgridHost).to.equal(null);
      expect(config.seleniumgridPort).to.equal(null);
    });

    it("only host and port are set", () => {
      const argv = {
        seleniumgrid_host: "FAKE_HOST",
        seleniumgrid_port: "4444"
      };
      const config = configuration.validateConfig({}, argv);

      expect(config.seleniumgridURL).to.equal(null);
      expect(config.seleniumgridHost).to.equal(argv.seleniumgrid_host);
      expect(config.seleniumgridPort).to.equal(argv.seleniumgrid_port);
    });

    it("all are set", () => {
      const argv = {
        seleniumgrid_host: "FAKE_HOST",
        seleniumgrid_port: "4444",
        seleniumgrid_url: "http://FAKE_HOST:PORT/wd/hub"
      };

      try {
        const config = configuration.validateConfig({}, argv);
      } catch (e) {
        expect(e.message).to.equal("Please use --seleniumgrid_url, "
          + "or --seleniumgrid_host and --seleniumgrid_port");
      }
    });

    it("URL and port are set", () => {
      const argv = {
        seleniumgrid_port: "4444",
        seleniumgrid_url: "http://FAKE_HOST:PORT/wd/hub"
      };

      try {
        const config = configuration.validateConfig({}, argv);
      } catch (e) {
        expect(e.message).to.equal("Please use --seleniumgrid_url, "
          + "or --seleniumgrid_host and --seleniumgrid_port");
      }
    });
  });
});