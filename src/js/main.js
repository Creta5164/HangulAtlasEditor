let HangulAtlasEditor = null;

(function() {
    
    HangulAtlasEditor = function() { HangulAtlasEditor.Initialize(); };
    
    window.addEventListener('load', HangulAtlasEditor.bind(HangulAtlasEditor) );
    
    HangulAtlasEditor.UNICODE_START          = 0xAC00;
    HangulAtlasEditor.UNICODE_CONSTANT_START = 0x3131;
    HangulAtlasEditor.UNICODE_VOWEL_START    = 0x314F;
    
    HangulAtlasEditor.UNICODE_HEAD_RANGE     = 0x024C;
    HangulAtlasEditor.UNICODE_HEADS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
    
    HangulAtlasEditor.UNICODE_BODY_RANGE     = 0x001C;
    HangulAtlasEditor.UNICODE_BODIES = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
    
    HangulAtlasEditor.UNICODE_TAILS = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
    
    HangulAtlasEditor.DKB_HORIZONTAL_LINE = 27;
    HangulAtlasEditor.DKB_VERTICAL_LINE   = 16;
    
    HangulAtlasEditor.DKB_TABLE = {
        
        WITHOUT_TAIL: {
            
            HEAD: {
                LINE_OFFSET: 0,
                CHARSET: [
                    "ㅏㅐㅑㅒㅓㅔㅕㅖㅣ",
                    "ㅗㅛㅡ",
                    "ㅜㅠ",
                    "ㅘㅙㅚㅢ",
                    "ㅝㅞㅟ"
                ]
            },
            
            BODY: {
                LINE_OFFSET: 8,
                CHARSET: [
                    "ㄱㅋ",
                    "ㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅌㅍㅎ"
                ]
            }
        },
        
        WITH_TAIL: {
            
            HEAD: {
                LINE_OFFSET: 5,
                CHARSET: [
                    "ㅏㅐㅑㅒㅓㅔㅕㅖㅣ",
                    "ㅗㅛㅜㅠㅡ",
                    "ㅘㅙㅚㅢㅝㅞㅟ"
                ]
            },
            
            BODY: {
                LINE_OFFSET: 10,
                CHARSET: [
                    "ㄱㅋ",
                    "ㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅌㅍㅎ"
                ]
            },
            
            TAIL: {
                LINE_OFFSET: 12,
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
        
        if (typeof PIXI === 'undefined') {
            
            alert('하나 이상의 종속성 패키지를 불러오지 못했습니다.');
            return;
        }
        
        this.IsDKBSpriteLoaded = false;
        
        this.Views = {};
        this.Views.FontAtlasPreview = new CanvasView(2048, 2048);
        this.Views.DKBAtlasPreview  = new CanvasView(2048, 2048);
    };
    
    HangulAtlasEditor.GetGlyph = function(glyph) {
        
        var code = glyph.charCodeAt(0) - this.UNICODE_START;
        
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
    
    HangulAtlasEditor.DrawGlyph = function(target, x, y, glyph) {
        
        if (!this.IsDKBSpriteLoaded)
            return;
        
        glyph = this.GetGlyph(glyph);
        var glyphString = this.ToGlyphString(glyph);
        
        var atlasData = this.GetDKBAtlasData(glyph, glyphString);
        
        console.log(atlasData);
    };
    
    HangulAtlasEditor.GetDKBAtlasData = function(glyphData, glyphStringData) {
        
        console.log(glyphData);
        console.log(glyphStringData);
        
        var head, body, tail;
        
        if (glyphData.length === 2) {
            
            //받침 종성이 없는 경우
            
            head = this.GetDKBLine(this.DKB_TABLE.WITHOUT_TAIL.HEAD, glyphStringData[1]);
            body = this.GetDKBLine(this.DKB_TABLE.WITHOUT_TAIL.BODY, glyphStringData[0]);
            
            console.log(`${head}:${glyphData[0]} (${glyphStringData[0]}), ${body}:${glyphData[1]} (${glyphStringData[1]})`);
            return [[head, glyphData[0]], [body, glyphData[1]]];
            
        } else if (glyphData.length === 3) {
            
            //받침 종성이 있는 경우
            
            head = this.GetDKBLine(this.DKB_TABLE.WITH_TAIL.HEAD, glyphStringData[1]);
            body = this.GetDKBLine(this.DKB_TABLE.WITH_TAIL.BODY, glyphStringData[0]);
            tail = this.GetDKBLine(this.DKB_TABLE.WITH_TAIL.TAIL, glyphStringData[1]);
            
            console.log(`${head}:${glyphData[0]} (${glyphStringData[0]}), ${body}:${glyphData[1]} (${glyphStringData[1]}), ${tail}:${glyphData[2]} (${glyphStringData[2]})`);
            return [[head, glyphData[0]], [body, glyphData[1]], [tail, glyphData[2]]];
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
    
    HangulAtlasEditor.GenerateFnt = function() {
        
        
    };
    
    function CanvasView(width, height) {
        
        this.Element = document.createElement('canvas');
        this.Context = this.Element.getContext('2d');
        
        this.Element.width  = width  || 512;
        this.Element.height = height || 512;
    };
    
})();