function Player(myId){

    this.id = myId
    this.group = 1;
    this.stream = null;
    this.changed = false;
    this.tokenList = null;
    this.cardList = null;
    this.figureList = null;
    this.diceList = null;
    this.attributeList = null;


    this.setTeam = function(team){
        this.group = team;
    }
    this.setStream = function(stream){
        this.stream = stream;
    }

    this.addToken = function(Token){
        if (this.tokenList == null){
            this.tokenList = new Map();
        }
    }

}



