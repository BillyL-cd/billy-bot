export interface RepoOwner {
    repo: string;
    owner: string;
  }

export interface RepoTargetBranch {
    currentBranch: String;
    targetBranch: string;
    defaultBranch: String
}

export interface ticketFixVersion {
    requiredVersion: string;
}