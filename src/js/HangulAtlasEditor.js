/*
    This source code is depends on parse-bmfont-xml.
*/
const BMFont_ParseXml = require('parse-bmfont-xml');

let HangulAtlasEditor = function() { HangulAtlasEditor.Initialize(); };

window.addEventListener('load', HangulAtlasEditor.bind(HangulAtlasEditor) );

HangulAtlasEditor.AlphabetType = {
    None:      -1,
    Consonant:  0,
    Vowel:      1
};

HangulAtlasEditor.UNICODE_CONSONANTS = "ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
HangulAtlasEditor.UNICODE_VOWELS     = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";

HangulAtlasEditor.UNICODE_ALPHABETS = HangulAtlasEditor.UNICODE_CONSONANTS + HangulAtlasEditor.UNICODE_VOWELS;
HangulAtlasEditor.UNICODE_ALPHABET_START = 0x3131;
HangulAtlasEditor.UNICODE_ALPHABET_END   = 0x318F;

HangulAtlasEditor.UNICODE_START          = 0xAC00;
HangulAtlasEditor.UNICODE_END            = 0xD7A3;

HangulAtlasEditor.UNICODE_HEAD_RANGE     = 0x024C;
HangulAtlasEditor.UNICODE_HEADS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";

HangulAtlasEditor.UNICODE_BODY_RANGE     = 0x001C;
HangulAtlasEditor.UNICODE_BODIES = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";

HangulAtlasEditor.UNICODE_TAILS = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

HangulAtlasEditor.DKB_HORIZONTAL_LINE = 30;
HangulAtlasEditor.DKB_VERTICAL_LINE   = 18;

HangulAtlasEditor.DKB_TABLE = {
    
    ALPHABET: {
        LINE_OFFSET: 0,
        CHARSET: [
            HangulAtlasEditor.UNICODE_CONSONANTS,
            HangulAtlasEditor.UNICODE_VOWELS
        ]
    },
    
    WITHOUT_TAIL: {
        
        HEAD: {
            LINE_OFFSET: 2,
            CHARSET: [
                "ㅏㅐㅑㅒㅓㅔㅕㅖㅣ",
                "ㅗㅛㅡ",
                "ㅜㅠ",
                "ㅘㅙㅚㅢ",
                "ㅝㅞㅟ"
            ]
        },
        
        BODY: {
            LINE_OFFSET: 10,
            CHARSET: [
                "ㄱㅋ",
                "ㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅌㅍㅎ"
            ]
        }
    },
    
    WITH_TAIL: {
        
        HEAD: {
            LINE_OFFSET: 7,
            CHARSET: [
                "ㅏㅐㅑㅒㅓㅔㅕㅖㅣ",
                "ㅗㅛㅜㅠㅡ",
                "ㅘㅙㅚㅢㅝㅞㅟ"
            ]
        },
        
        BODY: {
            LINE_OFFSET: 12,
            CHARSET: [
                "ㄱㅋ",
                "ㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅌㅍㅎ"
            ]
        },
        
        TAIL: {
            LINE_OFFSET: 14,
            CHARSET: [
                "ㅏㅑㅘ",
                "ㅓㅕㅚㅝㅟㅢㅣ",
                "ㅐㅒㅔㅖㅙㅞ",
                "ㅗㅛㅜㅠㅡ"
            ]
        }
    }
};

HangulAtlasEditor.Initialize = function(timeout) {
    
    if (typeof PIXI === 'undefined' ||
        typeof Rect === 'undefined' ||
        typeof Node === 'undefined') {
        
        alert(Strings.HAE.FAILED_TO_LOAD_DEPENDENCIES);
        return;
    }
    
    this.DKBTexture         = null;
    this.DKBHorizontalUnit  = 0;
    this.DKBVerticalUnit    = 0;
    this.IsDKBTextureLoaded = false;
    
    this.FntAtlasTextures = null;
    this.IsFntAtlasTexturesLoaded = false;
    
    this.FntData = null;
    this.IsFntDataLoaded = false;
    
    this.Views = {};
    this.Views.FontAtlasPreview = null;
};

