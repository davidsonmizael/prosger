	//modelo de como é um processo
	var ReadyList = [];
	var RunningVid = null;
	var WaitingList = [];
	var FinishedList = [];
	var ProcessQueue = new Process();
	var ProcessDuration = null;
	var video;

	function addToReadyList(){
	 	ReadyList.push(ProcessQueue);
	 	refreshReadyList();
	 	var vd = document.getElementById("running-video").scr;
	 	console.log(RunningVid);
	 	if(RunningVid != null){

	 	}else{
	 		setFileVideo(ProcessQueue);
	 	}
	 	backStart();
	};

	function removeFromReadyList(){
		ReadyList.shift();
		if(ReadyList[0] != null){
			setFileVideo(ReadyList[0]);
		}
		refreshReadyList();
	};

	function refreshReadyList(){
		var rlist = document.getElementById("ready-list");

		while(rlist.firstChild){
			rlist.removeChild(rlist.firstChild);
		}
	 	ReadyList.forEach( function(proc){
	 		addToReady(proc.pid, proc.name, proc.priority);
	 	})
	};

	function addToFinishedList(Process){
		FinishedList.push(Process);
		refreshFinishedList();
	};

	function removeFromFinishedList(){
		FinishedList.shift();
		refreshFinishedList();
	};

	function refreshFinishedList(){
		var flist = document.getElementById("finished-list");

		while(flist.firstChild){
			flist.removeChild(flist.firstChild);
		}

	 	FinishedList.forEach( function(proc){
	 		addToFinished(proc.pid, proc.name, proc.priority);
	 	})
	}


	 function addToWaitingList (Process) {
	 	WaitingList.push(Process);
	 	refreshReadyList();
	};

	 function addToWaitingList(Process){
		WaitingList.push(Process);
	};

	function addToQueue(process){
	//TO-DO
	};

	function setProcessDuration(data){
		ProcessDuration = data;
	};

	function getProcessDuration(){
		return ProcessDuration;
	};

	function Process(pid, name, type, size, priority, owner, time, memory, files){
		this.pid = pid;
		this.name = name;
		this.type = type;
		this.size = size;
		this.priority = priority;
		this.owner = owner;
		this.time = time;
		this.memory = memory;
		this.files = files;
	};

	function printProcess(ProcessQueue){
		console.log(ProcessQueue.pid + " " + ProcessQueue.name + " " + ProcessQueue.type + " " +
		ProcessQueue.size + " " + ProcessQueue.priority + " " + ProcessQueue.owner + " " + ProcessQueue.time + " " + 
		ProcessQueue.memory + " " + ProcessQueue.files );
	};

	function setProcess(process, pid, name, type, size, priority, owner, time, memory, files){
		process.pid = pid;
		process.name = name;
		process.type = type;
		process.size = size;
		process.priority = priority;
		process.owner = owner;
		process.time = time;
		process.memory = memory;
		process.files = files;

		return process;
	};

 	//funçao a ser rodada assim que a pagina iniciar
 	function onLoadPage(){
	//TO-DO
	};

 	//aparece a div pra cadastrar um processo
 	function createGhost(){
 		document.getElementById("process-null").style.display="none";
 		document.getElementById("process-create").style.display="block";
 	};

 	//aparece a div com as informaçoes do processo
 	function showInfo(){
 		document.getElementById("process-create").style.display="none";
 		document.getElementById("process-null").style.display="none";
 		document.getElementById("process-info").style.display="block";
 		document.getElementById("input-upload-file").style.display="none";
 	};

 	//volta pro começo
 	function backStart(){
 		document.getElementById("process-null").style.display="block";
 		document.getElementById("process-info").style.display="none";
 		document.getElementById("process-create").style.display="none";
 		document.getElementById("input-upload-file").style.display="";
 		document.getElementById("actual-pid").innerHTML = "";
 		document.getElementById("actual-name").innerHTML = "";
 		document.getElementById("actual-type").innerHTML = "";
 		document.getElementById("actual-size").innerHTML = "";
 		document.getElementById("actual-owner").innerHTML = "";
 		document.getElementById("actual-time").innerHTML = "";
 		document.getElementById("actual-memo").innerHTML = "";
 		document.getElementById("actual-priority").innerHTML = "";
 		document.getElementById("fileUp").value = "";
 	};

 	//retorna uma cor pra cada prioridade
 	function getPriority(pr){
 		switch(pr){
 			case 1:
 			return "red";
 			break;
 			case 2:
 			return "yellow";
 			case 3: 
 			return "green";
 			default:
 			return "green";
 		};
 	};

 	//adiciona o processo passado pra lista de ready
 	function addToReady(pid, name, priority){ 		
 		var priority = getPriority(priority);
 		var ul = document.getElementById("ready-list");
 		var li = document.createElement("li");
 		var node = document.createTextNode("");
 		li.appendChild(node);
 		li.setAttribute("id",name);
 		ul.appendChild(li);
 		li.innerHTML = pid + ": " + name + " <span style='color:"+ priority + "; float:right;padding-right:5px;'> &#9899; </span>";
 	};

 	//remove o processo da lista de ready
 	function removeFromReady(name){
 		var ul = document.getElementById("ready-list");
 		var li = document.getElementById(nome);
 		ul.removeChild(li);
 	};

 	function addToFinished(pid, name, priority){
 		var priority = getPriority(priority);
 		var ul = document.getElementById("finished-list");
 		var li = document.createElement("li");
 		var node = document.createTextNode("");
 		li.appendChild(node);
 		li.setAttribute("id",name);
 		ul.appendChild(li);
 		li.innerHTML = pid + ": " + name + " <span style='color:"+ priority + "; float:right;padding-right:5px;'> &#9899; </span>";

 	};

 	//passa o process e tcharam!
 	function setFileVideo(Process){
		document.getElementById("running-video").src = window.URL.createObjectURL(Process.files);
 		document.getElementById("running-pid").innerHTML = Process.pid;
 		document.getElementById("running-name").innerHTML = Process.name;
 		document.getElementById("running-atime").innerHTML = "not yet";
 		removeFromReadyList();
 		RunningVid = Process;

 		var video = document.getElementById("running-video");
    	video.addEventListener('ended', function(e){
    		video.pause();
		  	removeFileVideo();
		  	addToFinishedList(Process);
		  	runNextVideo();
		}, false);
 	};

	function removeFileVideo(){
		RunningVid = null;
		document.getElementById("running-video").src = " ";
 		document.getElementById("running-pid").innerHTML = 0;
 		document.getElementById("running-name").innerHTML = 0;
 		document.getElementById("running-atime").innerHTML = "not yet";
	}

	function runNextVideo(){
		if(ReadyList[0] != null){
			setFileVideo(ReadyList[0]);
		}else{

		}
	}

 	//pega os metadados do arquivo quando for selecionado e retorna um processo
 	function setProcessByFile(files){
 		ProcessQueue = new Process();
 		file = files[0];
 		var pid =  1;
 		var Pname = file.name;
 		Pname = Pname.slice(0, Pname.indexOf("."));
 		var Ptype = file.type;
 		var Psize = bytesToSize(file.size); //transforma de bites pra KB, MB, GB...
 		var Pprior = setPriority(Ptype); //retorna 1, 2 ou 3 dependendo do tipo do arquivo
 		getDuration(files);
 		var Pdur = getProcessDuration();
 		console.log("dd" + Pdur);
 		var Pmem = getMemory(Psize); //retorna o tamanho * (100 || 10 | 1), depndendo do tipo
 		var Pown = "root";
 		showInfo();
 		ProcessQueue = setProcess(ProcessQueue, pid, Pname, Ptype, Psize, Pprior, Pown, Pdur, Pmem, file);
 		updateProcessQueue(ProcessQueue);
 	};

 	function updateProcessQueue(Process){
 		document.getElementById("actual-pid").innerHTML = Process.pid;
 		document.getElementById("actual-name").innerHTML = Process.name;
 		document.getElementById("actual-type").innerHTML = Process.type;
 		document.getElementById("actual-size").innerHTML = Process.size;
 		document.getElementById("actual-owner").innerHTML = Process.owner;
 		document.getElementById("actual-time").innerHTML = Process.time;
 		document.getElementById("actual-memo").innerHTML = Process.memory;
 		document.getElementById("actual-priority").innerHTML = Process.priority;
 	};

 	//seta os campos de info com os valores atuais
 	function getDuration(files) {
 		var duration;
 		video = document.createElement('video');
 		video.preload = 'metadata';
 		video.onloadedmetadata = function() {
 			window.URL.revokeObjectURL(this.src)
 			duration = video.duration;
 			setProcessDuration(duration);
 		}
 		video.src = URL.createObjectURL(files[0]);
 	};

 	//formata o tamanho de bites pra outros niveis, pego do link abaixo
 	//http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 	function bytesToSize(bytes) {
 		if(bytes == 0) return '0 Byte';
 		var k = 1024;
 		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
 		var i = Math.floor(Math.log(bytes) / Math.log(k));
 		return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
 	};

	//define uma prioridade pra cada tipo de arquivo
	function setPriority(ftype){
		ftype = ftype.slice(0, ftype.indexOf("/"));
		if(ftype == "video"){
			return 2;
		}else if(ftype == "image"){
			return 3;
		}else if(ftype == "text"){
			return 1;
		}
	};

	function orderReadyList(field, reverse, primer){
		var key = primer ? function(x){ return primer(x[field])} : function(x){ return x[field]};
		reverse = !reverse ? 1 : -1;

		return function(a,b){
			return a = key(a), b = key(b), reverse * ((a>b) - (b>a));
		}
	};

	//transforma o tamanho do arquivo no tanto de memoria que sera usado
	function getMemory(fsize){
		Stype = fsize.split(' ').pop();
		Snum = fsize.slice(0, fsize.indexOf(' '));
		var result;
		switch(Stype){	
			case 'MB':{
				result = Math.round(Snum) * 100;
				break;
			}
			case 'KB':{
				result = Math.round(Snum) * 10;
				break;
			}
			case 'Bytes':{
				result = Math.round(Snum);
				break;
			}
			default:{
				result = 0;
			}
		}
		return result;
	};


