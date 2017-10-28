//deck
function deck(){

    this.cardList = new Array();
    this.numCards = 0;

    this.add = function(inCardList){
        
        inCardList.forEach(function(element) {
            if (element instanceof card){
                this.cardList.append(element);
                this.numCards = this.numCards + 1;    
            }
        }); 
    }
    
    this.shuffle = function(){

    }

    this.deal = function(){

    }

    this.setPOwn = function(pOwn){
        this.pOwn = pOwn;
    }
    this.setGOwn = function(gOwn){
        this.gOwn = gOwn;
    }
}