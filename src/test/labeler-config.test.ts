import {LabelConfig, LabelerConfig, MatchingStrategy, rawConfigToLabelerConfig} from "../main/labeler-config";

describe('rawConfigToLabelerConfig', () => {

    const rawConfig ={
        "label-a": [
            "keyword 1",
            "keyword 2",
            {
                "matchingStrategy": "all"
            },
            {
                "caseSensitive": true
            }
        ],
        "label-b": [
            "keyword 3",
            "keyword 4",
            {
                "matchingStrategy": "any"
            },
            {
                "caseSensitive": false
            }
        ],
        "label-c": [
            "keyword 5"
        ]
    }

    const expectedConfig = {
        labelConfigs: [
            {
                label: "label-a",
                keywords: ["keyword 1", "keyword 2"],
                matchingStrategy: MatchingStrategy.ALL,
                caseSensitive: true
            } as LabelConfig,
            {
                label: "label-b",
                keywords: ["keyword 3", "keyword 4"],
                matchingStrategy: MatchingStrategy.ANY,
                caseSensitive: false
            } as LabelConfig,
            {
                label: "label-c",
                keywords: ["keyword 5"],
                matchingStrategy: MatchingStrategy.ANY,
                caseSensitive: true
            } as LabelConfig
        ]
    };

    it('should correctly parse config', () => {
        expect(rawConfigToLabelerConfig(rawConfig)).toEqual(expectedConfig);
    });
});