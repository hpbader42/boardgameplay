function Player(myId){

    this.id = myId
    this.group = 1;
    this.stream = null;
    this.changed = false;
    this.tokenMap = null;
    this.deckMap = null;
    this.figurineMap = null;
    this.diceMap = null;
    this.attributeMap = null;


    this.setTeam = function(team){
        this.group = team;
    }
    this.setStream = function(stream){
        this.stream = stream;
    }



    this.addToken = function(inToken, number=1){
        if (inToken instanceof token){
            if (this.tokenList == null){
                this.tokenList = new Map();
                this.tokenList.set(inToken, number);
            }
            else{
                var found = 0;
                for( elem in this.tokenList.keys()){
                    console.log(elem.type);
                    if (elem.type == inToken.type){
                        console.log(inToken.type);
                        this.tokenList.set(elem, this.tokenList.get(elem)+number);
                        found = 1;
                    }
                }
                if(found ==0){
                    this.tokenList.set(inToken, number);
                }
            }    
        }
    }

}



