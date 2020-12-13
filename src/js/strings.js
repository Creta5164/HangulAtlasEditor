const Strings = {
    
    HEADERS: {
        
        "Main": "한글 도해집 병합 도구",
        "About": "이게 뭔가요?"
    },
    
    ABOUT: {
        
        "Title": "한글 도해집 병합 도구",
        "Description":
           `*.fnt 폰트 아틀라스에서 한글을 찾아내어
            한글만 도깨비한글 조합식 그래픽으로 모두 바꿔 합치는 도구입니다.<br>
            `,
        "ReasonTitle": "만들게 된 이유",
        "Reason":
           `팀에서 게임을 만들던 중, 글꼴 라이센스와 관련해서 여러가지 자료를 조사했습니다.<br>
            작게 만들면 도트로써 이쁘게 보이는 폰트의 라이센스가 복잡하다는 걸 깨닫고,
            다른 폰트를 찾기 시작했죠.<br>
            그러나 대부분의 한글 도트 폰트는 찾기 어려웠고,
            찾았던 것도 분위기에 어울리지 않는 상황이였습니다.<br>
            그러면서 직박구루(ZIK)님의
            <a target="_blank" href="https://github.com/TandyRum1024/hangul-johab-render-gms">
                조합형한글 도구
            </a>를 보고...<br><br>
            이것을 fnt 아틀라스에 합쳐 쓰면 더 많은 곳에서 쓸 수 있지 않을까?<br><br>
            하는 마음에 여러방면에서 쉽게 쓸 수 있는 도구를 만들기로 결심했습니다.<br>
            모두가 쉽게 한글을 꾸며 쓸 수 있었으면 좋겠다는 바램입니다.<br>
            그런 바램으로 폰트를 직접 써볼 수 있도록 미리보기 기능까지 열심히 만들었죠.<br><br>
            많은 분들이 이쁜 폰트를 만들 수 있었으면 좋겠네요...<br><br>`,
        "DepedenciesTitle": "사용한 것들",
        "Depedencies":
           `<ul>
                <li>
                    <a target="_blank" href="https://www.pixijs.com">
                        pixi.js (5.2.4)
                    </a><br>
                    폰트 미리보기 기능을 구현하는 데 사용했습니다.
                </li>
                <li>
                    <a target="_blank" href="https://github.com/mattdesl/parse-bmfont-xml">
                        parse-bmfont-xml (1.1.4)
                    </a><br>
                    *.fnt 파일을 파싱해서 데이터를 구하는 데 사용했습니다.
                </li>
                <li>
                    <a target="_blank" href="https://stuk.github.io/jszip">
                        JSZip (1.1.4)
                    </a><br>
                    재조립한 텍스쳐와 fnt 파일을 한번에 받을 수 있도록, 압축파일을 만드는 데 사용했습니다.
                </li>
                <li>
                    <a target="_blank" href="https://github.com/eligrey/FileSaver.js">
                        filesaver.js (1.1.4)
                    </a><br>
                    JSZip으로 만들어진 바이너리 zip 파일을 다운로드 할 수 있도록 만드는 데 사용했습니다.
                </li>
                <li>
                    <a target="_blank" href="https://github.com/enepomnyaschih/byte-base64">
                        byte-base64 (1.1.4)
                    </a><br>
                    재조립한 fnt 파일의 xml 문자열을 pixi.js에 바이너리로 업로드할 수 있도록 만드는 데 사용했습니다.
                </li>
                <li>
                    <a target="_blank" href="https://github.com/mackstann/binpack">
                        binpack
                    </a><br>
                    텍스쳐를 재조립할 때, 남은 공간과 여백을 빼곡하게 채우기 위해 사용했습니다.
                </li>
                <li>
                    <a target="_blank" href="https://github.com/naver/d2codingfont">
                        D2Coding by NAVER
                    </a><br>
                    도깨비한글 스프라이트를 어떻게 그려야 하는 지 정리한 테이블의 이미지에 사용했습니다.<br>
                    ( 2x8x4x4.png 와 2x8x4x4 blank.png )
                </li>
                <li>
                    <a target="_blank" href="https://creft.me/waffle">
                        와플체 by Waffle
                    </a><br>
                    와플님이 8시간에 걸쳐 완성한 한글 도해집 병합 도구용 도깨비한글 스프라이트 조합형 폰트입니다.<br>
                    ( Waffleche.png )
                </li>
                <li>
                    <a target="_blank" href="https://blog.naver.com/mightybeetle">
                        백귀구마록체 by MightyBeetle
                    </a><br>
                    MightyBeetle님이 정성들여 만드신 한글 도해집 병합 도구용 도깨비한글 스프라이트 조합형 폰트입니다.<br>
                    ( Paekgwiche.png )
                </li>
                <li>
                    <a target="_blank" href="https://spoqa.github.io/spoqa-han-sans">
                        Spoqa Han Sans
                    </a><br>
                    이 페이지의 폰트로 사용했습니다.
                </li>
            </ul>
            `
    },
    
    UI: {
        TITLE: "한글 도해집 병합 도구",
        
        DKBFILE: "도깨비한글 스프라이트 (png)",
        FNTFILE: "폰트 아틀라스 파일들 (fnt + png)",
        
        TEXTURE_SIZE: "텍스쳐 크기",
        INCLUDE_MINIMUM_KOREAN_CHARACTERS: "한글 최소 완성형 추가",
        ADDITIONAL_KOREAN_CHARACTERS: "포함할 한글 문자",
        OFFSETS: "조합형한글 스프라이트 글자 오프셋",
        ADVANCE: "조합형한글 가로 크기",
        
        GENERATE_BUTTON: "합치기!",
        DOWNLOAD_ZIP: "zip파일로 다운로드",
        
        HELP: {
            DKBFILE: 
               `조합 가능한 한글 글씨가 그려진 스프라이트 시트를 올려주세요.<br>
                각 칸에 어떤 식으로 글자를 그려야 하는 지 정리된 테이블은 아래의 링크에서 확인할 수 있습니다.<br>
                <a target="_blank" href="./img/2x8x4x4.png">조합 가이드가 적힌 테이블</a><br>
                <a target="_blank" href="./img/2x8x4x4 blank.png">그려야 하는 글자만 적힌 테이블</a><br>
                도깨비한글 스프라이트 샘플<br>
                <a target="_blank" href="./img/Waffleche.png">와플체</a>
                <a target="_blank" href="./img/Paekgwiche.png">백귀구마록체</a><br>
                완성된 스프라이트 이미지의 크기는<strong>가로로 30칸, 세로로 18칸</strong>으로 정확히 나눌 수 있어야 합니다.`,
            FNTFILE:
               `사용하고 싶은 글자(한글, 영어, 특수문자 등)를 포함한 폰트 아틀라스 파일을 올려주세요.<br>
                포함된 한글만 도깨비한글 스프라이트로 대체됩니다.<br>
                윈도우에는<a target="_blank" href="https://www.angelcode.com/products/bmfont">BMFont</a>를,
                맥에서는 <a target="_blank" href="https://www.bmglyph.com/">bmGlyph</a>를 사용해서 만들 수 있습니다.<br>
                반드시 fnt와 같이 만들어진 텍스쳐 파일을 한번에 선택해주세요!<br>
                xml 형식의 fnt 파일과 png 텍스쳐만 지원합니다.`,
            
            TEXTURE_SIZE:
                `합쳐질 텍스쳐의 가로, 세로 크기를 지정합니다.`,
            
            INCLUDE_MINIMUM_KOREAN_CHARACTERS:
                `fnt 파일에 한글이 없어도 한글 자모를 포함해 최소 완성형 문자들을 추가합니다.`,
            
            ADDITIONAL_KOREAN_CHARACTERS:
                `fnt에 한글 문자를 직접 써서 추가할 수 있습니다.`,
            
            OFFSETS: 
               `도깨비한글 스프라이트 글자가 <strong>화면에 그려질 위치에서 얼마나 움직인 후에 그리게 할 지 지정</strong>합니다.<br>
                이걸 이용해서 폰트의 밑줄 중심점과 도깨비한글 스프라이트에서 왼쪽의 공백을 맞출 수도 있습니다.`,
            ADVANCE:
               `도깨비한글 스프라이트 글자가 화면에 그려진 후, 다음 글자와의 간격을 지정합니다.<br>
                기본값은 도깨비한글 스프라이트의 한 칸 너비만큼의 픽셀입니다.`,
            
            GENERATE_BUTTON: "합치기!",
            DOWNLOAD_ZIP: "zip파일로 다운로드"
        }
    },
    
    READY: `
        준비 완료!<br><br>
        첫번째 첨부파일에 도깨비한글 스프라이트 이미지를,<br>
        두번째 첨부파일에 fnt와 png 텍스쳐 시트를 한번에 선택해주세요.<br>
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
        "zip파일로 다운로드" 버튼을 클릭해서 fnt 파일과 스프라이트 시트 파일들을 한번에 받을 수 있습니다.<br><br>
        아래의 입력칸에서 직접 만든 폰트들을 확인해보세요.<br>
        수정해야 할 부분이 보인다면, 도깨비한글 스프라이트만 다시 올려 합치기 하는 것으로 고친 결과물을 바로 볼 수 있습니다!
    `,
    
    PIXI_PARAGRAPH: `다람쥐 헌 쳇바퀴에 타고파
The quick brown fox jumps over the lazy dog.
ABCabc가나다각난닫ㄱㄴㄷ다댜더뎌ㅏㅑㅓㅕ`
};