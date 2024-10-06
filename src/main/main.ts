import {getInput, setFailed} from '@actions/core';
import {context, getOctokit} from '@actions/github';
import {addLabels, getIssueBody, getIssueTitle} from './gh-util';
import {getMatchingLabels} from './labeler/get-matching-labels';
import {importConfigFile} from './labeler-config';

async function main() {
  // read input
  const configPath = getInput('configuration-path', {required: true});
  const token = getInput('repo-token', {required: true});
  const includeTitle = parseInt(getInput('include-title', {required: false}));
  const includeBody = parseInt(getInput('include-body', {required: false}));
  const issue_number = parseInt(getInput('issue-number', {required: true}));

  const {rest: gh} = getOctokit(token);

  const issue = await gh.issues.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number
  });

  let contentToCheck = '';
  if (includeTitle) {
    contentToCheck += issue.data.title ?? getIssueTitle() + '\n';
  }
  if (includeBody) {
    contentToCheck += issue.data.body ?? getIssueBody();
  }

  const config = await importConfigFile(configPath, gh);
  const matchingLabels = getMatchingLabels(config, contentToCheck);

  await addLabels(gh, issue_number, matchingLabels);
}

main().catch(setFailed);
