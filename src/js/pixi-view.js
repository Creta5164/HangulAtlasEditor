function PIXIView() {
    
    this.Instance = new PIXI.Application({ backgroundColor: 0 });
    this.Element  = this.Instance.view;
    this.Stage    = this.Instance.stage;
    this.Loader = this.Instance.loader;
    this.TextField = null;
    this.OnLoad = null;
}

PIXIView.prototype.AddAssetToLoader = function(name, base64) {
    
    this.Loader.add(name, base64);
};

PIXIView.prototype.InitializeText = function(font, load) {
    
    this.OnLoad = load;
    this.Loader.load(this.OnLoadAssets.bind(this, font));
};

PIXIView.prototype.OnLoadAssets = function(font) {
    
    this.TextField = new PIXI.BitmapText(
        '',
        { font: font, align: "left" }
    );
    
    this.Stage.addChild(this.TextField);
    
    if (this.OnLoad)
        this.OnLoad();
};

PIXIView.prototype.SetText = function(string) {
    
    if (!this.TextField)
        return;
    
    this.TextField.text = string;
};

PIXIView.prototype.Dispose = function() {
    
    this.Instance.destroy(true);
    
    this.Instance = null;
    this.Element = null;
    this.Stage = null;
    this.Loader = null;
    this.TextField = null;
    this.OnLoad = null;
};

//Fix for load base64 resources
//https://github.com/pixijs/pixi.js/blob/ef8f397faf8b3a877adc8b5b6a009aecc0ab7b33/packages/text-bitmap/src/BitmapFontLoader.ts#L94-L109
//This below source code is under the MIT license that owns by Mathew Groves, Chad Engler.
//https://github.com/pixijs/pixi.js/blob/ef8f397faf8b3a877adc8b5b6a009aecc0ab7b33/LICENSE
PIXI.BitmapFontLoader.use = function(resource, next)
{
    // skip if no data or not xml data
    if (!resource.data || resource.type !== PIXI.LoaderResource.TYPE.XML)
    {
        next();

        return;
    }

    // skip if not bitmap font data, using some silly duck-typing
    if (resource.data.getElementsByTagName('page').length === 0
        || resource.data.getElementsByTagName('info').length === 0
        || resource.data.getElementsByTagName('info')[0].getAttribute('face') === null
    )
    {
        next();

        return;
    }

    let xmlUrl = !resource.isDataUrl ? PIXI.BitmapFontLoader.dirname(resource.url) : '';

    if (resource.isDataUrl)
    {
        if (xmlUrl === '.')
        {
            xmlUrl = '';
        }

        if (this.baseUrl && xmlUrl)
        {
            // if baseurl has a trailing slash then add one to xmlUrl so the replace works below
            if (this.baseUrl.charAt(this.baseUrl.length - 1) === '/')
            {
                xmlUrl += '/';
            }
        }
    }

    // remove baseUrl from xmlUrl
    xmlUrl = xmlUrl.replace(this.baseUrl, '');

    // if there is an xmlUrl now, it needs a trailing slash. Ensure that it does if the string isn't empty.
    if (xmlUrl && xmlUrl.charAt(xmlUrl.length - 1) !== '/')
    {
        xmlUrl += '/';
    }

    const pages = resource.data.getElementsByTagName('page');
    const textures = {};

    // Handle completed, when the number of textures
    // load is the same number as references in the fnt file
    const completed = (page) =>
    {
        textures[page.metadata.pageFile] = page.texture;

        if (Object.keys(textures).length === pages.length)
        {
            PIXI.BitmapFontLoader.parse(resource, textures);
            next();
        }
    };

    for (let i = 0; i < pages.length; ++i)
    {
        const pageFile = pages[i].getAttribute('file');
        const url = xmlUrl + pageFile;
        let exists = false;

        // incase the image is loaded outside
        // using the same loader, resource will be available
        for (const name in this.resources)
        {
            const bitmapResource = this.resources[name];

            if (bitmapResource.name === url)//if (bitmapResource.url === url)
            {
                bitmapResource.metadata.pageFile = pageFile;
                if (bitmapResource.texture)
                {
                    completed(bitmapResource);
                }
                else
                {
                    bitmapResource.onAfterMiddleware.add(completed);
                }
                exists = true;
                break;
            }
        }

        // texture is not loaded, we'll attempt to add
        // it to the load and add the texture to the list
        if (!exists)
        {
            // Standard loading options for images
            const options = {
                crossOrigin: resource.crossOrigin,
                loadType: PIXI.LoaderResource.LOAD_TYPE.IMAGE,
                metadata: Object.assign(
                    { pageFile },
                    resource.metadata.imageMetadata
                ),
                parentResource: resource,
            };

            this.add(url, options, completed);
        }
    }
};