export class Showdown {
    private static gUrls: string[];

    private static gTitles: string[];

    private static gHtmlBlocks: string[];

    private static gListLevel = 0;

    public static makeHtml(text: string): string {
        Showdown.gUrls = [];
        Showdown.gTitles = [];
        Showdown.gHtmlBlocks = [];
        text = text.replace(/~/g, "~T");
        text = text.replace(/\$/g, "~D");
        text = text.replace(/\r\n/g, "\n");
        text = text.replace(/\r/g, "\n");
        text = `\n\n${text}\n\n`;
        text = Showdown._Detab(text);
        text = text.replace(/^[ \t]+$/gm, "");
        text = Showdown._HashHTMLBlocks(text);
        text = Showdown._StripLinkDefinitions(text);
        text = Showdown._RunBlockGamut(text);
        text = Showdown._UnescapeSpecialChars(text);
        text = text.replace(/~D/g, "$$");
        text = text.replace(/~T/g, "~");
        text = text.replace(/\n/g, "");
        return text;
    }

    private static _StripLinkDefinitions(text: string): string {
        text = text.replace(
            /^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm,
            (wholeMatch, ...mx: string[]) => {
                mx[1] = mx[1].toLowerCase();
                Showdown.gUrls[+mx[1]] = Showdown._EncodeAmpsAndAngles(mx[2]);
                if (mx[3]) {
                    return mx[3] + mx[4];
                }
                if (mx[4]) {
                    Showdown.gTitles[+mx[1]] = mx[4].replace(/"/g, "&quot;");
                }
                return "";
            },
        );
        return text;
    }

    private static _HashHTMLBlocks(text: string): string {
        text = text.replace(/\n/g, "\n\n");
        text = text.replace(
            /^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,
            Showdown.hashElement,
        );
        text = text.replace(
            /^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,
            Showdown.hashElement,
        );
        text = text.replace(
            /(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
            Showdown.hashElement,
        );
        text = text.replace(
            /(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,
            Showdown.hashElement,
        );
        text = text.replace(
            /(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
            Showdown.hashElement,
        );
        text = text.replace(/\n\n/g, "\n");
        return text;
    }

    private static hashElement(wholeMatch: string, ...mx: string[]): string {
        let blockText = mx[1];
        blockText = blockText.replace(/\n\n/g, "\n");
        blockText = blockText.replace(/^\n/, "");
        blockText = blockText.replace(/\n+$/g, "");
        blockText = `\n\n~K${Showdown.gHtmlBlocks.push(blockText) - 1}K\n\n`;
        return blockText;
    }

    private static _RunBlockGamut(text: string): string {
        text = Showdown._DoHeaders(text);
        const key: string = Showdown.hashBlock("<hr />");
        text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, key);
        text = text.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, key);
        text = text.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm, key);
        text = Showdown._DoTables(text);
        text = Showdown._DoLists(text);
        text = Showdown._DoCodeBlocks(text);
        text = Showdown._DoBlockQuotes(text);
        text = Showdown._HashHTMLBlocks(text);
        text = Showdown._FormParagraphs(text);
        return text;
    }

    private static _RunSpanGamut(text: string): string {
        text = Showdown._DoCodeSpans(text);
        text = Showdown._EscapeSpecialCharsWithinTagAttributes(text);
        text = Showdown._EncodeBackslashEscapes(text);
        text = Showdown._DoImages(text);
        text = Showdown._DoAnchors(text);
        text = Showdown._DoAutoLinks(text);
        text = Showdown._EncodeAmpsAndAngles(text);
        text = Showdown._DoItalicsAndBold(text);
        text = text.replace(/  +\n/g, " <br />\n");
        return text;
    }

    private static _EscapeSpecialCharsWithinTagAttributes(text: string): string {
        const regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
        text = text.replace(regex, (wholeMatch) => {
            let tag: string = wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`");
            tag = Showdown.escapeCharacters(tag, "\\`*_");
            return tag;
        });
        return text;
    }

    private static _DoAnchors(text: string): string {
        text = text.replace(
            /(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,
            Showdown.writeAnchorTag,
        );
        text = text.replace(
            /(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,
            Showdown.writeAnchorTag,
        );
        text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, Showdown.writeAnchorTag);
        return text;
    }

    private static writeAnchorTag(wholeMatch: string, ...mx: string[]): string {
        if (mx[7] == undefined) {
            mx[7] = "";
        }
        const wholeMatchM1: string = mx[1];
        const linkText: string = mx[2];
        let linkId: string = mx[3].toLowerCase();
        let url: string = mx[4];
        let title: string = mx[7];
        if (url == "") {
            if (linkId == "") {
                linkId = linkText.toLowerCase().replace(/ ?\n/g, " ");
            }
            url = `#${linkId}`;
            if (Showdown.gUrls[parseInt(linkId, 10)] != undefined) {
                url = Showdown.gUrls[parseInt(linkId, 10)];
                if (Showdown.gTitles[parseInt(linkId, 10)] != undefined) {
                    title = Showdown.gTitles[parseInt(linkId, 10)];
                }
            } else if (wholeMatchM1.search(/\(\s*\)$/m) > -1) {
                url = "";
            } else {
                return wholeMatchM1;
            }
        }
        url = Showdown.escapeCharacters(url, "*_");
        let result = `<a href="${url}"`;
        if (title != "") {
            title = title.replace(/"/g, "&quot;");
            title = Showdown.escapeCharacters(title, "*_");
            result = `${result} title="${title}"`;
        }
        result = `${result}>${linkText}</a>`;
        return result;
    }

    private static _DoImages(text: string): string {
        text = text.replace(
            /(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,
            Showdown.writeImageTag,
        );
        text = text.replace(
            /(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,
            Showdown.writeImageTag,
        );
        return text;
    }

    private static writeImageTag(wholeMatch_: string, ...mx: string[]): string {
        const match: string = mx[1];
        let altText: string = mx[2];
        let linkId: string = mx[3].toLowerCase();
        let url: string = mx[4];
        let title: string = mx[7];
        if (!title) {
            title = "";
        }
        if (url == "") {
            if (linkId == "") {
                linkId = altText.toLowerCase().replace(/ ?\n/g, " ");
            }
            url = `#${linkId}`;
            if (Showdown.gUrls[parseInt(linkId, 10)] != undefined) {
                url = Showdown.gUrls[parseInt(linkId, 10)];
                if (Showdown.gTitles[parseInt(linkId, 10)] != undefined) {
                    title = Showdown.gTitles[parseInt(linkId, 10)];
                }
            } else {
                return match;
            }
        }
        altText = altText.replace(/"/g, "&quot;");
        url = Showdown.escapeCharacters(url, "*_");
        let result = `<img src="${url}" alt="${altText}"`;
        title = title.replace(/"/g, "&quot;");
        title = Showdown.escapeCharacters(title, "*_");
        result = `${result} title="${title}"`;
        result = `${result} />`;
        return result;
    }

    private static _DoHeaders(text: string): string {
        text = text.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, (wholeMatch, ...mx: string[]) => {
            return Showdown.hashBlock(`<h1>${Showdown._RunSpanGamut(mx[1])}</h1>`);
        });
        text = text.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, (wholeMatch, ...mx: string[]) => {
            return Showdown.hashBlock(`<h2>${Showdown._RunSpanGamut(mx[1])}</h2>`);
        });
        text = text.replace(
            /^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,
            (wholeMatch, ...mx: string[]) => {
                const hLevel = mx[1].length;
                return Showdown.hashBlock(
                    `<h${hLevel}>${Showdown._RunSpanGamut(mx[2])}</h${hLevel}>`,
                );
            },
        );
        return text;
    }

    private static _DoLists(text: string): string {
        text = `${text}~0`;
        let wholeList = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
        if (Showdown.gListLevel) {
            text = text.replace(wholeList, (wholeMatch, ...mx: string[]) => {
                let list = mx[1];
                const listType = mx[2].search(/[*+-]/g) > -1 ? "ul" : "ol";
                list = list.replace(/\n{2,}/g, "\n\n\n");
                let result = Showdown._ProcessListItems(list);
                result = result.replace(/\s+$/, "");
                result = `<${listType}>${result}</${listType}>\n`;
                return result;
            });
        } else {
            wholeList = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
            text = text.replace(wholeList, (wholeMatch, ...mx: string[]) => {
                const runup = mx[1];
                let list = mx[2];
                const listType = mx[3].search(/[*+-]/g) > -1 ? "ul" : "ol";
                list = list.replace(/\n{2,}/g, "\n\n\n");
                let result: string = Showdown._ProcessListItems(list);
                result = `${runup}<${listType}>\n${result}</${listType}>\n`;
                return result;
            });
        }
        text = text.replace(/~0/, "");
        return text;
    }

    private static _DoTables(text: string): string {
        text = text.replace(/(?:\|(?:[^\|\r\n]+\|)+\n)+/gm, (wholeMatch) => {
            return `<table>${Showdown._DoTableRows(wholeMatch)}</table>`;
        });
        return text;
    }

    private static _DoTableRows(text: string): string {
        text = text.replace(/\|((?:[^\|\r\n]+\|)+)\n/gm, (wholeMatch, g1: string) => {
            return `<tr>${Showdown._DoTableCells(g1)}</tr>`;
        });
        return text;
    }

    private static _DoTableCells(text: string): string {
        text = text.replace(/([^\|\r\n]+)\|/gm, (wholeMatch, g1: string) => {
            return `<td>${Showdown._RunSpanGamut(g1)}</td>`;
        });
        return text;
    }

    private static _ProcessListItems(listStr: string): string {
        Showdown.gListLevel++;
        listStr = listStr.replace(/\n{2,}$/, "\n");
        listStr = `${listStr}~0`;
        listStr = listStr.replace(
            /(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
            (wholeMatch, ...mx: string[]) => {
                let item = mx[4];
                const leadingLine = mx[1];
                if (leadingLine || item.search(/\n{2,}/) > -1) {
                    item = Showdown._RunBlockGamut(Showdown._Outdent(item));
                } else {
                    item = Showdown._DoLists(Showdown._Outdent(item));
                    item = item.replace(/\n$/, "");
                    item = Showdown._RunSpanGamut(item);
                }
                return `<li>${item}</li>\n`;
            },
        );
        listStr = listStr.replace(/~0/g, "");
        Showdown.gListLevel--;
        return listStr;
    }

    private static _DoCodeBlocks(text: string): string {
        text = `${text}~0`;
        text = text.replace(
            /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,
            (wholeMatch, ...mx: string[]) => {
                let codeblock = mx[1];
                const nextChar = mx[2];
                codeblock = Showdown._EncodeCode(Showdown._Outdent(codeblock));
                codeblock = Showdown._Detab(codeblock);
                codeblock = codeblock.replace(/^\n+/g, "");
                codeblock = codeblock.replace(/\n+$/g, "");
                codeblock = `<p>${codeblock}\n</p>`;
                return Showdown.hashBlock(codeblock) + nextChar;
            },
        );
        text = text.replace(/~0/, "");
        return text;
    }

    private static hashBlock(text: string): string {
        text = text.replace(/(^\n+|\n+$)/g, "");
        return `\n\n~K${Showdown.gHtmlBlocks.push(text) - 1}K\n\n`;
    }

    private static _DoCodeSpans(text: string): string {
        text = text.replace(
            /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
            (wholeMatch, ...mx: string[]) => {
                let c = mx[3];
                c = c.replace(/^([ \t]*)/g, "");
                c = c.replace(/[ \t]*$/g, "");
                c = Showdown._EncodeCode(c);
                return `${mx[1]}<code>${c}</code>`;
            },
        );
        return text;
    }

    private static _EncodeCode(text: string): string {
        text = text.replace(/&/g, "&amp;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");
        text = Showdown.escapeCharacters(text, "*_{}[]\\", false);
        return text;
    }

    private static _DoItalicsAndBold(text: string): string {
        text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<b>$2</b>");
        text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<i>$2</i>");
        return text;
    }

    private static _DoBlockQuotes(text: string): string {
        text = text.replace(
            /((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,
            (wholeMatch, ...mx: string[]) => {
                let bq = mx[1];
                bq = bq.replace(/^[ \t]*>[ \t]?/gm, "~0");
                bq = bq.replace(/~0/g, "");
                bq = bq.replace(/^[ \t]+$/gm, "");
                bq = Showdown._RunBlockGamut(bq);
                bq = bq.replace(/(^|\n)/g, "$1  ");
                bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, (wholeMatch_, mm1: string) => {
                    let pre = mm1;
                    pre = pre.replace(/^  /gm, "~0");
                    pre = pre.replace(/~0/g, "");
                    return pre;
                });
                return Showdown.hashBlock(`<blockquote>\n${bq}\n</blockquote>`);
            },
        );
        return text;
    }

    private static _FormParagraphs(text: string): string {
        let i = NaN;
        let str: string;
        let firstGroup;
        let blockText;
        text = text.replace(/^\n+/g, "");
        text = text.replace(/\n+$/g, "");
        const grafs = text.split(/\n{2,}/g);
        const grafsOut = [];
        let end = grafs.length;
        for (i = 0; i < end; i++) {
            str = grafs[i];
            if (str.search(/~K(\d+)K/g) >= 0) {
                grafsOut.push(str);
            } else if (str.search(/\S/) >= 0) {
                str = Showdown._RunSpanGamut(str);
                str = str.replace(/^([ \t]*)/g, "<p>");
                str = `${str}</p>`;
                grafsOut.push(str);
            }
        }
        end = grafsOut.length;
        for (i = 0; i < end; i++) {
            while (grafsOut[i].search(/~K(\d+)K/) >= 0) {
                firstGroup = /~K(\d+)K/.exec(grafsOut[i])![1];
                blockText = Showdown.gHtmlBlocks[parseInt(firstGroup, 10)];
                blockText = blockText.replace(/\$/g, "$$$$");
                grafsOut[i] = grafsOut[i].replace(/~K\d+K/, blockText);
            }
        }
        return grafsOut.join("\n\n");
    }

    private static _EncodeAmpsAndAngles(text: string): string {
        text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
        text = text.replace(/<(?![a-z\/?\$!])/gi, "&lt;");
        return text;
    }

    private static _EncodeBackslashEscapes(text: string): string {
        text = text.replace(/\\(\\)/g, Showdown.escapeCharactersCallback);
        text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, Showdown.escapeCharactersCallback);
        return text;
    }

    private static _DoAutoLinks(text: string): string {
        text = text.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi, '<a href="$1">$1</a>');
        text = text.replace(
            /<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
            (wholeMatch, ...mx: string[]) => {
                return Showdown._EncodeEmailAddress(Showdown._UnescapeSpecialChars(mx[1]));
            },
        );
        return text;
    }

    private static _EncodeEmailAddress(addr: string): string {
        const char2hex = function (ch: string): string {
            const hexDigits = "0123456789ABCDEF";
            const dec: number = ch.charCodeAt(0);
            return hexDigits.charAt(dec >> 4) + hexDigits.charAt(dec & 15);
        };
        const encode = [
            function (ch: string): string {
                return `&#${ch.charCodeAt(0)};`;
            },
            function (ch: string): string {
                return `&#x${char2hex(ch)};`;
            },
            function (ch: string): string {
                return ch;
            },
        ];
        addr = `mailto:${addr}`;
        addr = addr.replace(/./g, (ch) => {
            let r: number;
            if (ch == "@") {
                ch = encode[Math.floor(Math.random() * 2)](ch);
            } else if (ch != ":") {
                r = Math.random();
                ch = r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch);
            }
            return ch;
        });
        addr = `<a href="${addr}">${addr}</a>`;
        addr = addr.replace(/">.+:/g, '">');
        return addr;
    }

    private static _UnescapeSpecialChars(text: string): string {
        text = text.replace(/~E(\d+)E/g, (wholeMatch, ...mx: string[]) => {
            const charCodeToReplace = +mx[1];
            return String.fromCharCode(charCodeToReplace);
        });
        return text;
    }

    private static _Outdent(text: string): string {
        text = text.replace(/^(\t|[ ]{1,4})/gm, "~0");
        text = text.replace(/~0/g, "");
        return text;
    }

    private static _Detab(text: string): string {
        text = text.replace(/\t(?=\t)/g, "    ");
        text = text.replace(/\t/g, "~A~B");
        text = text.replace(/~B(.+?)~A/g, (wholeMatch, ...mx: string[]) => {
            let leadingText = mx[1];
            const numSpaces = 4 - (leadingText.length % 4);
            for (let i = 0; i < numSpaces; leadingText = `${leadingText} `, i++) {}
            return leadingText;
        });
        text = text.replace(/~A/g, "    ");
        text = text.replace(/~B/g, "");
        return text;
    }

    private static escapeCharacters(
        text: string,
        charsToEscape: string,
        afterBackslash = false,
    ): string {
        let regexString = `([${charsToEscape.replace(/([\[\]\\])/g, "\\$1")}])`;
        if (afterBackslash) {
            regexString = `\\\\${regexString}`;
        }
        const regex = new RegExp(regexString, "g");
        text = text.replace(regex, Showdown.escapeCharactersCallback);
        return text;
    }

    private static escapeCharactersCallback(whole: string, ...mx: string[]) {
        return `~E${mx[1].charCodeAt(0)}E`;
    }
}
