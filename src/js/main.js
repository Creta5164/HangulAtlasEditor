let HangulAtlasEditor = null;

(function() {
    
    HangulAtlasEditor = function() { HangulAtlasEditor.Initialize(); };
    
    window.addEventListener('load', HangulAtlasEditor.bind(HangulAtlasEditor) );
    
    HangulAtlasEditor.UNICODE_START          = 0xAC00;
    HangulAtlasEditor.UNICODE_CONSTANT_START = 0x3131;
    HangulAtlasEditor.UNICODE_VOWEL_START    = 0x314F;
    
    HangulAtlasEditor.DKB_HORIZONTAL_LINE = 27;
    HangulAtlasEditor.DKB_VERTICAL_LINE   = 16;
    
    HangulAtlasEditor.DKB_TABLE = {
        
        OFFSET: {
            HEAD: 0,
            HEADTAIL: 5,
            BODY: 8,
            BODYTAIL: 10,
            TAIL: 12
        },
        
        CHARSET: [
            "ㅏㅐㅑㅒㅓㅔㅕㅖㅣ",
            "ㅗㅛㅡ",
            "ㅜㅠ",
            "ㅘㅙㅚㅢ",
            "ㅝㅞㅟ",
            
            "ㅏㅐㅑㅒㅓㅔㅕㅖㅣ",
            "ㅗㅛㅜㅠㅡ",
            "ㅘㅙㅚㅢㅝㅞㅟ",
            
            "ㄱㅋ",
            "ㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅌㅍㅎ",
            
            "ㄱㅋ",
            "ㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅌㅍㅎ",
            
            "ㅏㅑㅘ",
            "ㅓㅕㅚㅝㅟㅢㅣ",
            "ㅐㅒㅔㅖㅙㅞ",
            "ㅗㅛㅜㅠㅡ"
        ]
    };
    
    /* HangulAtlasEditor.DKB_HEAD_TABLE = {
        LINE_OFFSET:  0,
        CHARSET: [
            "ㅏㅐㅑㅒㅓㅔㅕㅖㅣ",
            "ㅗㅛㅡ",
            "ㅜㅠ",
            "ㅘㅙㅚㅢ",
            "ㅝㅞㅟ"
        ]
    };
    
    HangulAtlasEditor.DKB_HEADTAIL_TABLE = {
        LINE_OFFSET:  5,
        CHARSET: [
            "ㅏㅐㅑㅒㅓㅔㅕㅖㅣ",
            "ㅗㅛㅜㅠㅡ",
            "ㅘㅙㅚㅢㅝㅞㅟ"
        ]
    };
    
    HangulAtlasEditor.DKB_BODY_TABLE = {
        LINE_OFFSET:  8,
        CHARSET: [
            "ㄱㅋ",
            "ㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅌㅍㅎ"
        ]
    };
    
    HangulAtlasEditor.DKB_BODYTAIL_TABLE = {
        LINE_OFFSET:  10,
        CHARSET: [
            "ㄱㅋ",
            "ㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅌㅍㅎ"
        ]
    };
    
    HangulAtlasEditor.DKB_TAIL_TABLE = {
        LINE_OFFSET:  12,
        CHARSET: [
            "ㅏㅑㅘ",
            "ㅓㅕㅚㅝㅟㅢㅣ",
            "ㅐㅒㅔㅖㅙㅞ",
            "ㅗㅛㅜㅠㅡ"
        ]
    }; */
    
    HangulAtlasEditor.Initialize = function(timeout) {
        
        if (typeof PIXI === 'undefined') {
            
            alert('하나 이상의 종속성 패키지가 준비시간을 초과하여 불러오지 못했습니다.');
            return;
        }
        
        this.Views = {};
        this.Views.FontAtlasPreview = new CanvasView(2048, 2048);
        this.Views.DKBAtlasPreview  = new CanvasView();
        
        //var char, charOffset, result = '';
        //for (var i = 0; i < HangulAtlasEditor.DKB_TABLE.CHARSET.length; i++) {
        //    
        //    char = HangulAtlasEditor.DKB_TABLE.CHARSET[i];
        //    charOffset = char.charCodeAt(0) - 0x314f;
        //    
        //    //for (var j = 0; j < len; j++)
        //    //    result += String.fromCharCode(0xac00 + charOffset) + ' ';
        //    
        //    result += charOffset + ' ';
        //}
        //
        //console.log(result);
    };
    
    HangulAtlasEditor.DrawGlyph = function(target, x, y, glyph) {
        
        var code = glyph.charCodeAt(0) - this.UNICODE_START;
        
        var head = Math.floor(code / (21 * 28)      + this.UNICODE_CONSTANT_START);
        var body = Math.floor(code % (21 * 28) / 28 + this.UNICODE_VOWEL_START);
        var tail = Math.floor(code % (21 * 28) % 28);
        
        console.log(String.fromCharCode(head));
        console.log(String.fromCharCode(body));
        console.log(tail >= 0 ? String.fromCharCode(tail + this.UNICODE_CONSTANT_START) : '-');
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