const core = require("@actions/core");
const DailyClose = require("./daily-close");
const wxhook = core.getInput("wxhook");
const token = core.getInput("token");
const type = core.getInput("type");

try {
  if (type === "close") {
    const dailyClose = new DailyClose({ wxhook, token });
    dailyClose.run();
  } else {
    main();
  }
} catch (error) {
  core.setFailed(error.message);
}
