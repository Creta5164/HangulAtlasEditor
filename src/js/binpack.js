/*
    This source code uses this git repository source.
    https://github.com/mackstann/binpack
*/

function Rect(x, y, w, h)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Rect.prototype.fits_in = function(outer)
{
    return outer.w >= this.w && outer.h >= this.h;
}

Rect.prototype.same_size_as = function(other)
{
    return this.w == other.w && this.h == other.h;
}

function Node(rect)
{
    this.left = null;
    this.right = null;
    this.rect = rect || new Rect(512, 512);
    this.filled = false;
}

Node.prototype.insert_rect = function(rect)
{
    if(this.left != null)
        return this.left.insert_rect(rect) || this.right.insert_rect(rect);

    if(this.filled)
        return null;

    if(!rect.fits_in(this.rect))
        return null;

    if(rect.same_size_as(this.rect))
    {
        this.filled = true;
        return this;
    }

    this.left = new Node();
    this.right = new Node();

    var width_diff = this.rect.w - rect.w;
    var height_diff = this.rect.h - rect.h;

    var me = this.rect;

    if(width_diff > height_diff)
    {
        // split literally into left and right, putting the rect on the left.
        this.left.rect = new Rect(me.x, me.y, rect.w, me.h);
        this.right.rect = new Rect(me.x + rect.w, me.y, me.w - rect.w, me.h);
    }
    else
    {
        // split into top and bottom, putting rect on top.
        this.left.rect = new Rect(me.x, me.y, me.w, rect.h);
        this.right.rect = new Rect(me.x, me.y + rect.h, me.w, me.h - rect.h);
    }

    return this.left.insert_rect(rect);
}