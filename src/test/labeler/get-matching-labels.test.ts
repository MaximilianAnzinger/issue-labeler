import {
  LabelConfig,
  LabelerConfig,
  MatchingStrategy
} from '../../main/labeler-config';
import * as labelMatchesFile from '../../main/labeler/label-matches';
import {getMatchingLabels} from '../../main/labeler/get-matching-labels';

describe('labeler', () => {
  let labelMatchesStub: jest.SpyInstance;

  beforeEach(() => {
    labelMatchesStub = jest.spyOn(labelMatchesFile, 'labelMatches');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return empty array if no labels match', () => {
    const labelerConfig = {
      labelConfigs: [
        {
          label: 'label1',
          keywords: ['keyword1'],
          matchingStrategy: MatchingStrategy.ALL,
          caseSensitive: true
        } as LabelConfig,
        {
          label: 'label2',
          keywords: ['keyword2'],
          matchingStrategy: MatchingStrategy.ALL,
          caseSensitive: true
        } as LabelConfig
      ]
    } as LabelerConfig;

    labelMatchesStub.mockReturnValue(false);

    expect(getMatchingLabels(labelerConfig, 'content')).toEqual([]);
  });

  it('should return all labels that match', () => {
    const labelerConfig = {
      labelConfigs: [
        {
          label: 'label1',
          keywords: ['keyword1'],
          matchingStrategy: MatchingStrategy.ALL,
          caseSensitive: true
        } as LabelConfig,
        {
          label: 'label2',
          keywords: ['keyword2'],
          matchingStrategy: MatchingStrategy.ALL,
          caseSensitive: true
        } as LabelConfig,
        {
          label: 'label3',
          keywords: ['keyword3'],
          matchingStrategy: MatchingStrategy.ALL,
          caseSensitive: true
        } as LabelConfig
      ]
    } as LabelerConfig;

    labelMatchesStub
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    expect(getMatchingLabels(labelerConfig, 'content')).toEqual([
      'label1',
      'label3'
    ]);
  });
});
