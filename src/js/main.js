function Main() { this.Initialize(); }

Main.Initialize = function() {
    
    if (this.Initialized)
        return;
    
    this.InitializeView();
    
    this.DKBAtlasInput = document.getElementById("DKBAtlasInput");
    this.DKBAtlasInput.addEventListener('click', this.DKBAtlasInput_Click.bind(this));
    this.DKBAtlasInput.addEventListener('change', this.DKBAtlasInput_Change.bind(this));
    this.DKBAtlasTexture = new Image();
    
    this.FntAtlasInput = document.getElementById("FntAtlasInput");
    this.FntAtlasInput.addEventListener('click', this.FntAtlasInput_Click.bind(this));
    this.FntAtlasInput.addEventListener('change', this.FntAtlasInput_Change.bind(this));
    
    this.TextureDemensionInput = document.getElementById("TextureDemensionInput");
    
    this.IncludeMinimumKoreanCharactersInput = document.getElementById("IncludeMinimumKoreanCharactersInput");
    this.IncludeMinimumKoreanCharactersInput.addEventListener("change", this.IncludeMinimumKoreanCharactersInput_Change.bind(this));
    this.IncludeMinimumKoreanCharacters = true;
    
    this.AdditionalKoreanCharactersInput = document.getElementById("AdditionalKoreanCharactersInput");
    
    this.OffsetXInput = document.getElementById("OffsetXInput");
    this.OffsetYInput = document.getElementById("OffsetYInput");
    
    this.OffsetXInput.value = 0;
    this.OffsetYInput.value = 0;
    this.AdvanceXInput = document.getElementById("AdvanceXInput");
    
    this.GenerateButton = document.getElementById("GenerateButton");
    this.GenerateButton.addEventListener('click', this.GenerateButton_Click.bind(this));
    
    this.ZipFile = null;
    this.DownloadZipButton = document.getElementById("DownloadZipButton");
    this.DownloadZipButton.addEventListener('click', this.DownloadZipButton_Click.bind(this));
    this.DownloadZipButton.setAttribute('disabled', '');
    
    this.ProgressLabel = document.getElementById("ProgressLabel");
    
    this.GenerateViewContainer         = document.getElementById("GenerateViewContainer");
    this.RenderingPreviewContainer     = document.getElementById("RenderingPreviewContainer");
    this.RenderingPreviewListContainer = document.getElementById("RenderingPreviewListContainer");
    this.RenderingPreview = null;
    
    this.FntOutputContainer = document.createElement("pre");
    this.FntOutput = document.createElement("code");
    this.FntOutputContainer.appendChild(this.FntOutput);
    
    this.PIXIViewContainer = document.getElementById("PIXIViewContainer");
    this.PIXIViewTextLabel = document.getElementById("PIXIViewTextLabel");
    this.PIXIViewTextInput = document.getElementById("PIXIViewTextInput");
    this.PIXIViewTextInput.addEventListener('input', this.PIXIViewTextInput_Change.bind(this));
    this.PIXIViewTextInputCache = Strings.PIXI_PARAGRAPH;
    this.PIXIView = null;
    
    this.SetUIStrings(Strings.UI);
    
    this.ProgressLabel_Pages = 0;
    this.Initialized = true;
    
    document.body.removeAttribute('pending');
};