HangulAtlasEditor.GetGlyph = function(glyph) {
    
    var code = glyph.charCodeAt(0);
    
    if (code <= this.UNICODE_END) {
        
        var bulset = HangulAtlasEditor.DKB_TABLE.ALPHABET.CHARSET;
        
        if ((head = bulset[0].indexOf(glyph)) !== -1 ||
            (head = bulset[1].indexOf(glyph)) !== -1)
            return [head];
    }
    
    code -= this.UNICODE_START;
    
    var head = Math.floor(code / (this.UNICODE_HEAD_RANGE));
    var body = Math.floor(code / (this.UNICODE_BODY_RANGE) % HangulAtlasEditor.UNICODE_BODIES.length);
    var tail = code % this.UNICODE_BODY_RANGE;
    
    if (tail === 0)
        return [head, body];
    
    tail -= 1;
    
    return [head, body, tail];
};

HangulAtlasEditor.GetGlyphString = function(glyph) {
    
    return this.ToGlyphString(this.GetGlyph(glyph));
};

HangulAtlasEditor.ToGlyphString = function(glyph) {
    
    if (glyph.length === 1)
        return [
            this.UNICODE_ALPHABETS.charAt(glyph[0])
        ];
    
    if (glyph.length === 2)
        return [
            this.UNICODE_HEADS.charAt(glyph[0]),
            this.UNICODE_BODIES.charAt(glyph[1])
        ];
    
    else if (glyph.length === 3)
        return [
            this.UNICODE_HEADS.charAt(glyph[0]),
            this.UNICODE_BODIES.charAt(glyph[1]),
            this.UNICODE_TAILS.charAt(glyph[2])
        ];
};

HangulAtlasEditor.ClearFntAtlasTexture = function() {
    
    this.FntAtlasTextures = null;
    this.IsFntAtlasTexturesLoaded = false;
};

HangulAtlasEditor.AddFntAtlasTexture = function(pageKey, image) {
    
    if (!image || image.src === '' || image.width === 0 || image.height === 0)
        return;
    
    this.FntAtlasTextures = this.FntAtlasTextures || {};
    this.FntAtlasTextures[pageKey] = image;
    
    this.IsFntAtlasTexturesLoaded = true;
};

HangulAtlasEditor.LoadFntXml = function(data) {
    
    try {
        
        this.FntData = BMFont_ParseXml(data);
        
    } catch (e) {
        
        alert(Strings.HAE.NOT_VALID_FNT);
        return;
    }
    
    this.IsFntDataLoaded = true;
};

HangulAtlasEditor.SetDKBAtlasTexture = function(image) {
    
    if (!image || image.src === '' || image.width === 0 || image.height === 0)
        return;
    
    if (image.width % this.DKB_HORIZONTAL_LINE !== 0 ||
        image.height % this.DKB_VERTICAL_LINE !== 0) {
        
        alert(Strings.HAE.DKB_TEXTURE_SIZE_NOT_MATCH);
        return;
    }
    
    this.DKBTexture = image;
    this.DKBHorizontalUnit = image.width  / this.DKB_HORIZONTAL_LINE;
    this.DKBVerticalUnit   = image.height / this.DKB_VERTICAL_LINE;
    
    this.IsDKBTextureLoaded = true;
};

HangulAtlasEditor.DrawGlyph = function(x, y, glyph) {
    
    if (!this.IsDKBTextureLoaded)
        return;
    
    glyph = this.GetGlyph(glyph);
    var glyphString = this.ToGlyphString(glyph);
    
    var atlasData = this.GetDKBAtlasData(glyph, glyphString);
    var context = this.Views.FontAtlasPreview.Context;
    
    for (var offset of atlasData) {
        
        context.drawImage(
            
            //Source
            this.DKBTexture,
            
            //Column, Row
            this.DKBHorizontalUnit * offset[1], this.DKBVerticalUnit * offset[0],
            this.DKBHorizontalUnit,             this.DKBVerticalUnit,
            
            //Destination coordinate
            x, y, this.DKBHorizontalUnit, this.DKBVerticalUnit
        );
    }
};

