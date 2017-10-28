//dice.js
function dice(numSides=6, array=new array(1,2,3,4,5,6)){
    
    this.myArray = array
    this.N = numSide;
    this.active = false;
    this.pOwn = 0;
    this.gOwn = 0;

    function setPOwn(pOwn){
        this.pOwn = pOwn;
    }
    function setGOwn(gOwn){
        this.gOwn = gOwn;
    }

    function setActive(){
        this.active = true;
    }
    function setInactive(){
        this.active = false;
    }

    function clearDie(){
        this.N = 0;
        this.myArray = null;
        this.active = false;
    }
    function adjustDie(indexArray, changeArray){
        //
    }

    function roll(){
        return this.myArray[Math.floor((Math.random() * this.N) )];
    }
}