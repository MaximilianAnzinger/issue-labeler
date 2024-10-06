import * as containsKeywordFile from '../../main/labeler/contains-keyword';
import {LabelConfig, MatchingStrategy} from '../../main/labeler-config';
import {labelMatches} from '../../main/labeler/label-matches';

describe('labelMatches', () => {
  let containsKeywordStub: jest.SpyInstance;

  beforeEach(() => {
    containsKeywordStub = jest.spyOn(containsKeywordFile, 'containsKeyword');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return false if content is empty', () => {
    const labelConfig = {
      label: 'label',
      keywords: ['keyword'] as string[],
      matchingStrategy: MatchingStrategy.ALL,
      caseSensitive: true
    } as LabelConfig;

    containsKeywordStub.mockReturnValue(true);

    expect(labelMatches(labelConfig, '')).toBeFalsy();
  });

  it('should return false if keywords is empty', () => {
    const labelConfig = {
      label: 'label',
      keywords: [] as string[],
      matchingStrategy: MatchingStrategy.ALL,
      caseSensitive: true
    } as LabelConfig;

    containsKeywordStub.mockReturnValue(true);

    expect(labelMatches(labelConfig, 'content')).toBeFalsy();
  });

  it('should match correctly for strategy all - all match', () => {
    const labelConfig = {
      label: 'label',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      matchingStrategy: MatchingStrategy.ALL,
      caseSensitive: true
    } as LabelConfig;

    containsKeywordStub
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);
    expect(labelMatches(labelConfig, 'content')).toBeTruthy();
  });

  it('should match correctly for strategy all - not all match', () => {
    const labelConfig = {
      label: 'label',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      matchingStrategy: MatchingStrategy.ALL,
      caseSensitive: true
    } as LabelConfig;

    containsKeywordStub
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    expect(labelMatches(labelConfig, 'content')).toBeFalsy();
  });

  it('should match correctly for strategy all - none match', () => {
    const labelConfig = {
      label: 'label',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      matchingStrategy: MatchingStrategy.ALL,
      caseSensitive: true
    } as LabelConfig;

    containsKeywordStub
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);
    expect(labelMatches(labelConfig, 'content')).toBeFalsy();
  });

  it('should match correctly for strategy any - all match', () => {
    const labelConfig = {
      label: 'label',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      matchingStrategy: MatchingStrategy.ANY,
      caseSensitive: true
    } as LabelConfig;

    containsKeywordStub
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);
    expect(labelMatches(labelConfig, 'content')).toBeTruthy();
  });

  it('should match correctly for strategy any - not all match', () => {
    const labelConfig = {
      label: 'label',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      matchingStrategy: MatchingStrategy.ANY,
      caseSensitive: true
    } as LabelConfig;

    containsKeywordStub
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    expect(labelMatches(labelConfig, 'content')).toBeTruthy();
  });

  it('should match correctly for strategy any - none match', () => {
    const labelConfig = {
      label: 'label',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      matchingStrategy: MatchingStrategy.ANY,
      caseSensitive: true
    } as LabelConfig;

    containsKeywordStub
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);
    expect(labelMatches(labelConfig, 'content')).toBeFalsy();
  });
});
