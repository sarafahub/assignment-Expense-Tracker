  
        const contractAddress= '0x029290c564Ef921c56a784AA16C97E930dAF7372';
        const contractABI = [
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_expense",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "_cat",
				"type": "string"
			}
		],
		"name": "addExpense",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_income",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "_cat",
				"type": "string"
			}
		],
		"name": "addIncome",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "showBalance",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "showExpense",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "showHistory",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_Type",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Cat",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "_amount",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "showIncome",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalEntries",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
        let bal = document.getElementById('balance');
        let inc = document.getElementById('income');
        let exp = document.getElementById('expense');
        let his = document.getElementById('his');
        let history = [];
        
        async function loadWeb3(){
            if(window.ethereum){
                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();
            }
        }
        async function loadContract(){
            return await new window.web3.eth.Contract(contractABI, contractAddress);
        }
        async function upbal() {
            let a = await window.contract.methods.showBalance().call();
            bal.innerHTML = a;
        }
        async function upinc() {
            let a = await window.contract.methods.showIncome().call();
            inc.innerHTML = a;
        }
        async function upexp() {
            let a = await window.contract.methods.showExpense().call();
            exp.innerHTML = a;
        }

        async function addinc() {
            await window.contract.methods.addIncome(document.getElementById('two').value, document.getElementById('one').value).send( {from: '0xA446638Aa93E08B9f68393e812919906F38A63fb'})
        }
        async function addexp() {
            await window.contract.methods.addExpense(document.getElementById('four').value, document.getElementById('three').value).send( {from: '0xA446638Aa93E08B9f68393e812919906F38A63fb'})
        }
        async function showTrans() {
            let a = await window.contract.methods.totalEntries().call();
            for(let i = 0; i < a; i++) {
            history = await window.contract.methods.showHistory(i).call();
            his.innerHTML += "<h3>"+" Tranasaction ID: " + history[0] + " ,Tranasaction Type: "+history[1]+" ,Tranasaction category: " + history[2] + " ,Tranasaction amount: "+ history[3] + "<h3> "+ "<br />" ;
            }
        }

        async function load() {
            await loadWeb3();
            window.contract = await loadContract();
        }
        
        load();
