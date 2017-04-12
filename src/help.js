export default {
  "seleniumgrid_browser": {
    "visible": true,
    "type": "string",
    "example": "chrome",
    "description": "Run tests in chrome, firefox, etc."
  },
  "seleniumgrid_browsers": {
    "visible": true,
    "type": "string",
    "example": "b1,b2,..",
    "description": "Run multiple browsers in parallel."
  },
  "seleniumgrid_host": {
    "visible": true,
    "type": "string",
    "example": "localhost",
    "description": "Host for selenium grid (exclusive with seleniumgrid_url)."
  },
  "seleniumgrid_port": {
    "visible": true,
    "type": "string",
    "example": "4444",
    "description": "Port for selenium grid (exclusive with seleniumgrid_url)."
  },
  "seleniumgrid_url": {
    "visible": true,
    "type": "string",
    "example": "http://localhost:4444",
    "description": "URL for selenium grid (exclusive with seleniumgrid_host and seleniumgrid_port)."
  },
  "seleniumgrid_list_browsers": {
    "visible": true,
    "type": "function",
    "description": "List the available browsers configured."
  }
};
