const core = require("@actions/core");
const DailyClose = require("./daily-close");
const DailyXiaolv = require('./daily-xiaolv');
const DailyIssue = require('./daily-issue');
const wxhook = core.getInput("wxhook");
const token = core.getInput("token");
const type = core.getInput("type");

try {
  if (type === "close") {
    const dailyClose = new DailyClose({ wxhook, token });
    dailyClose.run();
  } else if (type === "xiaolv") {
    DailyXiaolv();
  } else if (type === 'issue') {
    DailyIssue();
  } else {
    core.setFailed('没有传递正确的type');
  }
} catch (error) {
  core.setFailed(error.message);
}
