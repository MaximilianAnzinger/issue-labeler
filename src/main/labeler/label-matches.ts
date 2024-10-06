import {LabelConfig, MatchingStrategy} from "../labeler-config";
import {containsKeyword} from "./contains-keyword";

export function labelMatches(
    config: LabelConfig,
    contentToCheck: string
): boolean {
    if (!contentToCheck || !config.keywords || config.keywords.length === 0) {
        return false;
    }
    switch (config.matchingStrategy) {
        case MatchingStrategy.ALL:
            return config.keywords.every(keyword => containsKeyword(
                    contentToCheck,
                    keyword,
                    config.caseSensitive
                )
            );
        case MatchingStrategy.ANY:
            return config.keywords.some(keyword =>
                containsKeyword(contentToCheck, keyword, config.caseSensitive)
            );
        default:
            return false;
    }
}