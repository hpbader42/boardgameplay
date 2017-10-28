function figurine(pic=null, type='default', pOwn=0, gOwn=0, loc=null, vis=false){
    
        this.pic = null;
        this.type = type;
        this.pOwn = pOwn;
        this.gOwn = gOwn;
        this.location = loc;
        this.visible = vis; 
    
        this.setPic = function(image){
            this.pic = image;
        }
    
        this.place = function(loc){
            if (loc==null){
                this.visible = false;
            }else{
                this.visible = true;
                this.location = loc;
            }
    
        }
    
        this.setPOwn = function(newPOwn){
            this.pOwn = newPOwn;
        }
    
        this.setGOwn = function(newGOwn){
            this.gOwn = newGOwn;
        }
    
    }//figurine