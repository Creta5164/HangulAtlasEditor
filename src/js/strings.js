const Strings = {
    
    UI: {
        TITLE: "한글 조합형 아틀라스 에디터",
        TEXTURE_SIZE: "텍스쳐 크기",
        OFFSETS: "조합형한글 스프라이트 글자 오프셋",
        ADVANCE: "조합형한글 가로 크기",
        
        GENERATE_BUTTON: "합치기!",
        DOWNLOAD_ZIP: "zip파일로 다운로드"
    },
    
    READY: `
        준비 완료!<br>
        첫번째 첨부파일에 도깨비한글 스프라이트 이미지를,<br>
        두번째 첨부파일에 fnt와 png 텍스쳐 시트를 한번에 선택해주세요.<br>
        도깨비한글 스프라이트의 크기는 가로 세로가 30x18칸으로 정확히 나눌 수 있어야 합니다.<br>
        글자표는 아래에서 확인하실 수 있습니다.<br>
        <a target="_blank" href="./img/2x8x4x4.png">도깨비한글 표 이미지</a>
        <a target="_blank" href="./img/2x8x4x4.png"></a>
    `,
    
    NOT_SUPPORTED_BROWSER: "미지원 브라우저입니다.",
    NOT_SELECTED_DKB: "도깨비한글 텍스쳐를 선택해주세요!",
    NOT_VALID_FNT: "fnt파일과 png파일들을 한번에 선택해주세요!",
    
    HAE: {
        
        FAILED_TO_LOAD_DEPENDENCIES: "하나 이상의 종속성 패키지를 불러오지 못했습니다.",
        DKB_TEXTURE_SIZE_NOT_MATCH: "도깨비한글 텍스쳐의 크기가 30 x 18로 정확히 나눠지지 않습니다.\n글자의 칸을 30 x 18만큼 균일하게 맞춰주세요!",
        NOT_VALID_FNT: "올바르지 않은 fnt 파일입니다.\n현재는 xml 타입만 사용할 수 있습니다.",
        REQUIRED_ASSETS_NOT_LOADED: "합치는 데 필요한 모든 에셋을 추가하세요."
    },
    
    GENERATE_BEGIN: "병합작업 시작",
    GENERATE_PROGRESS: "병합하는 중...",
    GENERATE_PAGES: "현재 페이지",
    GENERATE_PROCESSING_GLYPH: "처리중인 글자",
    GENERATE_ERROR: "병합작업을 진행하는 도중 문제가 발생했습니다.",
    GENERATE_ERROR_ADDITIONAL: "자세한 정보는 개발자 콘솔에서 확인하실 수 있습니다.",
    
    GENERATE_ZIPPING: "파일로 압축하는 중...",
    GENERATE_FAILED_ZIP: "압축파일을 만드는 도중, 문제가 발생했습니다.",
    GENERATE_DONE: `
        fnt 파일에 도깨비한글 스프라이트를 병합했습니다!<br>
        "zip파일로 다운로드" 버튼을 클릭해서 fnt 파일과 스프라이트 시트 파일들을 한번에 받을 수 있습니다.
    `,
    
    PIXI_PARAGRAPH: "다람쥐 헌 쳇바퀴에 타고파\nThe quick brown fox jumps over the lazy dog."
};