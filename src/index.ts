
import { Probot } from "probot";
import { handlePrOpened } from './handlers';
// import {getBaseBranchFromContext } from './utils/githubUtils'
import {getJiraInfoFromAPI } from './utils/jiraUtils'

//https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads

export = (app: Probot): void => {
  app.log.info("Yay, my app is loaded!!!!!!!!!!!!");
   
  app.on("pull_request.edited", async (context) => {
    // const { targeBranch } = getBaseBranchFromContext(context);
    const requiredVersion= await getJiraInfoFromAPI('FED-5294');
    console.log("sdaf?asddsasa??", requiredVersion);

    const issueComment = context.issue({
      body: "Thanks for modifi this pR!",
    });
   context.octokit.issues.createComment(issueComment);
  });

  app.on('pull_request.opened', handlePrOpened);
  }
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/