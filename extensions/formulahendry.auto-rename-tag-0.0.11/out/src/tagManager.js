'use strict';
const vscode = require('vscode');
const tagParser_1 = require('./tagParser');
class TagManager {
    run() {
        vscode.window.onDidChangeActiveTextEditor(event => {
            this.getCurrentWordForNewActiveTextEditor(event);
        });
        vscode.window.onDidChangeTextEditorSelection(event => {
            this.getCurrentWord(event);
        });
        vscode.workspace.onDidChangeTextDocument(event => {
            this.updatePairedTag(event);
        });
    }
    getCurrentWordForNewActiveTextEditor(editor) {
        if (!editor) {
            return;
        }
        let document = editor.document;
        let selection = editor.selection;
        let word = this.getWordAtPosition(document, selection.active);
        this._word = word;
    }
    getCurrentWord(event) {
        let selection = event.selections[0];
        let document = event.textEditor.document;
        let word = this.getWordAtPosition(document, selection.active);
        this._word = word;
    }
    getWordAtPosition(document, position) {
        let textLine = document.lineAt(position);
        let text = textLine.text;
        let regex = /[<\/]([a-zA-Z][a-zA-Z0-9-_:.]*)?[\s>]/g;
        let result = null;
        let character = position.character;
        while ((result = regex.exec(text)) !== null) {
            if (!result[1]) {
                if (result.index + 1 === character) {
                    return "";
                }
            }
            else {
                if (result.index + 1 <= character && character <= result.index + 1 + result[1].length) {
                    return result[1];
                }
            }
        }
        return null;
    }
    isEnabled() {
        let languageId = vscode.window.activeTextEditor.document.languageId;
        let config = vscode.workspace.getConfiguration('auto-rename-tag');
        let languages = config.get("activationOnLanguage", ["*"]);
        if (languages.indexOf("*") === -1 && languages.lastIndexOf(languageId) === -1) {
            return false;
        }
        else {
            return true;
        }
    }
    updatePairedTag(event) {
        if (!this.isEnabled() || /\r|\n/.test(event.contentChanges[0].text) || !event.contentChanges[0].range.isSingleLine) {
            return;
        }
        let editor = vscode.window.activeTextEditor;
        let document = editor.document;
        let selection = editor.selection;
        let cursorPositon = selection.active;
        let rangeStart = event.contentChanges[0].range.start;
        let rangeEnd = event.contentChanges[0].range.end;
        if (!rangeStart.isEqual(rangeEnd)) {
            // Handle deletion or update of multi-character
            if (rangeStart.isBefore(rangeEnd)) {
                cursorPositon = rangeStart;
            }
            else {
                cursorPositon = rangeEnd;
            }
        }
        let newTag = this.getNewWord(document, cursorPositon);
        if (newTag === null) {
            return;
        }
        this.findAndReplacePairedTag(document, editor, cursorPositon, newTag);
    }
    getNewWord(document, cursorPositon) {
        let textLine = document.lineAt(cursorPositon);
        let text = textLine.text;
        let regex = /<(\/?)([a-zA-Z][a-zA-Z0-9-_:.]*)?(?:\s[^\s<>]*?[^\s/<>]+?)*?>/g;
        let result = null;
        let character = cursorPositon.character;
        while ((result = regex.exec(text)) !== null) {
            let isStartTag = result[1] === "";
            let offset = isStartTag ? 1 : 2;
            let index = result.index + offset;
            if (!result[2]) {
                if (index === character) {
                    return { word: "", isStartTag: isStartTag };
                }
            }
            else {
                if (index <= character && character <= index + result[2].length) {
                    return { word: result[2], isStartTag: isStartTag };
                }
            }
        }
        return null;
    }
    findAndReplacePairedTag(document, editor, cursorPositon, newTag) {
        let startTag;
        let endTag;
        if (this._word === newTag.word || this._word === null) {
            return;
        }
        if (newTag.isStartTag) {
            startTag = newTag.word;
            endTag = this._word;
        }
        else {
            startTag = this._word;
            endTag = newTag.word;
        }
        let emptyTagOffset = null;
        if (newTag.word === "") {
            emptyTagOffset = document.offsetAt(cursorPositon);
        }
        else if (this._word == "") {
            emptyTagOffset = this._emptyTagOffset;
            if (newTag.isStartTag) {
                emptyTagOffset += newTag.word.length;
            }
        }
        let pairedTag = tagParser_1.findPairedTag(document.getText(), document.offsetAt(cursorPositon), startTag, endTag, newTag.isStartTag, emptyTagOffset);
        if (!pairedTag) {
            return;
        }
        if (startTag === "" && newTag.isStartTag) {
            pairedTag.startOffset -= tagParser_1.emptyTagName.length;
            pairedTag.endOffset -= tagParser_1.emptyTagName.length;
        }
        if (endTag === "" && newTag.isStartTag) {
            pairedTag.endOffset = pairedTag.startOffset;
        }
        if (startTag === "" && !newTag.isStartTag) {
            pairedTag.endOffset = pairedTag.startOffset;
        }
        editor.edit((editBuilder) => {
            editBuilder.replace(new vscode.Range(document.positionAt(pairedTag.startOffset), document.positionAt(pairedTag.endOffset)), newTag.word);
        });
        if (newTag.word === "") {
            this._word = "";
            this._emptyTagOffset = pairedTag.startOffset;
        }
    }
}
exports.TagManager = TagManager;
//# sourceMappingURL=tagManager.js.map