
require('./bcx.node.js');
var http = require("http");
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


let server=http.createServer(function(request, response) {
    var pathname = url.parse(request.url);
    var query = querystring.parse(pathname.query);
    if (pathname.pathname === '/trxToken') {

        bcx.callContractFunction({
            nameOrId: "contract.testing",
            functionName: "startgame",

            valueList: ('4.2.0,{"gameid":"large"}').split(
                ","
            ), //['4.2.0',{"type":"Employee","employeeId":"551"}],////[{"level":1,"color":"red","clothes":{"size":7}}],//
            onlyGetFee: false,
            callback: function (res) {
                console.log("callContractFunction res", res['data'][0]['contract_affecteds'][0]['raw_data']['message']);
            }
        })
    }
}).listen(9999);

bcx.subscribeToRpcConnectionStatus({
    callback:status=>{
        console.info("rpc status",status);
        if(status=="closed"){
            server.close();
        }
    }
})

// bcx.subscribeToChainTranscation({
//     callback:function(res){
//         console.log("subscribeToChainTranscation res",res);
//         if(res.status==1&&res.data.type=="account_create"){
//             bcx.transferAsset({
//                 to:res.data.parseOperations.new_account,//query.to,
//                 amount:100,//query.token,
//                 assetId:"COCOS",
//                 memo:"新账户注册送100(node服务)"
//             }).then(result=>{
//                 console.info('bcx transferAsset',result);
//             })
//         }
//     }
// })

bcx.subscribeToBlocks({
    callback:res=>{

    }
})
