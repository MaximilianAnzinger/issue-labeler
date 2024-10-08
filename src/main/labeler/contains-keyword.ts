import {debug} from '@actions/core';

export function containsKeyword(
  contentToCheck: string,
  keyword: string,
  caseSensitive: boolean
): boolean {
  if (!contentToCheck || !keyword) {
    return false;
  }
  try {
    const regex = caseSensitive
      ? new RegExp(keyword)
      : new RegExp(keyword, 'i');
    return regex.test(contentToCheck);
  } catch (e) {
    debug(`Error while checking for keyword: ${e}`);
    return false;
  }
}
