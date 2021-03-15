import { Context } from 'probot';
import {
  RepoOwner,
  RepoTargetBranch,
} from '../constants/types';

export const createComment = (
    context: Context,
    body: string,
  ): Promise<unknown> => {
    const params = context.issue({ body });
    return context.octokit.issues.createComment(params);
  };

  /**
 * returns the repo and owner from the context
 * @param context
 * @returns {Object}
 */
export const getRepoAndOwnerFromContext = (context: Context): RepoOwner => {
  const { repository } = context.payload;
  const {
    name: repo,
    owner: { login: owner },
  } = repository;

  return { repo, owner };
};

  /**
 * returns the repo and owner from the context
 * @param context
 * @returns {Object}
 */
export const getBaseBranchFromContext = (context: Context): RepoTargetBranch => {
  const { base, head } = context.payload.pull_request;

  const {
    ref:  targetBranch,
    repo:{ default_branch: defaultBranch} 
  } = base;
  const {
    ref:  currentBranch,
  } = head;
 
  return {  currentBranch, targetBranch, defaultBranch };
};