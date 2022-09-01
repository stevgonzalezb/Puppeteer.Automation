const Logger = require("./log");
module.exports={
    create:function(Config){
        return new Logger(Config);
    }
}