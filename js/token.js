//token.js
function token(type='default', value =1, pOwn=0, gOwn=0){

    this.pic = null;
    this.type = type;
    this.value = value;
    this.pOwn = pOwn;
    this.gOwn = gOwn;

    function setPic(image){
        this.pic = image;
    }

}