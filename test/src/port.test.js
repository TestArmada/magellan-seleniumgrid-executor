import configuration from "../../lib/configuration";
import port from "../../lib/port";
import chai from "chai";
import chaiAsPromise from "chai-as-promised";
import _ from "lodash";

chai.use(chaiAsPromise);

const expect = chai.expect;
const assert = chai.assert;

describe("Port", () => {
  describe("getPorts", () => {
    it("portIndent > 1", () => {
      const config_argv = {
        seleniumgrid_host: "FAKE_HOST",
        seleniumgrid_port: 4444
      };
      configuration.validateConfig({}, config_argv);

      const port_argv = {
        portOffset: 1000,
        portIndent: 3
      };
      const ports = port.getPorts(port_argv);

      expect(ports.seleniumPort).to.equal(config_argv.seleniumgrid_port);
      expect(ports.mockingPort).to.equal(port_argv.portOffset + 1);
    });

    it("portIndent <= 1", () => {
      const config_argv = {
        seleniumgrid_host: "FAKE_HOST",
        seleniumgrid_port: 4444
      };
      configuration.validateConfig({}, config_argv);

      const port_argv = {
        portOffset: 1000,
        portIndent: 1
      };
      const ports = port.getPorts(port_argv);

      expect(ports.seleniumPort).to.equal(config_argv.seleniumgrid_port);
      expect(ports.mockingPort).to.equal(null);
    });
  });
});