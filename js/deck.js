//deck
function deck(){

    this.cardList = new array();
    this.numCards = 0;

    function add(inCardList){
        
        inCardList.forEach(function(element) {
            if (element instanceof card){
                this.cardList.append(element);
                this.numCards = this.numCards + 1;    
            }
        }); 
    }
    
    function shuffle(){

    }

    function deal(){

    }

    function setPOwn(pOwn){
        this.pOwn = pOwn;
    }
    function setGOwn(gOwn){
        this.gOwn = gOwn;
    }
}