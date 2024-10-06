import {LabelerConfig} from '../labeler-config';
import {labelMatches} from './label-matches';

export function getMatchingLabels(
  config: LabelerConfig,
  contentToCheck: string
): string[] {
  const labels: string[] = [];
  for (const labelConfig of config.labelConfigs) {
    if (labelMatches(labelConfig, contentToCheck)) {
      labels.push(labelConfig.label);
    }
  }
  return labels;
}
