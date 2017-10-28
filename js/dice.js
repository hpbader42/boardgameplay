//dice.js
function dice(numSides=6, array=[1,2,3,4,5,6]){
    
    this.myArray = array
    this.N = numSides;
    this.active = false;
    this.pOwn = 0;
    this.gOwn = 0;

    this.setPOwn = function(pOwn){
        this.pOwn = pOwn;
    }
    this.setGOwn = function(gOwn){
        this.gOwn = gOwn;
    }

    this.setActive = function(){
        this.active = true;
    }
    this.setInActive = function(){
        this.active = false;
    }

    this.clearDie = function(){
        this.N = 0;
        this.myArray = null;
        this.active = false;
    }
    this.adjustDie = function(indexArray, changeArray){
        //
    }

    this.roll = function(){
        return this.myArray[Math.floor((Math.random() * this.N) )];
    }
}