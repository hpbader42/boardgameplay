//card.js
function card(id=0, type=0, side=0, pOwn=0, gOwn=0, loc=null, vis=false){
    
        this.id = id;
        this.type = type;
        if(side ==1){
            this.side = side;            
        }else{
            this.side = 0;
        }//0 is face down, 1 is face up
        this.pOwn = pOwn;
        this.gOwn = gOwn;
        this.location = loc;
        this.visible = vis; 

        this.setMap = function(newMapping){
            this.map = newMapping;
        }

        this.place = function(loc){
            if (loc==null){
                this.visible = false;
            }else{
                this.visible = true;
                this.location = loc;
            }
    
        }

        this.flipUp = function(){
            this.side = 1
        }
        this.flipDown = function(){
            this.side=0;
        }
    
        this.setPOwn = function(newPOwn){
            this.pOwn = newPOwn;
        }
    
        this.setGOwn = function(newGOwn){
            this.gOwn = newGOwn;
        }
    
    }