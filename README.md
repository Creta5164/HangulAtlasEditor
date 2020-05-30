# 한글 도해집 병합 도구

`*.fnt` 폰트 아틀라스에서 한글 문자들을 찾아내어
한글만 도깨비한글 조합식 그래픽으로 모두 바꾸는 도구입니다.

## 만들게 된 이유

팀에서 게임을 만들던 중, 글꼴 라이센스와 관련해서 여러가지 자료를 조사했습니다.  
작게 만들면 도트로써 이쁘게 보이는 폰트의 라이센스가 복잡하다는 걸 깨닫고,
다른 폰트를 찾기 시작했죠.  
그러나 대부분의 한글 도트 폰트는 찾기 어려웠고,
찾았던 것도 분위기에 어울리지 않는 상황이였습니다.  
그러면서 직박구루(ZIK)님의
[조합형한글 도구](https://github.com/TandyRum1024/hangul-johab-render-gms)
를 보고...  

> *이것을 fnt 아틀라스에 합쳐 쓰면 더 많은 곳에서 쓸 수 있지 않을까?*

하는 마음에 여러방면에서 쉽게 쓸 수 있는 도구를 만들기로 결심했습니다.  
모두가 쉽게 한글을 꾸며 쓸 수 있었으면 좋겠다는 바램입니다.  
그런 바램으로 폰트를 직접 써볼 수 있도록 미리보기 기능까지 열심히 만들었죠.

많은 분들이 이쁜 폰트를 만들 수 있었으면 좋겠네요...

## 사용한 것들
### - [pixi.js (5.2.4)](https://www.pixijs.com)
> 폰트 미리보기 기능을 구현하는 데 사용했습니다.

### - [parse-bmfont-xml (1.1.4)](https://github.com/mattdesl/parse-bmfont-xml)
> *.fnt 파일을 파싱해서 데이터를 구하는 데 사용했습니다.

### - [JSZip (1.1.4)](https://stuk.github.io/jszip)
> 재조립한 텍스쳐와 fnt 파일을 한번에 받을 수 있도록, 압축파일을 만드는 데 사용했습니다.

### - [filesaver.js (1.1.4)](https://github.com/eligrey/FileSaver.js)
> JSZip으로 만들어진 바이너리 zip 파일을 다운로드 할 수 있도록 만드는 데 사용했습니다.

### - [byte-base64 (1.1.4)](https://github.com/enepomnyaschih/byte-base64)
> 재조립한 fnt 파일의 xml 문자열을 pixi.js에 바이너리로 업로드할 수 있도록 만드는 데 사용했습니다.

### - [binpack](https://github.com/mackstann/binpack)
> 텍스쳐를 재조립할 때, 남은 공간과 여백을 빼곡하게 채우기 위해 사용했습니다.

### - [D2Coding by NAVER](https://github.com/naver/d2codingfont)
> 도깨비한글 스프라이트를 어떻게 그려야 하는 지 정리한 테이블의 이미지에 사용했습니다.  
> ( `2x8x4x4.png` 와 `2x8x4x4 blank.png` )

### - [Spoqa Han Sans](https://spoqa.github.io/spoqa-han-sans)
> 페이지의 폰트로 사용했습니다.