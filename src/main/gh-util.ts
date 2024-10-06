import {debug} from '@actions/core';
import {context, getOctokit} from '@actions/github';

export type GitHub = ReturnType<typeof getOctokit>['rest'];

export function getIssueTitle(): string {
  const {issue} = context.payload;
  return issue?.title ?? '';
}

export function getIssueBody(): string {
  const {issue} = context.payload;
  return issue?.body ?? '';
}

export async function addLabels(
  client: GitHub,
  issue_number: number,
  labels: string[]
) {
  const formatted = labels.map(l => `"${l}"`).join(', ');
  debug(`Adding label(s) (${formatted}) to issue #${issue_number}`);
  return await client.issues.addLabels({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number,
    labels
  });
}
