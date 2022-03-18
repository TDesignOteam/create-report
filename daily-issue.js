const core = require("@actions/core");
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");
const { exec } = require("child_process");
const { ReposEnum } = require("./const");

const wxhook = core.getInput("wxhook");
const token = core.getInput("token");
const data = core.getInput("data");

const octokit = new Octokit({ auth: token });

function renderMark() {
  return `> **有人提issue啦**
> **标  题:** ${github.payload.issue.title}
> **发起人:** $ORANGE_ISSUE_OWNER
> [查看详情]($ORANGE_EVENT_URL)
`
}

async function send() {
  console.log(github.payload)
  console.log(github.payload.issue)

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