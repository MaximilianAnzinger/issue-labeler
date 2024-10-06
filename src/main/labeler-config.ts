import fs from 'fs';
import {context} from '@actions/github';
import {load} from 'js-yaml';
import {GitHub} from './gh-util';

export enum MatchingStrategy {
  ALL = 'all',
  ANY = 'any'
}

export interface LabelConfig {
  label: string;
  keywords: string[];
  matchingStrategy: MatchingStrategy;
  caseSensitive: boolean;
}

export interface LabelerConfig {
  labelConfigs: LabelConfig[];
}

export async function importConfigFile(
  filePath: string,
  github: GitHub
): Promise<LabelerConfig> {
  let fileContent: string;

  if (fs.existsSync(filePath)) {
    fileContent = fs.readFileSync(filePath, {encoding: 'utf8'});
  } else {
    const {data} = await github.repos.getContent({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: context.sha,
      path: filePath
    });

    if (!('content' in data)) {
      throw new TypeError('Invalid file for configuration.');
    }

    fileContent = Buffer.from(data.content, 'base64').toString('utf8');
  }
  const rawConfig = load(fileContent);
  return rawConfigToLabelerConfig(rawConfig);
}

export function rawConfigToLabelerConfig(rawConfig: any): LabelerConfig {
  const labelerConfig: LabelerConfig = {labelConfigs: []} as LabelerConfig;
  for (const label in rawConfig) {
    const labelConfig: LabelConfig = {
      label: label,
      keywords: parseKeywords(rawConfig, label),
      matchingStrategy: parseMatchingStrategy(rawConfig, label),
      caseSensitive: parseCaseSensitivity(rawConfig, label)
    } as LabelConfig;
    labelerConfig.labelConfigs.push(labelConfig);
  }
  return labelerConfig;
}

function parseKeywords(rawConfig: any, label: string): string[] {
  const keywords: string[] = [];
  rawConfig[label].forEach((keyword: any) => {
    if (typeof keyword === 'string') {
      keywords.push(keyword);
    }
  });
  return keywords;
}

function parseMatchingStrategy(
  rawConfig: any,
  label: string
): MatchingStrategy {
  const strategyEntry = rawConfig[label].find((entry: any) => entry.matchingStrategy !== undefined);
  if (!strategyEntry) {
    return MatchingStrategy.ANY;
  }
  switch (strategyEntry.matchingStrategy) {
    case 'all':
      return MatchingStrategy.ALL;
    case 'any':
      return MatchingStrategy.ANY;
    default:
      throw new TypeError(
        `Invalid matching strategy for label "${label}": ${rawConfig[label].matchingStrategy}`
      );
  }
}

function parseCaseSensitivity(rawConfig: any, label: string): boolean {
  const caseSensitiveEntry = rawConfig[label].find((entry: any) => entry.caseSensitive !== undefined);
  return caseSensitiveEntry ? caseSensitiveEntry.caseSensitive : true;
}
