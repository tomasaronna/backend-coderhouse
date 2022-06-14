const log4js = require("log4js");
const loggerConsola = log4js.getLogger("consola");
const loggerWarn = log4js.getLogger("archivoWarning");
const loggerError = log4js.getLogger("archivoError");

log4js.configure({
  appenders: {
    loggerConsola: { type: "console" },
    loggerWarning: { type: "file", filename: "warn.log" },
    loggerError: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["loggerConsola"], level: "trace" },
    consola: { appenders: ["loggerConsola"], level: "info" },
    archivoWarning: {
      appenders: ["loggerError", "loggerConsola"],
      level: "error",
    },
    archivoError: {
      appenders: ["loggerWarning", "loggerConsola"],
      level: "warn",
    },
  },
});

module.exports = (loggerConsola, loggerWarn, loggerError);
