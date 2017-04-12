import settings from "./settings";

export default {
  getPorts: ({ portOffset, portIndent }) => {
    const ports = {
      seleniumPort: settings.config.seleniumgridPort,
      mockingPort: null
    };

    if (portIndent > 1) {
      ports.mockingPort = portOffset + 1;
    }

    return ports;
  }
};
