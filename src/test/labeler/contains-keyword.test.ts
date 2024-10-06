import {containsKeyword} from "../../main/labeler/contains-keyword";

describe('containsKeyword', () => {
    it('should not match empty keyword', () => {
        expect(containsKeyword('content', '', false)).toBeFalsy();
        expect(containsKeyword('', '', false)).toBeFalsy();
        expect(containsKeyword('content', '', true)).toBeFalsy();
        expect(containsKeyword('', '', true)).toBeFalsy();
    });

    it('should correctly match single word - case sensitive', () => {
        expect(containsKeyword('content', 'Content', true)).toBeFalsy();
        expect(containsKeyword('content', 'content', true)).toBeTruthy();
        expect(
            containsKeyword('some content', 'content', true)
        ).toBeTruthy();
        expect(containsKeyword('content', 'onten', true)).toBeTruthy();
        expect(containsKeyword('content', 'conten', true)).toBeTruthy();
        expect(containsKeyword('content', 'ontent', true)).toBeTruthy();
    });

    it('should match multiple words - case sensitive', () => {
        expect(
            containsKeyword(
                'some content and some more content',
                'content',
                true
            )
        ).toBeTruthy();
        expect(
            containsKeyword(
                'some Content and some more content',
                'content',
                true
            )
        ).toBeTruthy();
        expect(
            containsKeyword(
                'some Content and some more Content',
                'content',
                true
            )
        ).toBeFalsy();
    });

    it('should correctly match regex - case sensitive', () => {
        expect(
            containsKeyword('content', '(content|some)', true)
        ).toBeTruthy();
        expect(
            containsKeyword('Order number: 12345', '\\d+', true)
        ).toBeTruthy();
        expect(
            containsKeyword('Order number: ABCDE', '\\d+', true)
        ).toBeFalsy();
        expect(
            containsKeyword('The quick brown fox', '\\bquick\\b', true)
        ).toBeTruthy();
        expect(
            containsKeyword('The quickest way', '\\bquick\\b', true)
        ).toBeFalsy();
        expect(
            containsKeyword('This costs $100', '\\$100', true)
        ).toBeTruthy();
        expect(
            containsKeyword('Do you use C++?', 'C\\+\\+', true)
        ).toBeTruthy();
    });

    it('should correctly match single word - case insensitive', () => {
        expect(containsKeyword('content', 'Content', false)).toBeTruthy();
        expect(containsKeyword('content', 'CONTENT', false)).toBeTruthy();
        expect(
            containsKeyword('some content', 'conTent', false)
        ).toBeTruthy();
        expect(containsKeyword('content', 'Onten', false)).toBeTruthy();
        expect(containsKeyword('content', 'coNten', false)).toBeTruthy();
        expect(containsKeyword('content', 'ontenT', false)).toBeTruthy();
    });

    it('should match multiple words - case insensitive', () => {
        expect(
            containsKeyword(
                'some content and some more content',
                'content',
                false
            )
        ).toBeTruthy();
        expect(
            containsKeyword(
                'some Content and some more content',
                'content',
                false
            )
        ).toBeTruthy();
        expect(
            containsKeyword(
                'some Content and some more Content',
                'content',
                false
            )
        ).toBeTruthy();
    });

    it('should correctly match regex - incase sensitive', () => {
        expect(
            containsKeyword('content', '(Content|sOme)', false)
        ).toBeTruthy();
        expect(
            containsKeyword('Order number: 12345', '\\d+', false)
        ).toBeTruthy();
        expect(
            containsKeyword('Order number: ABCDE', '\\d+', false)
        ).toBeFalsy();
        expect(
            containsKeyword('The quick brown fox', '\\bquIck\\b', false)
        ).toBeTruthy();
        expect(
            containsKeyword('The quickest way', '\\bquIck\\b', false)
        ).toBeFalsy();
        expect(
            containsKeyword('This costs $100', '\\$100', false)
        ).toBeTruthy();
        expect(
            containsKeyword('Do you use C++?', 'c\\+\\+', false)
        ).toBeTruthy();
    });
});