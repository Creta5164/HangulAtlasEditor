/*
    This source code is depends on parse-bmfont-xml.
*/
const parseBmfontXml = require('parse-bmfont-xml');

let HangulAtlasEditor = function() { HangulAtlasEditor.Initialize(); };

window.addEventListener('load', HangulAtlasEditor.bind(HangulAtlasEditor) );

HangulAtlasEditor.AlphabetType = {
    None:      -1,
    Consonant:  0,
    Vowel:      1
};

HangulAtlasEditor.RENDER_SPEED = 16;
HangulAtlasEditor.RENDER_STEP  = 10;

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

HangulAtlasEditor.MINIMUM_KOREAN_COMPLETE_TABLE = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ가각간갇갈갉갊감갑값갓갔강갖갗같갚갛개객갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫났낭낮낯낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫달닭닮닯닳담답닷닸당닺닻닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많맏말맑맒맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바박밖밗반받발밝밞밟밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤샥샨샬샴샵샷샹섀섄섈섐섕서석섞섟선섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄업없엇었엉엊엌엎에엑엔엘엠엡엣엥여역엮연열엶엷염엽엾엿였영옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응읒읓읔읕읖읗의읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝';

HangulAtlasEditor.DUMMY_CHAR_DATA = {
    id       :0,
    x        :0,
    y        :0,
    width    :0,
    height   :0,
    xoffset  :0,
    yoffset  :0,
    xadvance :0,
    page     :0,
    chnl     :15
};

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
    
    if (typeof Rect === 'undefined' ||
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
    
    var head;
    
    if (code <= this.UNICODE_ALPHABET_END) {
        
        if ((head = this.UNICODE_CONSONANTS.indexOf(glyph)) !== -1)
            return [false, head];
        
        if ((head = this.UNICODE_VOWELS.indexOf(glyph)) !== -1)
            return [true, head];
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
    
    if (typeof glyph[0] === 'boolean')
        return [
            glyph[0] ? 
            this.UNICODE_VOWELS.charAt(glyph[1]) :
            this.UNICODE_CONSONANTS.charAt(glyph[1])
        ];
    
    else if (glyph.length === 2)
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
    
    if (!this.FntData) {
        
        this.IsFntAtlasTexturesLoaded = false;
        return;
    }
    
    for (var key of this.FntData.pages)
    if (!(key in this.FntAtlasTextures)) {
        
        this.IsFntAtlasTexturesLoaded = false;
        return;
    }
    
    this.IsFntAtlasTexturesLoaded = true;
    
};

HangulAtlasEditor.LoadFntXml = function(data) {
    
    try {
        
        this.FntData = parseBmfontXml(data);
        
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
        
        case 2:
            
            if (typeof glyphData[0] === 'boolean') {
                
                //자음, 모음만 있는 경우
                
                head = this.GetDKBLine(this.DKB_TABLE.ALPHABET, glyphStringData[0]);
                
                return [[head, glyphData[1]]];
            }
            
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

HangulAtlasEditor.GenerateFnt = function({
        sizeLevel,
        fileName,
        offset,
        xAdvance,
        includeMinimumKoreanCharacters,
        additionalKoreanCharacters,
        progress,
        pageCreated,
        done,
        error
    }) {
    
    if (!HangulAtlasEditor.IsDKBTextureLoaded ||
        !HangulAtlasEditor.IsFntAtlasTexturesLoaded ||
        !HangulAtlasEditor.IsFntDataLoaded) {
        
        alert(Strings.HAE.REQUIRED_ASSETS_NOT_LOADED);
        return false;
    }
    
    try {
    
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
        
        var data = {};
        
        data.events = {
            progress:    progress,
            pageCreated: pageCreated,
            done:        done,
            error:       error
        };
        
        data.sizeLevel = sizeLevel;
        data.fileName  = fileName;
        
        offset = offset || {
            x: 0,
            y: 0
        };
        
        data.offset   = offset;
        data.xAdvance = xAdvance;
        
        data.view = this.Views.FontAtlasPreview;
        
        if (data.view)
            document.body.removeChild(view.Element)
        
        data.chars    = this.FntData.chars;
        data.common   = this.FntData.common;
        data.info     = this.FntData.info;
        data.kernings = this.FntData.kernings;
        data.pages    = this.FntData.pages;
        
        //padding order is clockwise from top. [up, right, down, left]
        data.fullSpaceWidth  = data.info.padding[1] + data.info.padding[3] + data.info.spacing[0] + (data.info.spacing[0] % 2);
        data.fullSpaceHeight = data.info.padding[0] + data.info.padding[2] + data.info.spacing[1] + (data.info.spacing[1] % 2);
        
        if (includeMinimumKoreanCharacters)
            this.AddKoreanDummyCharacterRange(data.chars, HangulAtlasEditor.MINIMUM_KOREAN_COMPLETE_TABLE);
        
        if (additionalKoreanCharacters && additionalKoreanCharacters.length > 0)
            this.AddKoreanDummyCharacterRange(data.chars, additionalKoreanCharacters);
        
        data.charResult = this.CopyObjectRecursive(data.chars);
        
        data.pageResult = [];
        
        data.result = {
            common: this.CopyObjectRecursive(data.common),
            info: this.CopyObjectRecursive(data.info),
            kernings: this.CopyObjectRecursive(data.kernings)
        };
        
        data.common.scaleW = sizeLevel;
        data.common.scaleH = sizeLevel;
        
        data.currentPage   = new Node(new Rect(0, 0, sizeLevel, sizeLevel));
        data.currentCanvas = new CanvasView(sizeLevel, sizeLevel);
        data.currentPageIndex = 0;
        
        data.charInfo;
        data.charInfoResult;
        data.charCode;
        data.insertedRect;
        
        data.glyph = null;
        data.glyphString = null;
        data.atlasData = null;
        
        data.drawInfos = null;
        
        data.isKorean = false;
        
        if (data.events.pageCreated)
            data.events.pageCreated(data.currentPage, data.currentCanvas);
        
        if (data.events.progress)
            data.events.progress(0, '-'.charCodeAt(0));
        
        setTimeout(this.DrawFntGlyph.bind(this, data), HangulAtlasEditor.RENDER_SPEED * 10);
        
        return true;
    }
    catch (e) {
        
        if (error)
            error(e);
        
        return false;
    }
};

HangulAtlasEditor.AddKoreanDummyCharacterRange = function(chars, dummyText) {
    
    var charId;
    var charExist;
    var notDefinedCharIds = [];
    
    for (var index = 0; index < dummyText.length; index++) {
        
        charId = dummyText.charCodeAt(index);
        
        if (!this.IsKoreanRange(charId))
            continue;
        
        if (notDefinedCharIds.includes(charId))
            continue;
        
        charExist = false;
        
        for (var charIndex = 0; charIndex < chars.length; charIndex++) {
            
            if (chars[charIndex].id === charId) {
                
                charExist = true;
                break;
            }
        }
        
        if (!charExist)
            notDefinedCharIds.push(charId);
    }
    
    var dummyChar;
    
    for (var index = 0; index < notDefinedCharIds.length; index++) {
        
        dummyChar = this.CopyObjectRecursive(HangulAtlasEditor.DUMMY_CHAR_DATA);
        dummyChar.id = notDefinedCharIds[index];
        
        chars.push(dummyChar);
    }
};

HangulAtlasEditor.IsKoreanRange = function(charId) {
    
    return (    //알파벳 검사
            charId >= this.UNICODE_ALPHABET_START &&
            charId <= this.UNICODE_ALPHABET_END &&
            this.GetAlphabetType(charId) !== this.AlphabetType.None
        ) || (  //조합문자 검사
            charId >= this.UNICODE_START &&
            charId <= this.UNICODE_END
        );
}

HangulAtlasEditor.DrawFntGlyph = function(data, index) {
    
    try {
        
        if (!index)
            index = 0;
        
        if (index < data.chars.length) {
            
            for (var step = 0; step < this.RENDER_STEP; step++) {
                
                if (index >= data.chars.length)
                    break;
                
                if (!data.drawInfos) {
                    
                    data.charInfo       = data.chars[index];
                    data.charInfoResult = data.charResult[index];
                    data.isKoreanFontData = null;
                    
                    data.charCode = data.charInfo.id;
                    
                    data.isKorean = this.IsKoreanRange(data.charCode);
                    
                    if (data.isKorean) {
                        
                        data.glyph       = this.GetGlyph(String.fromCharCode(data.charInfo.id));
                        data.glyphString = this.ToGlyphString(data.glyph);
                        
                        data.atlasData   = this.GetDKBAtlasData(data.glyph, data.glyphString);
                        
                        data.drawInfos = [];
                        
                        for (var offset of data.atlasData) {
                            
                            if (typeof offset !== 'object')
                                continue;
                            
                            data.drawInfos.push({
                                
                                x: this.DKBHorizontalUnit * offset[1],
                                y: this.DKBVerticalUnit   * offset[0],
                                width:  this.DKBHorizontalUnit,
                                height: this.DKBVerticalUnit,
                                
                                texture: this.DKBTexture
                            });
                        }
                        
                        data.isKoreanFontData = true;
                        
                    } else {
                        
                        data.drawInfos = [{
                            x: data.charInfo.x,
                            y: data.charInfo.y,
                            
                            width:  data.charInfo.width,
                            height: data.charInfo.height,
                            
                            texture: this.FntAtlasTextures[data.pages[data.charInfo.page]]
                        }];
                    }
                }
                
                data.insertedRect = data.currentPage.insert_rect(
                    new Rect(
                        0, 0,
                        data.drawInfos[0].width  + data.fullSpaceWidth,
                        data.drawInfos[0].height + data.fullSpaceHeight
                    )
                );
                
                if (data.insertedRect) {
                    
                    data.insertedRect = data.insertedRect.rect;
                    
                    for (var drawInfo of data.drawInfos)
                        data.currentCanvas.Context.drawImage(
                            
                            //Source
                            drawInfo.texture,
                            
                            //source x, y, width, height
                            drawInfo.x,     drawInfo.y,
                            drawInfo.width, drawInfo.height,
                            
                            //Destination coordinate
                            data.insertedRect.x + data.info.spacing[0] + (data.info.spacing[0] % 2) + data.info.padding[3],
                            data.insertedRect.y + data.info.spacing[1] + (data.info.spacing[1] % 2) + data.info.padding[0],
                            drawInfo.width, drawInfo.height
                        );
                    
                    data.charInfoResult.x      = data.insertedRect.x + data.info.spacing[0] + (data.info.spacing[0] % 2) + data.info.padding[3];
                    data.charInfoResult.y      = data.insertedRect.y + data.info.spacing[1] + (data.info.spacing[1] % 2) + data.info.padding[0];
                    data.charInfoResult.width  = drawInfo.width;
                    data.charInfoResult.height = drawInfo.height;
                    
                    if (data.charInfoResult.x + data.charInfoResult.width > data.sizeLevel ||
                        data.charInfoResult.y + data.charInfoResult.height > data.sizeLevel) {
                        
                        console.log(data);
                        return;
                    }
                    
                    data.charInfoResult.page   = data.currentPageIndex;
                    
                    if (data.isKoreanFontData) {
                        
                        //옵션 추가하기
                        
                        data.charInfoResult.xoffset  = data.offset.x;
                        data.charInfoResult.yoffset  = data.offset.y;
                        data.charInfoResult.xadvance = data.xAdvance;
                    }
                    
                    data.drawInfos = null;
                    
                } else {
                    
                    //새 페이지 만들기
                    data.pageResult.push({ page: data.currentPage, texture: data.currentCanvas, name: this.FormatFileName(data.fileName, data.pageResult.length) });
                    
                    data.currentPage   = new Node(new Rect(0, 0, data.sizeLevel, data.sizeLevel));
                    data.currentCanvas = new CanvasView(data.sizeLevel, data.sizeLevel);
                    data.currentPageIndex++;
                    index--;
                    
                    if (data.events.pageCreated)
                        data.events.pageCreated(data.currentPage, data.currentCanvas);
                }
                
                index++;
            }
            
            if (data.events.progress)
                data.events.progress(index / data.chars.length, data.charCode);
            
            setTimeout(this.DrawFntGlyph.bind(this, data, index), HangulAtlasEditor.RENDER_SPEED);
            
        } else {
            
            data.pageResult.push({ page: data.currentPage, texture: data.currentCanvas, name: this.FormatFileName(data.fileName, data.pageResult.length) });
            
            var pages = [];
            
            for (var i = 0; i < data.pageResult.length; i++)
                pages.push(data.pageResult[i].name);
            
            data.result.pages = pages;
            data.result.chars = data.charResult;
            
            if (data.events.progress)
                data.events.progress(1, '-'.charCodeAt(0));
                
            if (data.events.done)
                data.events.done(data.fileName, this.ExportFntData(data.result), data.pageResult);
        }
    } catch (e) {
        
        if (data.events.error)
            data.events.error(e);
    }
};

HangulAtlasEditor.FormatFileName = function(name, index) {
    return name + "_" + index.toString().padStart(2, '0') + ".png";
}

HangulAtlasEditor.ExportFntData = function(data) {
    
    var result = "";
    
    result += "<?xml version=\"1.0\"?>\n";
    result += "<font>\n";
    
    result += "  <info";
    for (var key in data.info) result += ` ${key}="${data.info[key]}"`;
    result += "/>\n";
    
    data.common.pages = data.pages.length;
    
    result += "  <common";
    for (var key in data.common) result += ` ${key}="${data.common[key]}"`;
    result += "/>\n";
    
    result += "  <pages>\n";
    for (var key in data.pages) result += `    <page id="${key}" file="${data.pages[key]}" />\n`;
    result += "  </pages>\n";
    
    result += `  <chars count="${data.chars.length}">\n`;
    for (var key in data.chars) {
        
        result += "    <char";
        for (var key2 in data.chars[key]) result += ` ${key2}="${data.chars[key][key2]}"`;
        result += " />\n";
    }
    result += "  </chars>\n";
    
    var charCode;
    
    result += `  <kernings count="${data.kernings.length}">\n`;
    for (var key in data.kernings) {
        
        charCode = data.kernings[key].first;
        
        this.IsKoreanRange(charCode);
        
        if (this.IsKoreanRange(charCode))
            data.kernings[key].amount = 0;
        
        charCode = data.kernings[key].second;
        
        if (this.IsKoreanRange(charCode))
            data.kernings[key].amount = 0;
        
        result += "    <kerning";
        for (var key2 in data.kernings[key]) result += ` ${key2}="${data.kernings[key][key2]}"`;
        result += " />\n";
    }
    result += "  </kernings>\n";
    
    result += "</font>\n";
    
    return result;
};

HangulAtlasEditor.GetAlphabetType = function(code) {
    
    code = String.fromCharCode(code);
    
    if (this.UNICODE_CONSONANTS.indexOf(code) !== -1)
        return this.AlphabetType.Consonant;
    
    else if (this.UNICODE_VOWELS.indexOf(code) !== -1)
        return this.AlphabetType.Vowel;
    
    return this.AlphabetType.None;
};

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