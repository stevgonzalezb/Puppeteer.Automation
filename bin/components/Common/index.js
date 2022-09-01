const Constants = require("./constants");
const Errors = require("./errors");
const Messages = require("./messages");
const uidGen = require('uuid/v4');
const Ajv = require('ajv');


function Common(config,Logger,ErrorFactory,Schemas){
    this.Config = config;
    this.Constants = Constants;
    this.Errors = Errors;
    this.Messages = Messages;
    this.ErrorFactory = ErrorFactory;
    this.Logger = Logger;
    this.Schemas = Schemas;
}

Common.prototype.Format = function(str,args){
    let i = args.length;
    while(i--){
        str = str.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
    }
    return str;
}

Common.prototype.ValidateSchema = function(Schema,Data){
    const ajv = new Ajv();
    let valid = ajv.validate(Schema,Data);
    if(!valid){
        return {result:false,errors:ajv.errors[0]};
    }
    else{
        return {result:true,errors:null};
    } 
}

Common.prototype.GenerateId = function(){
    return uidGen({nsecs:5678});
}
module.exports={
    create:function(Config,Logger,ErrorFactory,Schemas){
        return new Common(Config,Logger,ErrorFactory,Schemas);
    }
}