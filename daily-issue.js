const core = require("@actions/core");
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");
const { exec } = require("child_process");
const { ReposEnum } = require("./const");

const wxhook = core.getInput("wxhook");
const token = core.getInput("token");
const data = core.getInput("data");
const context = github.context;

function renderMark() {
  return `> **${context.payload.action === 'reopened' ? context.payload.sender.login + '重新打开了一个issue' : '有人提issue啦'}**
> **标  题:** ${context.payload.issue.title}
> **发起人:** ${context.payload.issue.user.login}
> [查看详情](${context.payload.issue.html_url})`
}

async function send() {
  console.log(context.payload)
  // console.log(context.issue)// { owner: '94dreamer', repo: 'tdesign-mobile-vue', number: 9 }

  // 调取 参数指定的 ReposEnum 的issue 情况
  // 形成 infoData
  // 灌入模版 生成图表
  const markdownString = renderMark(data);

  exec(
    `curl ${wxhook} \
   -H 'Content-Type: application/json' \
   -d '
   {
        "chatid": "wrkSFfCgAA-QNmuIjascLNFfmkFVQT5A",
        "msgtype": "markdown",
        "markdown": {
            "content": "${markdownString.replaceAll('"', "'")}"
        }
   }'`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );

}

module.exports = send;