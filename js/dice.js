//dice.js
function dice(numSides=6, array=new array(1,2,3,4,5,6)){
    
    var myArray = array
    var N = numSide;
    var active = false;
    var pOwn = 0;
    var gOwn = 0;

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

    function adjustDie(indexArray, changeArray){
        //
    }

    function roll(){
        return this.myArray[Math.floor((Math.random() * this.N) )];
    }
}