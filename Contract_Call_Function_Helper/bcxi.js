require('./bcx.node.js');

var url = require("url");
var querystring = require('querystring')



let bcx=new BCX({
    ws_node_list:[
        {url:"ws://39.97.110.222:8040",name:"Cocos - China - Beijing"},
        {url:"ws://47.93.62.96:8049",name:"Cocos - China - Xiamen"} ,
    ],
    networks:[
        {
            core_asset:"COCOS",
            chain_id:"7d89b84f22af0b150780a2b121aa6c715b19261c8b7fe0fda3a564574ed7d3e9"
        }
    ],
    faucet_url:"http://47.93.62.96:3000",
    auto_reconnect:false,
    check_cached_nodes_data:false
});

bcx.passwordLogin({
    account:"helloworld",//query.loginUserName,
    password:"yoyoyoyo12"
}).then(res=>{
    console.info("bcx passwordLogin res",res);
});


module.exports = bcx