HangulAtlasEditor.GetDKBAtlasData = function(glyphData, glyphStringData) {
    
    var head, body, tail;
    
    switch (glyphData.length) {
        
        case 1:
        
            //자음, 모음만 있는 경우
            
            head = this.GetDKBLine(this.DKB_TABLE.ALPHABET, glyphStringData[0]);
            
            return [[head, glyphData[0]]];
        
        case 2:
        
            //받침 종성이 없는 경우
            
            head = this.GetDKBLine(this.DKB_TABLE.WITHOUT_TAIL.HEAD, glyphStringData[1]);
            body = this.GetDKBLine(this.DKB_TABLE.WITHOUT_TAIL.BODY, glyphStringData[0]);
            
            return [[head, glyphData[0]], [body, glyphData[1]]];
            
        case 3:
        
            //받침 종성이 있는 경우
            
            head = this.GetDKBLine(this.DKB_TABLE.WITH_TAIL.HEAD, glyphStringData[1]);
            body = this.GetDKBLine(this.DKB_TABLE.WITH_TAIL.BODY, glyphStringData[0]);
            tail = this.GetDKBLine(this.DKB_TABLE.WITH_TAIL.TAIL, glyphStringData[1]);
            
            return [[head, glyphData[0]], [body, glyphData[1]], [tail, glyphData[2]]];
        
        default: return null;
    }
};

HangulAtlasEditor.GetDKBLine = function(bulset, glyphPart) {
    
    var charset = bulset.CHARSET;
    var index;
    
    for (index = 0; index < charset.length; index++) {
        
        if (charset[index].indexOf(glyphPart) !== -1) {
            
            index += bulset.LINE_OFFSET;
            break;
        }
    }
    
    return index;
};

