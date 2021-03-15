
import { Context } from 'probot';
import {createComment,
        getBaseBranchFromContext,
        getRepoAndOwnerFromContext} from './githubUtils'
import { getJiraInfoFromAPI } from './jiraUtils'
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { CONFIG } from '../constants';

export const welcomeMessage = async (context: Context): Promise<unknown> => {
  const { repo, owner } = getRepoAndOwnerFromContext(context);
  const { currentBranch, targetBranch, defaultBranch } = getBaseBranchFromContext(context);
  const ticketNumber = currentBranch.match(/[A-Z]{3}-[0-9]{1,4}/)
  const requiredVersion = ticketNumber?  await getJiraInfoFromAPI(ticketNumber[0]) : '';
  
  console.log("sdaf???", targetBranch, repo, owner, currentBranch, defaultBranch, requiredVersion);

    const buffer = readFileSync(path.join(__dirname, '../../content/welcome.md.handlebars'));
    const template = Handlebars.compile(buffer.toString());
  
    return createComment(context, template({ botCommand: CONFIG.botCommand, targetBranch, requiredVersion  }));
  };