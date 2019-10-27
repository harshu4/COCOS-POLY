var express = require('express');
var router = express.Router();

var bcx = require('../bcxi.js')

router.post('/startgame', function (req, res) {
	var gid=req.body.gameid;
	bcx.callContractFunction({
			nameOrId: "contract.final",
			functionName: "startgame",
			valueList: [gid], 
			onlyGetFee: false,
			callback: function (reso) {
					//x = reso['data'][0]['contract_affecteds'][0]['raw_data']['message']
					console.log(reso);
					if(reso["code"]==1){
						res.send({"response":"sucess"})
					}else{
						res.send({"response":"error"})
					}
			}
	})
});

router.post('/isregistered', function (req, res) {
	var gid=req.body.gameid;
	var id=req.body.playerid;
	bcx.callContractFunction({
			nameOrId: "contract.final",
			functionName: "isregistered",
			valueList: [gid,id], 
			onlyGetFee: false,
			callback: function (reso) {
					//x = reso['data'][0]['contract_affecteds'][0]['raw_data']['message']
					console.log(reso);
					if(reso["code"]==1){
						if(reso['data'][0]['contract_affecteds'][0]['raw_data']['message']=="1"){
							res.send({"response":"sucess"})
						}else{
							res.send({"response":"error"})
						}
					}else{
						res.send({"response":"error"})
					}
			}
	})

});

router.post('/settlment', function (req, res) {
	var gid=req.body.gameid;
	var id=req.body.playerid;
	bcx.callContractFunction({
			nameOrId: "contract.final",
			functionName: "settlment",
			valueList: [gid,id], 
			onlyGetFee: false,
			callback: function (reso) {
					//x = reso['data'][0]['contract_affecteds'][0]['raw_data']['message']
					console.log(reso);
					if(reso["code"]==1){
						if(reso['data'][0]['contract_affecteds'][0]['raw_data']['message']=="1"){
							res.send({"response":"sucess"})
						}else{
							res.send({"response":"error"})
						}
					}else{
						res.send({"response":"error"})
					}
			}
	})

});




module.exports = router;