HangulAtlasEditor.GenerateFnt = function(sizeLevel) {
    
    if (!HangulAtlasEditor.IsDKBTextureLoaded ||
        !HangulAtlasEditor.IsFntAtlasTexturesLoaded ||
        !HangulAtlasEditor.IsFntDataLoaded) {
        
        alert(Strings.HAE.REQUIRED_ASSETS_NOT_LOADED);
        return;
    }
    
    if (typeof sizeLevel === 'undefined')
        sizeLevel = 2;
    
    else if (typeof sizeLevel === 'string')
        sizeLevel = parseInt(sizeLevel);
    
    sizeLevel += 8;
    
    if (sizeLevel < 7)
        sizeLevel = 7;
    
    if (sizeLevel > 13)
        sizeLevel = 13;
    
    sizeLevel = Math.pow(2, sizeLevel);
    
    var view = this.Views.FontAtlasPreview;
    
    if (view)
        document.body.removeChild(view.Element)
    
    var chars    = this.FntData.chars;
    var common   = this.FntData.common;
    var info     = this.FntData.info;
    var kernings = this.FntData.info;
    var pages    = this.FntData.pages;
    
    //padding order is clockwise from top. [up, right, down, left]
    var fullSpaceWidth  = info.padding[1] + info.padding[3] + info.spacing[0];
    var fullSpaceHeight = info.padding[0] + info.padding[2] + info.spacing[1];
    
    var charResult = this.CopyObjectRecursive(chars);
    var pageResult = [];
    
    var result = {
        common: this.CopyObjectRecursive(common),
        info: this.CopyObjectRecursive(info),
        kernings: this.CopyObjectRecursive(kernings)
    };
    
    var currentPage   = new Node(new Rect(0, 0, sizeLevel, sizeLevel));
    var currentCanvas = new CanvasView(sizeLevel, sizeLevel);
    var currentPageIndex = 0;
    
    var charInfo;
    var charInfoResult;
    var charCode;
    var alphabetType;
    var insertedRect;
    //for (var char of chars) {
    
    var drawInfo = null;
    
    for (var i = 0; i < chars.length; i++) {
        
        if (!drawInfo) {
            
            charInfo       = chars[i];
            charInfoResult = charResult[i];
            
            charCode = charInfo.id;
            
            if (charCode >= this.UNICODE_ALPHABET_START &&
                charCode <= this.UNICODE_ALPHABET_END &&
                (alphabetType = this.GetAlphabetType(charCode)) !== this.AlphabetType.None) {
                
                
            }
            
            else if (charCode >= this.UNICODE_START &&
                    charCode <= this.UNICODE_END) {
                
                
                drawInfo = {
                    x: charInfo.x,
                    y: charInfo.y,
                    width:  charInfo.width,
                    height: charInfo.height,
                    
                    texture: this.FntAtlasTextures[pages[charInfo.page]]
                };
                
                
            } else {
                
                drawInfo = {
                    x: charInfo.x,
                    y: charInfo.y,
                    
                    width:  charInfo.width,
                    height: charInfo.height,
                    
                    texture: this.FntAtlasTextures[pages[charInfo.page]]
                };
            }
        }
        
        insertedRect = currentPage.insert_rect(
            new Rect(
                0, 0,
                drawInfo.width  + fullSpaceWidth,
                drawInfo.height + fullSpaceHeight
            )
        );
        
        if (insertedRect) {
            
            insertedRect = insertedRect.rect;
            
            currentCanvas.Context.drawImage(
                
                //Source
                drawInfo.texture,
                
                //source x, y, width, height
                drawInfo.x,     drawInfo.y,
                drawInfo.width, drawInfo.height,
                
                //Destination coordinate
                info.padding[0] + insertedRect.x,
                info.padding[3] + insertedRect.y,
                drawInfo.width, drawInfo.height
            );
            
            charInfoResult.x      = insertedRect.x;
            charInfoResult.y      = insertedRect.y;
            charInfoResult.width  = insertedRect.w;
            charInfoResult.height = insertedRect.h;
            charInfoResult.page   = currentPageIndex;
            
            drawInfo = null;
            
        } else {
            
            //새 페이지 만들기
            pageResult.push[{ page: currentPage, texture: currentCanvas }];
            currentPage   = new Node(new Rect(0, 0, sizeLevel, sizeLevel));
            currentCanvas = new CanvasView(sizeLevel, sizeLevel);
            currentPageIndex++;
            i--;
        }
    }
    
    pageResult.push[{ page: currentPage, texture: currentCanvas }];
    
    document.body.appendChild(currentCanvas.Element);
};

HangulAtlasEditor.GetAlphabetType = function(code) {
    
    code = String.fromCharCode(code);
    
    if (this.UNICODE_CONSONANTS.indexOf(code) !== -1)
        return this.AlphabetType.Consonant;
    
    else if (this.UNICODE_VOWELS.indexOf(code) !== -1)
        return this.AlphabetType.Vowel;
    
    return this.AlphabetType.None;
};

/*
ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ
ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ
*/

HangulAtlasEditor.CopyObjectRecursive = function(source) {
    
    var type = typeof source;
    
    var result = source;
    
    if (type === 'object') {
        
        result = Array.isArray(source) ? [] : {};
        
        for (var key in source) {
            
            type = typeof source[key];
            
            if (type === 'object') {
                
                result[key] = this.CopyObjectRecursive(source[key]);
            }
            else
                result[key] = source[key];
        }
    }
    
    return result;
};

function CanvasView(width, height) {
    
    this.Element = document.createElement('canvas');
    this.Context = this.Element.getContext('2d');
    
    this.Element.width  = width  || 512;
    this.Element.height = height || 512;
};