Main.SetUIStrings = function(strings) {
    
    document.title = strings.TITLE;
    
    this.DKBTextureLabel = document.getElementById("DKBTextureLabel");
    this.DKBTextureHelp  = document.getElementById("DKBTextureHelp");
    
    this.FntAtlasLabel = document.getElementById("FntAtlasLabel");
    this.FntAtlasHelp  = document.getElementById("FntAtlasHelp");
    
    this.TextureSizeLabel = document.getElementById("TextureSizeLabel");
    this.TextureSizeHelp  = document.getElementById("TextureSizeHelp");
    
    this.IncludeMinimumKoreanCharactersLabel = document.getElementById("IncludeMinimumKoreanCharactersLabel");
    this.IncludeMinimumKoreanCharactersHelp = document.getElementById("IncludeMinimumKoreanCharactersHelp");
    
    this.AdditionalKoreanCharactersLabel = document.getElementById("AdditionalKoreanCharactersLabel");
    this.AdditionalKoreanCharactersHelp  = document.getElementById("AdditionalKoreanCharactersHelp");
    
    this.OffsetsLabel = document.getElementById("OffsetsLabel");
    this.OffsetsHelp  = document.getElementById("OffsetsHelp");
    
    this.AdvanceLabel  = document.getElementById("AdvanceLabel");
    this.AdvanceHelp   = document.getElementById("AdvanceHelp");
    
    this.DKBTextureLabel.innerText = strings.DKBFILE;
    this.DKBTextureHelp.innerHTML  = strings.HELP.DKBFILE;
    
    this.FntAtlasLabel.innerText   = strings.FNTFILE;
    this.FntAtlasHelp.innerHTML    = strings.HELP.FNTFILE;
    
    this.TextureSizeLabel.innerText = strings.TEXTURE_SIZE;
    this.TextureSizeHelp.innerHTML  = strings.HELP.TEXTURE_SIZE;
    
    this.IncludeMinimumKoreanCharactersLabel.innerText = strings.INCLUDE_MINIMUM_KOREAN_CHARACTERS;
    this.IncludeMinimumKoreanCharactersHelp.innerHTML  = strings.HELP.INCLUDE_MINIMUM_KOREAN_CHARACTERS;
    
    this.AdditionalKoreanCharactersLabel.innerText = strings.ADDITIONAL_KOREAN_CHARACTERS;
    this.AdditionalKoreanCharactersHelp.innerHTML = strings.HELP.ADDITIONAL_KOREAN_CHARACTERS;
    
    this.GenerateButton.innerText    = strings.GENERATE_BUTTON;
    this.DownloadZipButton.innerText = strings.DOWNLOAD_ZIP;
    
    this.OffsetsLabel.innerText = strings.OFFSETS;
    this.OffsetsHelp.innerHTML  = strings.HELP.OFFSETS;
    
    this.AdvanceLabel.innerText = strings.ADVANCE;
    this.AdvanceHelp.innerHTML  = strings.HELP.ADVANCE;
    
    this.ProgressLabel.innerHTML = Strings.READY;
    
    var about = document.getElementById("About");
    
    var elID;
    for (var el of about.children) {
        if (!el.id || el.id.length <= 6)
            continue;
        
        elID = el.id.substring(6);
        if (elID in Strings.ABOUT)
            el.innerHTML = Strings.ABOUT[elID];
    }
};

Main.DKBAtlasInput_Click = function(event) {
    
    this.DKBAtlasInput.value = null;
};

Main.DKBAtlasInput_Change = function(event) {
    
    var target = event.target || window.event.srcElement;
    var file = target.files[0];
    
    if (!file) {
        
        this.DKBAtlasInput.value = null;
        alert(Strings.NOT_SELECTED_DKB);
        return;
    }
    
    if (FileReader) {
        
        var fileReader = new FileReader();
        fileReader.addEventListener('load', this.DKBAtlasInput_Load.bind(this));
        
        fileReader.readAsDataURL(file);
        
    } else {
        
        this.DKBAtlasInput.value = null;
        alert(Strings.NOT_SUPPORTED_BROWSER);
    }
};

Main.DKBAtlasInput_Load = function(e) {
    
    if (e.currentTarget instanceof FileReader) {
        
        this.DKBAtlasTexture.addEventListener('load', Main.DKBAtlasInput_Load.bind(this));
        this.DKBAtlasTexture.src = e.currentTarget.result;
        
    } else {
        
        HangulAtlasEditor.SetDKBAtlasTexture(this.DKBAtlasTexture);
    
        if (HangulAtlasEditor.IsDKBTextureLoaded)
            this.AdvanceXInput.value = HangulAtlasEditor.DKBHorizontalUnit;
    }
};

Main.FntAtlasInput_Click = function(event) {
    
    this.FntAtlasInput.value = null;
};

Main.FntAtlasInput_Change = function(event) {
    
    var target = event.target || window.event.srcElement;
    
    var fntFile, pngFiles = [];
    for (var file of target.files) {
        
        if (file.name.endsWith(".png"))
            pngFiles.push(file);
        
        else if (file.name.endsWith(".fnt") && !fntFile)
            fntFile = file;
        
        else {
            
            this.FntAtlasInput.value = null;
            alert(Strings.NOT_VALID_FNT);
            return;
        }
    }
    
    if (!fntFile || pngFiles.length === 0) {
        
        this.FntAtlasInput.value = null;
        alert(Strings.NOT_VALID_FNT);
        return;
    }
    
    var name = fntFile.name;
    this.FileName = name.substring(0, name.lastIndexOf('.'));
    
    if (FileReader) {
        
        HangulAtlasEditor.ClearFntAtlasTexture();
        
        
        fileReader = new FileReader();
        fileReader.PngFiles = pngFiles;
        fileReader.addEventListener('load', this.FntAtlasInput_DataLoad.bind(this));
        
        fileReader.readAsText(fntFile);
        
    } else {
        
        alert(Strings.NOT_SUPPORTED_BROWSER);
    }
};

