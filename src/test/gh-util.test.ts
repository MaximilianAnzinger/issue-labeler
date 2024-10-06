import * as containsKeywordFile from '../main/labeler/contains-keyword';
import {context} from '@actions/github';
import {addLabels, getIssueBody, getIssueTitle} from '../main/gh-util';

describe('getIssueTitle', () => {
  it('should return title if context holds issue', () => {
    context.payload = {issue: {number: 1, title: 'Title of the Issue'}};
    expect(getIssueTitle()).toBe('Title of the Issue');
  });

  it('should return empty string if context does not hold issue', () => {
    context.payload = {issue: {number: 1}};
    expect(getIssueTitle()).toBe('');
    context.payload = {issue: {number: 1, title: undefined}};
    expect(getIssueTitle()).toBe('');
  });
});

describe('getIssueBody', () => {
  it('should return body if context holds issue', () => {
    context.payload = {issue: {number: 1, body: 'Body of the Issue'}};
    expect(getIssueBody()).toBe('Body of the Issue');
  });

  it('should return empty string if context does not hold issue', () => {
    context.payload = {issue: {number: 1}};
    expect(getIssueBody()).toBe('');
    context.payload = {issue: {number: 1, body: undefined}};
    expect(getIssueBody()).toBe('');
  });
});