Main.FntAtlasInput_DataLoad = function(e) {
    
    if (!(e.currentTarget instanceof FileReader))
        return;
    
    HangulAtlasEditor.LoadFntXml(e.currentTarget.result);
    
    var validFiles = [];
    
    if (HangulAtlasEditor.FntData) {
        
        var isValid = false;
        var index = 0;
        
        for (var page of HangulAtlasEditor.FntData.pages) {
            
            isValid = false;
            
            for (var file of e.currentTarget.PngFiles) {
                
                if (file.name === page) {
                    
                    isValid = true;
                    break;
                }
            }
            
            validFiles[index++] = isValid;
        }
        
        if (validFiles.indexOf(false) !== -1) {
            
            alert(Strings.NOT_VALID_FNT);
            return;
        }
        
        var fileReader;
        for (var file of e.currentTarget.PngFiles) {
            
            fileReader = new FileReader();
            fileReader.file = file;
            fileReader.addEventListener('load', this.FntAtlasInput_ImageLoad.bind(this));
            
            fileReader.readAsDataURL(file);
        }
    }
};

Main.FntAtlasInput_ImageLoad = function(e) {
    
    if (e.currentTarget instanceof FileReader) {
        
        var image = new Image();
        image.file = e.currentTarget.file;
        image.addEventListener('load', Main.FntAtlasInput_ImageLoad.bind(this));
        image.src = e.currentTarget.result;
        
    } else
        HangulAtlasEditor.AddFntAtlasTexture(e.currentTarget.file.name, e.currentTarget);
};

Main.IncludeMinimumKoreanCharactersInput_Change = function(e) {
    
    this.IncludeMinimumKoreanCharacters = e.currentTarget.checked;
};

Main.GenerateButton_Click = function(e) {
    
    if (this.RenderingPreviewContainer.contains(this.FntOutputContainer))
        this.RenderingPreviewContainer.removeChild(this.FntOutputContainer);
    
    this.RenderingPreview = null;
    this.FntOutput.innerText = '';
    this.RenderingPreviewContainer.innerHTML = '';
    this.RenderingPreviewListContainer.innerHTML = '';
    this.DownloadZipButton.setAttribute('disabled', '');
    
    var offset = {
        x: parseInt(this.OffsetXInput.value),
        y: parseInt(this.OffsetYInput.value)
    };
    
    var xAdvance = parseInt(this.AdvanceXInput.value);
    
    if (!HangulAtlasEditor.GenerateFnt({
            sizeLevel:   this.TextureDemensionInput.value,
            fileName:    this.FileName,
            offset:      offset,
            xAdvance:    xAdvance,
            includeMinimumKoreanCharacters: this.IncludeMinimumKoreanCharacters,
            additionalKoreanCharacters:     this.AdditionalKoreanCharactersInput.value,
            progress:    this.GenerateFnt_Progress.bind(this),
            pageCreated: this.GenerateFnt_PageCreated.bind(this),
            done:        this.GenerateFnt_Done.bind(this),
            error:       this.GenerateFnt_Error.bind(this)
        }))
        return;
    
    this.ProgressLabel.innerHTML = Strings.GENERATE_BEGIN;
    this.ProgressLabel_Pages = 0;
    this.GenerateViewContainer.style.display = '';
    this.PIXIViewTextInput.style.display = '';
    document.body.setAttribute('pending', '');
    
    if (this.PIXIView)
        this.PIXIView.Dispose();
};

Main.GenerateFnt_Progress = function(percent, charCode) {
    
    var unicode = (charCode).toString(16).toUpperCase().padStart(4, '0');
    this.ProgressLabel.innerHTML
        = Strings.GENERATE_PROGRESS + ` (${Math.floor(percent * 100)}%)<br>`
        + Strings.GENERATE_PAGES    + ` : ${this.ProgressLabel_Pages}<br>`
        + Strings.GENERATE_PROCESSING_GLYPH + ` : ${String.fromCharCode(charCode)} (U+${unicode})`;
};

Main.GenerateFnt_PageCreated = function(pageData, canvasView) {
    
    if (this.RenderingPreview) {
        
        this.RenderingPreviewContainer.removeChild(this.RenderingPreview);
        this.RenderingPreviewListContainer.appendChild(this.RenderingPreview);
    }
    
    this.RenderingPreview = canvasView.Element;
    this.RenderingPreviewContainer.appendChild(this.RenderingPreview);
    
    this.ProgressLabel_Pages++;
};

Main.GenerateFnt_Done = function(fileName, xmlString, pageDataList) {
    
    this.FntOutput.innerText = xmlString;
    this.RenderingPreviewContainer.appendChild(this.FntOutputContainer);
    
    this.PIXIView = new PIXIView();
    
    this.ProgressLabel.innerHTML = Strings.GENERATE_ZIPPING;
    
    var zip = new JSZip();
    zip.file(fileName + ".fnt", xmlString);
    
    var base64;
    for (var pageData of pageDataList) {
        
        base64 = pageData.texture.Element
            .toDataURL();
        
        this.PIXIView.AddAssetToLoader(
            pageData.name,
            base64
        );
        
        base64 = base64.replace(/^data:image\/(png|jpg);base64,/, '');
        
        zip.file(pageData.name, base64, { base64: true });
    }
    
    this.PIXIView.AddAssetToLoader(
        fileName,
        "data:text/fnt;base64," + base64encode(xmlString)
    );
    
    var info = HangulAtlasEditor.FntData.info;
    this.PIXIView.InitializeText(info.face, this.PIXIView_Load.bind(this));
    
    this.PIXIViewContainer.appendChild(this.PIXIView.Element);
    
    zip.generateAsync({ type: "blob" })
        .then(this.GenerateFnt_DownloadZip.bind(this));
};

Main.GenerateFnt_Error = function(e) {
    
    console.error(e);
    alert(Strings.GENERATE_ERROR + '\n' + e.message + '\n' + Strings.GENERATE_ERROR_ADDITIONAL);
    
    document.body.removeAttribute('pending');
};

Main.GenerateFnt_DownloadZip = function(content) {
    
    document.body.removeAttribute('pending');
    
    if (!content) {
        
        this.ProgressLabel.innerHTML = Strings.GENERATE_FAILED_ZIP;
        return;
    }
    
    this.ZipFile = content;
    this.DownloadZipButton.removeAttribute('disabled');
    
    this.ProgressLabel.innerHTML = Strings.GENERATE_DONE;
};

Main.DownloadZipButton_Click = function(e) {
    
    if (this.ZipFile)
        saveAs(this.ZipFile, "output.zip");
};

Main.PIXIView_Load = function() {
    
    this.GenerateViewContainer.style.display = 'none';
    this.PIXIViewTextInput.style.display = 'block';
    this.PIXIViewTextInputCache = this.PIXIViewTextInput.value || this.PIXIViewTextInputCache;
    this.PIXIViewTextInput.value = this.PIXIViewTextInputCache;
    
    this.PIXIView.SetText(this.PIXIViewTextInputCache);
};

Main.PIXIViewTextInput_Change = function(e) {
    
    if (document.body.getAttribute('pending')) {
        
        e.preventDefault();
        return;
    }
    
    if (this.PIXIView)
        this.PIXIView.SetText(this.PIXIViewTextInput.value);
};

Main.InitializeView = function() {
    
    this.Views = [];
    this.ViewContainer = document.getElementById("View");
    
    for (var view of this.ViewContainer.children)
        this.Views.push(view.id);
    
    var headers = document.getElementById("Header");
    var el;
    var attr;
    for (var view of this.Views) {
        
        el = document.createElement("span");
        el.setAttribute('view', view);
        el.classList.add('item');
        
        if (view in Strings.HEADERS)
            el.innerText = Strings.HEADERS[view];
        
        el.addEventListener('click', this.Header_Click.bind(this));
        
        headers.appendChild(el);
    }
    
    headers.children[1].click();
};

Main.Header_Click = function(e) {
    
    var target = e.currentTarget;
    var view = target.getAttribute('view');
    
    this.ViewContainer.setAttribute('view', view);
    
    if (this.CurrentViewItem)
        this.CurrentViewItem.classList.remove('active');
    
    target.classList.add('active');
    this.CurrentViewItem = target;
};

window.addEventListener('load', Main.bind(Main) );