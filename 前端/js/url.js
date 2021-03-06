//global variable
/*var publicElement = (function () {
    this.ip = "10.103.240.242";
    this.port = "8080";
	this.login_id = null;
	this.manage = null;
	this.messages = [];
	this.project = [];
    return this;
})();*/

//====================================================
//功能：每次点击'新增url'按钮后，先消除之前验证产生的的tootip
//    insertProject函数为‘新增url’的modal中隶属项目下拉列表填充内容
//====================================================
$('#addUrlBtn').on('click',function(){
	var V = new validateFormInput($('#add_one'));
	V.destroy();
	insertProject("project_id","");
	$('#url_sessions').empty();
	//addSessions('url_sessions');
});

//====================================================
//功能：‘新增url’、‘编辑url’、‘url信息’三个modal中的‘跳转’按钮
//     点击后，在新窗口中预览相应链接
//====================================================
$('#showUrl1').on('click',function(){
	console.log($('#content0').val());
	console.log($('#Minor').val());
	window.open($('#content0').val());
});
$('#showUrl2').on('click',function(){
	//console.log($('#content1').val());
	window.open($('#content1').val());
});
$('#showUrl3').on('click',function(){
	window.open($('#content2').val());
});
$('#copy_showUrl').on('click',function(){
	window.open($('#copy_content').val());
});
/*$('#showlogo1').on('click',function(){
	window.open($('#file').val());
});*/
$('#showlogo2').on('click',function(){
	window.open($('#servicefile1').val());
});
$('#showlogo3').on('click',function(){
	window.open($('#logo_url2').val());
});
/*$('#showlogo4').on('click',function(){
	window.open($('#file2').val());
});*/
$('#showlogo5').on('click',function(){
	window.open($('#copy_servicefile').val());
});
//=========================================================
//功能：首先通过staff!findone接口获取该用户的type_id，根据type_id调用
//     url!showAll接口获取该用户的url信息（type_id=0为管理员，可以获取
//     所有用户的url）
//=========================================================
function constructUrltable(total){
	$('#urltable').DataTable().destroy();
	$('#urltable tbody').empty();
	var $tr;			
	for ( var i = 0; i < total; i++ ) {
	var jsonurl =JSON.stringify( publicElement.messages[i].content );
	if(jsonurl.length>0){
		jsonurl = "<button class='btn btn-link'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></button>";
	}
	                					
	var collapse_id = 'majors_collapse'+i;
	var sessionStr = '<a class="btn btn-default btn-xs btn-block" role="button" data-toggle="collapse" href="#'+collapse_id+'" aria-expanded="false" aria-controls="collapseExample">'+
	             '<span class="glyphicon glyphicon-hand-down" aria-hidden="true"></span></a>'+
                 '<div class="collapse" id="'+collapse_id+'"><div class="well">';
	var sessions = publicElement.messages[i].sessions;
	//console.log('sessions:'+sessions);
	/*for(var j=0;j<sessions.length;j++){
		var majors = sessions[j].majors;
		//console.log('majors:'+majors);
		for(var k=0;k<majors.length;k++){
			var major = majors[k].major;
			//console.log('major:'+major);
			var minors = majors[k].minors;
			//console.log('minors:'+minors);
			for(var m=0;m<minors.length;m++){
				var minor = minors[m].value0 + '-' + minors[m].value1;
				//console.log('minor'+minor);
				sessionStr = sessionStr + major + ':' + minor + '<br/>';	
			}
		}
	}*/
	for(var key in sessions){
		var major = key;
		var minors = sessions[key];
		for(var j=0;j<minors.length;j++){
			var minor = minors[j].value0 + '-' + minors[j].value1;
			sessionStr += major + ':' + minor + '<br/>';
		}
	}
	sessionStr += '</div></div>';
	                	
	$tr = null;
	if(publicElement.manage == '0'){//暂时屏蔽掉manage=0(表示无审核权限)用户的任何修改能力
		if(publicElement.messages[i].status == '1'){
			$tr = $("<tr style='background-color:#fee8dd'><td>"+publicElement.messages[i].message_id+"</td><td>"+publicElement.messages[i].title+
		            "</td><td>"+publicElement.messages[i].name+"</td><td><img src='"+publicElement.messages[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+sessionStr+"</td><td>"+
		            publicElement.messages[i].project_title+"</td><td>"+publicElement.messages[i].other_info+"</td><td>"+publicElement.messages[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-info btn-xs'>"+
		            " 修改 </a> <a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}else if(publicElement.messages[i].status == '2'){
		    $tr = $("<tr style='background-color:#abffda'><td>"+publicElement.messages[i].message_id+"</td><td>"+publicElement.messages[i].title+
		            "</td><td>"+publicElement.messages[i].name+"</td><td><img src='"+publicElement.messages[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+sessionStr+"</td><td>"+
		            publicElement.messages[i].project_title+"</td><td>"+publicElement.messages[i].other_info+"</td><td>"+publicElement.messages[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-info btn-xs'>"+
		            " 修改 </a> <a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}else if(publicElement.messages[i].status == '3'){
		    $tr = $("<tr style='background-color:#e8e8e8'><td>"+publicElement.messages[i].message_id+"</td><td>"+publicElement.messages[i].title+
		            "</td><td>"+publicElement.messages[i].name+"</td><td><img src='"+publicElement.messages[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+sessionStr+"</td><td>"+
		            publicElement.messages[i].project_title+"</td><td>"+publicElement.messages[i].other_info+"</td><td>"+publicElement.messages[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-info btn-xs'>"+
		            " 修改 </a> <a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}else{
		    $tr = $("<tr style='background-color:#d95700'><td>"+publicElement.messages[i].message_id+"</td><td>"+publicElement.messages[i].title+
		            "</td><td>"+publicElement.messages[i].name+"</td><td><img src='"+publicElement.messages[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+sessionStr+"</td><td>"+
		            publicElement.messages[i].project_title+"</td><td>"+publicElement.messages[i].other_info+"</td><td>"+publicElement.messages[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}
	}else{
		if(publicElement.messages[i].status == '1'){
			$tr = $("<tr style='background-color:#fee8dd'><td>"+publicElement.messages[i].message_id+"</td><td>"+publicElement.messages[i].title+
		            "</td><td>"+publicElement.messages[i].name+"</td><td><img src='"+publicElement.messages[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+sessionStr+"</td><td>"+
		            publicElement.messages[i].project_title+"</td><td>"+publicElement.messages[i].other_info+"</td><td>"+publicElement.messages[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-info btn-xs'>"+
		            " 审核 </a><br/><a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-danger btn-xs'>删除</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}else if(publicElement.messages[i].status == '2'){
		    $tr = $("<tr style='background-color:#abffda'><td>"+publicElement.messages[i].message_id+"</td><td>"+publicElement.messages[i].title+
		            "</td><td>"+publicElement.messages[i].name+"</td><td><img src='"+publicElement.messages[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+sessionStr+"</td><td>"+
		            publicElement.messages[i].project_title+"</td><td>"+publicElement.messages[i].other_info+"</td><td>"+publicElement.messages[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-info btn-xs'>"+
		            " 修改 </a><br/><a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-danger btn-xs'>删除</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}else if(publicElement.messages[i].status == '3'){
		    $tr = $("<tr style='background-color:#e8e8e8'><td>"+publicElement.messages[i].message_id+"</td><td>"+publicElement.messages[i].title+
		            "</td><td>"+publicElement.messages[i].name+"</td><td><img src='"+publicElement.messages[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+sessionStr+"</td><td>"+
		            publicElement.messages[i].project_title+"</td><td>"+publicElement.messages[i].other_info+"</td><td>"+publicElement.messages[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-info btn-xs'>"+
		            " 修改 </a><br/><a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-danger btn-xs'>删除</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}else{
		    $tr = $("<tr style='background-color:#d95700'><td>"+publicElement.messages[i].message_id+"</td><td>"+publicElement.messages[i].title+
		            "</td><td>"+publicElement.messages[i].name+"</td><td><img src='"+publicElement.messages[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+sessionStr+"</td><td>"+
		            publicElement.messages[i].project_title+"</td><td>"+publicElement.messages[i].other_info+"</td><td>"+publicElement.messages[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}
	}
	                		                
	$tr.attr("message_id",publicElement.messages[i].message_id);
	$tr.attr("device_id",publicElement.messages[i].device_id);
	$tr.attr("index",i);
	                
	$tr.on("click",function(e){
	    var $target = $(e.target);
	    if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){		                    
	        findone($target.parents("tr").attr("message_id"));
	    }else if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
	        var V = new validateFormInput( $('#edit_one') );
	        V.destroy();
	        edit($target.parents("tr").attr("index"));
	    }else if($target.hasClass("btn-danger")||$target.parent().hasClass("btn-danger")) {
	        del($target.parents("tr").attr("message_id"));
	    }else if($target.hasClass("btn-warning")||$target.parent().hasClass("btn-warning")){
	    	copy($target.parents("tr").attr("message_id"));
	    }else if($target.hasClass("btn-link")||$target.parent().hasClass("btn-link")){
	    	window.open(publicElement.messages[$target.parents("tr").attr("index")].content);
	    }else if($target.hasClass("btn-primary") || $target.parent().hasClass("btn-primary")){
	    	showSessions($target.parents("tr").attr("message_id"),publicElement.messages[$target.parents("tr").attr("index")].page_id);
	    }
	});

	$('#urltable tbody').append($tr);
	
}

$('#urltable').dataTable(
	{
	     "order": [ 8, 'desc' ],
	     "columns": [
		             { "width": "7%" },
		             { "width": "10%" },
		             { "width": "11%" },
		             { "width": "6%" },
		             { "width": "5%" },
		             { "width": "10%" },
		             { "width": "11%" },
		             { "width": "9%" },
		             { "width": "15%" },
		             { "width": "16%" }
		            ]
	}
);
}

function constructUnBindUrlTable(total){
	$('#unBindUrltable').DataTable().destroy();
	$('#unBindUrltable tbody').empty();
	var $tr;			
	for ( var i = 0; i < total; i++ ) {
		var jsonurl =JSON.stringify( publicElement.unBindUrls[i].content );
		if(jsonurl.length>0){
			jsonurl = "<button class='btn btn-link'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></button>";
		}
		                					
		$tr = null;
		if(publicElement.unBindUrls[i].status == '1'){
			$tr = $("<tr style='background-color:#fee8dd'><td>"+publicElement.unBindUrls[i].id+"</td><td>"+publicElement.unBindUrls[i].title+
		            "</td><td>"+publicElement.unBindUrls[i].name+"</td><td><img src='"+publicElement.unBindUrls[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+
		            getProjectById(publicElement.unBindUrls[i].project_id)+"</td><td>"+publicElement.unBindUrls[i].other_info+"</td><td>"+publicElement.unBindUrls[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-info btn-xs'>"+
		            " 审核 </a><br/><a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-danger btn-xs'>删除</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}else if(publicElement.unBindUrls[i].status == '2'){
		    $tr = $("<tr style='background-color:#abffda'><td>"+publicElement.unBindUrls[i].id+"</td><td>"+publicElement.unBindUrls[i].title+
		            "</td><td>"+publicElement.unBindUrls[i].name+"</td><td><img src='"+publicElement.unBindUrls[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+
		            getProjectById(publicElement.unBindUrls[i].project_id)+"</td><td>"+publicElement.unBindUrls[i].other_info+"</td><td>"+publicElement.unBindUrls[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-info btn-xs'>"+
		            " 修改 </a><br/><a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-danger btn-xs'>删除</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}else if(publicElement.unBindUrls[i].status == '3'){
		    $tr = $("<tr style='background-color:#e8e8e8'><td>"+publicElement.unBindUrls[i].id+"</td><td>"+publicElement.unBindUrls[i].title+
		            "</td><td>"+publicElement.unBindUrls[i].name+"</td><td><img src='"+publicElement.unBindUrls[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+
		            getProjectById(publicElement.unBindUrls[i].project_id)+"</td><td>"+publicElement.unBindUrls[i].other_info+"</td><td>"+publicElement.unBindUrls[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-info btn-xs'>"+
		            " 修改 </a><br/><a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-danger btn-xs'>删除</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}else{
		    $tr = $("<tr style='background-color:#d95700'><td>"+publicElement.unBindUrls[i].id+"</td><td>"+publicElement.unBindUrls[i].title+
		            "</td><td>"+publicElement.unBindUrls[i].name+"</td><td><img src='"+publicElement.unBindUrls[i].logo_url+"' /></td><td>"+jsonurl+"</td><td>"+
		            getProjectById(publicElement.unBindUrls[i].project_id)+"</td><td>"+publicElement.unBindUrls[i].other_info+"</td><td>"+publicElement.unBindUrls[i].end_time+"</td><td class='center'> <a class='btn btn-success btn-xs'>查看</a> <a class='btn btn-warning btn-xs'>复制</a> <a class='btn btn-primary btn-xs'>增减</a></td></tr>");
		}
		                		                
		$tr.attr("message_id",publicElement.unBindUrls[i].id);
		$tr.attr("index",i);
		                
		$tr.on("click",function(e){
		    var $target = $(e.target);
		    if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){		                    
		        findoneUnbindUrl($target.parents("tr").attr("index"));
		    }else if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
		        var V = new validateFormInput( $('#edit_one') );
		        V.destroy();
		        editUnbindUrl($target.parents("tr").attr("index"));
		    }else if($target.hasClass("btn-danger")||$target.parent().hasClass("btn-danger")) {
		        del($target.parents("tr").attr("message_id"));
		    }else if($target.hasClass("btn-warning")||$target.parent().hasClass("btn-warning")){
		    	copyUnbindUrl($target.parents("tr").attr("index"));
		    }else if($target.hasClass("btn-link")||$target.parent().hasClass("btn-link")){
		    	window.open(publicElement.unBindUrls[$target.parents("tr").attr("index")].content);
		    }else if($target.hasClass("btn-primary") || $target.parent().hasClass("btn-primary")){
		    	//showSessions($target.parents("tr").attr("message_id"),publicElement.unBindUrls[$target.parents("tr").attr("index")].page_id);
		    }
		});
		$('#unBindUrltable tbody').append($tr);
	}
	$('#unBindUrltable').dataTable({
	     "order": [ 7, 'desc' ],
	     "columns": [
             { "width": "7%" },
             { "width": "13%" },
             { "width": "13%" },
             { "width": "6%" },
             { "width": "5%" },
             { "width": "11%" },
             { "width": "12%" },
             { "width": "17%" },
             { "width": "16%" }]
	});
	$.unblockUI();
}

function getMessages(flags){
	$.blockUI({ message: '<img src="./images/busy.gif" />' });
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!showList?staff_id="+publicElement.login_id+"&flag="+flags+"&jsoncallback=?";			
	$.getJSON(
		url,
		function( result ) {
			if (!result.success) {
				$.unblockUI();
				return;
			}
			publicElement.messages = result.message;
			constructUrltable(result.total);
			$.unblockUI();
	});	  
}

function getUnBindUrls(){
	$.blockUI({ message: '<img src="./images/busy.gif" />' });
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!showkongurlList?staff_id="+publicElement.login_id+"&jsoncallback=?";			
	$.getJSON(
		url,
		function( result ) {
			if (!result.success) {
				$.unblockUI();
				return;
			}
			publicElement.unBindUrls = result.message;
			constructUnBindUrlTable(result.total);
			
	});	  
}

function getProjectById(id) {
	var len = publicElement.project.length;
	for(var i=0;i<len;i++) {
		if(publicElement.project[i].project_id == id) return publicElement.project[i].title;
	}
	return "";
}

function getTotalNumber(){
	var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!getTotalNumber?staff_id="+publicElement.login_id+"&jsoncallback=?";
	$.getJSON(
		url,
		function(result){
			if(!result){
				console.log("获取该用户url总数失败");
				return;
			}
			$("#Paging-total span").text(Math.ceil(result.totalNumber/10));
			$("#JumpToPageForm input").attr("max",Math.ceil(result.totalNumber/10));
			return;
		}
	);
}

//=======================================================
//功能：调用project!findproject接口获取某用户拥有的项目，
//     并缓存在publicElement.project中
//=======================================================
function getProject(){
	var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/project!findproject?staff_id="+publicElement.login_id+"&jsoncallback=?";
	$.getJSON(
		url,
		function(result){
			if(!result.success){
				return;
			}else{
				publicElement.project = result.project;
				getUnBindUrls();
			}
		}
	);
}

//==========================================================================
//功能：调用staff!findone接口获取该用户所拥有的Beacon号段（uuid/major/minor）填充进
//     折叠表格中
//==========================================================================
function getSessionCollapseList(){
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/staff!findone?user_id="+publicElement.login_id+"&jsoncallback=?";
	$.getJSON(
		url,
		function(result){
			if(!result.success){
				return;
			}else{
				if(result.staff[0].session == 'all'){
					$('#sessionCollapse_table tbody').empty();
					$tr = $('<tr><td>all</td><td>all</td><td>all</td></tr>');
					$('#sessionCollapse_table tbody').append($tr);
				}else if(result.staff[0].session.length > 0){
					var $tr = null;
					$('#sessionCollapse_table tbody').empty();
					var uuid = "";
					var majors = "";
					var minors = "";
					var minor = "";
					var major = "";
					for(var i=0;i<result.staff[0].session.length;i++){
						uuid = result.staff[0].session[i].value;
						majors = result.staff[0].session[i].majors?result.staff[0].session[i].majors:[];
						for(var j=0;j<majors.length;j++){
							major = majors[j].value;
							minors = majors[j].sections?majors[j].sections:[];
							for(var k=0;k<minors.length;k++){
								minor = minors[k].value0+"-"+minors[k].value1;
								$tr = $('<tr><td>'+uuid.substring(0, 8)+'......'+uuid.substr(uuid.length-8)+'</td><td>'+major+'</td><td>'+minor+'</td></tr>');
								$('#sessionCollapse_table tbody').append($tr);
							}
						}
					}
					$('#sessionCollapse_table').dataTable(
							{
							     "order": [ 1, 'asc' ],
							     "columns": [
								             { "width": "50%" },
								             { "width": "20%" },
								             { "width": "30%" }
								            ]
							}
					);
				}else{
					return;
				}
			}
		}
	);
}

//==========================================================================
//功能：调用statistic!unusedev接口获取该用户未绑定页面的Beacon号段（uuid/major/minor）
//     填充进折叠表格中
//==========================================================================
function getUnUseDevice(){
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/statistic!unusedev?staff_id="+publicElement.login_id+"&jsoncallback=?";
	$.getJSON(
		url,
		function(result){
			if(!result.success){
				return;
			}else{
				if(result.session == 'all'){
					$('#unUseDeviceCollapse_table tbody').empty();
					$tr = $('<tr><td>all</td><td>all</td><td>all</td></tr>');
					$('#unUseDeviceCollapse_table tbody').append($tr);
				}else if(result.session.length > 0){
					var $tr = null;
					$('#unUseDeviceCollapse_table tbody').empty();
					var uuid = "";
					var majors = "";
					var minors = "";
					var minor = "";
					var major = "";
					for(var i=0;i<result.session.length;i++){
						uuid = result.session[i].uuid;
						majors = result.session[i].major?result.session[i].major:[];
						for(var j=0;j<majors.length;j++){
							major = majors[j].value;
							minors = majors[j].sections?majors[j].sections:[];
							for(var k=0;k<minors.length;k++){
								minor = minors[k].value0+"-"+minors[k].value1;
								$tr = $('<tr><td>'+uuid.substring(0, 8)+'......'+uuid.substr(uuid.length-8)+'</td><td>'+major+'</td><td>'+minor+'</td></tr>');
								$('#unUseDeviceCollapse_table tbody').append($tr);
							}
						}
					}
					$('#unUseDeviceCollapse_table').dataTable(
							{
							     "order": [ 1, 'asc' ],
							     "columns": [
								             { "width": "50%" },
								             { "width": "20%" },
								             { "width": "30%" }
								            ]
							}
					);
				}else{
					return;
				}
			}
		}
	);
}
//========================
//功能：弹出‘编辑url’的modal
//========================
function edit(id){
    insertProject("project_id2",publicElement.messages[id].project_id);
    
    $("#edit_one").modal("show");
    $("#file2").val("");
    $("#id2").val(publicElement.messages[id].message_id);
    $("#url_id2").val(publicElement.messages[id].message_id);
    $("#page_id2").val(publicElement.messages[id].page_id);
    $('#logo_url2').val(publicElement.messages[id].logo_url);
    $("#start_time").val(publicElement.messages[id].start_time);
    $("#title2").val(publicElement.messages[id].title);
    $("#name2").val(publicElement.messages[id].name);
    $("#content2").val(publicElement.messages[id].content);
    $("#other_info2").val(publicElement.messages[id].other_info);
    
    //console.log($('#project_id2 option:selected').val());    
}

function editUnbindUrl(id){
    insertProject("project_id2",publicElement.unBindUrls[id].project_id);
    
    $("#edit_one").modal("show");
    $("#id2").val(publicElement.unBindUrls[id].id);
    $("#page_id2").val(publicElement.unBindUrls[id].page_id);
    $('#logo_url2').val(publicElement.unBindUrls[id].logo_url);
    $("#start_time").val(publicElement.unBindUrls[id].start_time);
    $("#title2").val(publicElement.unBindUrls[id].title);
    $("#name2").val(publicElement.unBindUrls[id].name);
    $("#content2").val(publicElement.unBindUrls[id].content);
    $("#other_info2").val(publicElement.unBindUrls[id].other_info);
}


function del(message_id){
	if(confirm("请确保您要删除的条目已不再使用，否则删除后原来绑定的beacon设备将无法摇出页面！") == true){
		var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!delete?urlId="+message_id+"&jsoncallback=?";
	    $.getJSON(
	        url,
	        function( result ) {
	            if(result.success){
	            	alert("删除成功");
	            	location.reload();
	            }else{
	            	alert(result.message);
	            }
	        }
	    );
	}else{
		return;
	}
    
}

//=============================================
//功能：   调用url!showDetail接口获取某个url的详细信息
//=============================================
function findone(messageId){
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!showDeList?urlId="+messageId+"&staff_id="+publicElement.login_id+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
        	if(!result.success){
        		return;
        	}
            $("#show_one").modal("show");
            $("#collapseInfo").collapse('hide');
            
            $("#title1").val(result.message[0].title);
            $("#name1").val(result.message[0].name);
            $("#content1").val(result.message[0].content);  
            $("#servicefile1").val(result.message[0].logo_url);  
			$("#project_id1").val(result.message[0].project_title);
			$("#page_id1").val(result.message[0].page_id);
			$('#last_modify').val(result.message[0].last_modify_id);
			$("#time1").val(result.message[0].start_time);
			$("#other_info1").val(result.message[0].other_info);
			
			if(result.message[0].status == '1'){
				$("#status1").val('未审核');
			}else if(result.message[0].status == '2'){
				$("#status1").val('审核通过');
			}else if(result.message[0].status == '3'){
				$("#status1").val('审核未通过');
			}else{
				$("#status1").val('删除');
			}
			
			var sessions = result.message[0].sessions;
			var device = result.message[0].devices;
			var $tr = null;
			var devcount = 0;
			$('#collapse_table tbody').empty();
			for(var i=0;i<sessions.length;i++){
				var uuid = sessions[i].uuid;
				var majors = sessions[i].majors;
				for(var j=0;j<majors.length;j++){
					var major = majors[j].major;
					minors = majors[j].minors;
					for(var k=0;k<minors.length;k++){
						var minor = minors[k].value0 + '-' + minors[k].value1;
						
						var all = device[devcount].all;
						var ziyuan = minors[k].value1 - minors[k].value0 + 1;
						$tr = $('<tr><td>'+uuid+'</td><td>'+major+'</td><td>'+minor+'</td><td>'+ziyuan+'</td><td>'+all+'</td></tr>');
						$('#collapse_table tbody').append($tr);	
						devcount++;
					}
				}
			}			
        }
    );

}

function findoneUnbindUrl(id){
    $("#show_one").modal("show");
    $("#collapseInfo").collapse('hide');
    $("#title1").val(publicElement.unBindUrls[id].title);
    $("#name1").val(publicElement.unBindUrls[id].name);
    $("#content1").val(publicElement.unBindUrls[id].content);  
    $("#servicefile1").val(publicElement.unBindUrls[id].logo_url);  
	$("#project_id1").val(getProjectById(publicElement.unBindUrls[id].project_id));
	$("#page_id1").val(publicElement.unBindUrls[id].page_id);
	$('#last_modify').val(publicElement.unBindUrls[id].last_modify_id);
	$("#time1").val(publicElement.unBindUrls[id].start_time);
	$("#other_info1").val(publicElement.unBindUrls[id].other_info);
	
	if(publicElement.unBindUrls[id].status == '1'){
		$("#status1").val('未审核');
	}else if(publicElement.unBindUrls[id].status == '2'){
		$("#status1").val('审核通过');
	}else if(publicElement.unBindUrls[id].status == '3'){
		$("#status1").val('审核未通过');
	}else{
		$("#status1").val('删除');
	}			
}

//================================================
//功能：   复制功能，免去用户重复输入信息，利用url!showDeList
//      接口获取某条url数据填充进复制modal，方便用户新增
//================================================
function copy(messageId){
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!showDeList?urlId="+messageId+"&staff_id="+publicElement.login_id+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
        	if(!result.success){
        		return;
        	}
        	
            $("#copyModal").modal("show");
            
            $("#copy_title").val(result.message[0].title);
            $("#copy_name").val(result.message[0].name);
            $("#copy_content").val(result.message[0].content);
            $("#copy_servicefile").val(result.message[0].logo_url);  
			$("#copy_other_info").val(result.message[0].other_info);
			insertProject("copy_project_id",result.message[0].project_id);
        }
    );
    $('#copy_url_sessions').empty();
	//addSessions('copy_url_sessions');
}

function copyUnbindUrl(id){
    $("#copyModal").modal("show");
    $("#copy_title").val(publicElement.unBindUrls[id].title);
    $("#copy_name").val(publicElement.unBindUrls[id].name);
    $("#copy_content").val(publicElement.unBindUrls[id].content);
    $("#copy_servicefile").val(publicElement.unBindUrls[id].logo_url);  
	$("#copy_other_info").val(publicElement.unBindUrls[id].other_info);
	insertProject("copy_project_id",publicElement.unBindUrls[id].project_id);
    $('#copy_url_sessions').empty();
	//addSessions('copy_url_sessions');
}

//================================================
//功能：   提交复制modal内容进行新增url
//================================================
$('#submitCopy').on('click',function(){
	var V = new validateFormInput($('#copyModal'));
	if(V.validate()){
		if($('#copy_url_sessions').children('.add_uuid').length){
			/*console.log('未添加Beacon,失败');
			alert('至少添加一个Beacon,或添加Beacon不符合规定');
			return;*/
			if(validateSession($('#copy_url_sessions'))){
				console.log('添加Beacon符合规范');
			}else{
				console.log('sessions填写不符合规范,失败');
				alert('添加Beacon不符合规定');
				return;
			}
		}
		var jsonObj = [{
			"parent_id": publicElement.login_id,
			"title": $('#copy_title').val(),
			"name": $('#copy_name').val(),
			"content": encodeURIComponent($('#copy_content').val()),
			"other_info": $('#copy_other_info').val(),
			"session": getSessionsArray('copy_url_sessions'),
			"project_id": $('#copy_project_id').val(),
			"logo_url": $('#copy_servicefile').val()
		}];
		var jsonStr = JSON.stringify(jsonObj);
		console.log(jsonStr);
		$('#copyModal').block({ message: '<img src="./images/busy.gif" />' });
		var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!add?jsonstr="+jsonStr+"&jsoncallback=?";
		$.getJSON(
			url,
			function(result){
				if(!result.success){
					alert(result.message);
					$('#copyModal').unblock();
					return;
				}else{
					var pageError = result.pageError?result.pageError:"";
					var logoError = result.logoError?result.logoError:"";
					if(pageError == "" && logoError == ""){
						alert('url审核通过');
						$('#copyModal').unblock();
						location.reload();
					}else{
						var errorStr = "";
						if(pageError != "" && pageError.length > 0){
							errorStr += "配置信息错误：";
							errorStr += pageError;
						}
						if(logoError != "success." && logoError.length>0 ){
							errorStr += "配置logo错误：";
							errorStr += logoError;
						}
						alert(errorStr);
						$('#copyModal').unblock();
						return;
					}						
				}
			}
		);
		
	}else{
		return;
	}
});
//==================================================
//功能：   使用缓存的publicElement.project将项目填充到下拉列
//      表中，参数id是要插进项目内容的select下拉列表id，
//      projectId参数是调用insertProject函数的url所隶属的
//      项目，把这个项目置为selected
//==================================================
function insertProject(id,projectId){
	$('#'+id).empty();
	var $tr = null;
	var project_id = "";
	var title = "";
	if(!publicElement.project.length){
		$tr = $("<option value=''>无</option>");
		$('#'+id).append($tr);
	}else{
		for(var i=0;i<publicElement.project.length;i++){
			project_id = publicElement.project[i].project_id;
			title = publicElement.project[i].title;
			if(project_id == projectId){
				$tr = $("<option value='"+project_id+"' selected>"+title+"</option>");
				$('#'+id).append($tr);
			}else{
				$tr = $("<option value='"+project_id+"'>"+title+"</option>");
				$('#'+id).append($tr);
			}					
		}
	}
}

//==================================================
//功能：  当表单中type='file'域发生变化时，利用readAsDataURL
//     读取图片文件并加载到id为myImg的<img>标签中，是为了后面
//     借此获得上传图片的长宽，用于验证格式
//==================================================
function uploadPic(file){
	if(file){
		var reader = new FileReader();
	    reader.onload = function(e){
	        $('#myImg').attr('src',e.target.result);
	    }
	    reader.readAsDataURL(file);  
	}	         
}

//==================================================
//功能：  参数file为type=‘file’表单域上传的文件，参数id是该表单
//     域的id;该函数用于验证上传图片的格式、长宽、形状是否符合规
//     范,返回标志位
//==================================================
function checkPicture(file,id){
	var flag = true;
    if(file){
        var picType = (file.type).toLocaleLowerCase(); 
        if(picType != 'image/png' &&  picType != 'image/jpg' && picType != 'image/gif' && picType != 'image/jpeg'){
            alert('图片格式不正确');
            $('#'+id).val("");
            flag = false;
        }else{
            if($('#myImg').width() != $('#myImg').height()){
                alert("图片必须为正方形");
                $('#'+id).val("");     
                flag = false;       
            }else if($('#myImg').width()>200 || $('#myImg').height()>200){
                alert("图片长宽必须小于200");
                $('#'+id).val("");          
                flag = false;
            }else{
            	flag = true;
                //alert('图片符合要求');
            }                              
        }
    }else{
    	flag = false;
    } 
    return flag; 
}

//================================================================
//功能：  验证url和uuid/major/minor是否重复
//================================================================
function checkRepeat(url,session){
	var flag = true;
	var jsonObj = [{
			"url": url,
			"session": session
	}];
	var jsonstr = JSON.stringify(jsonObj);
	var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!check?jsonstr="+jsonstr+"&jsoncallback=?";
	/*$.ajaxSettings.async = false;*/
	$.getJSON(
		url,
		function(result){
			if(!result.success){
				flag = false;
			}else{
				flag = true;
			}
			return flag;
		}
	);
}


//================================================================
//功能：  新增url的modal表单提交前执行的函数，首先通过validateFormInput验证各个
//     表单域是否为空、为数字等等规范;验证通过后通过checkPicture
//     继续验证图片格式;图片格式验证通过后，最后通过validateSession
//     验证添加的uuid、major、minor是否符合规范
//================================================================
function validateForm1() {
	
	var V = new validateFormInput($('#add_one'));
	if(V.validate()){
		var file = document.getElementById('file').files[0];//这里不能写成$('#file').files[0]
		var flag = checkPicture(file,"file");
		if(!flag){
			console.log("checkPicture函数验证失败"+flag);
			return false;
		}else{
			console.log("checkPicture函数验证正确"+flag);
			if(!$('#url_sessions').children('.add_uuid').length){
				/*console.log('未添加Beacon,失败');
				alert('至少添加一个Beacon,或添加Beacon不符合规定');
				return false;*/
				return true;
			}else{
				if(validateSession($('#url_sessions'))){
					console.log('添加Beacon符合规范');
					return true;
				}else{
					console.log('sessions填写不符合规范,失败');
					alert('添加Beacon不符合规定');
					return false;
				}
			}
		}
	}else{
		return false;
	}	
}

//======================================================
//功能：  新增url的modal表单提交成功后执行的函数，参数responseText是
//	        后台返回的数据，格式可能是 json/xml...;将‘新增url’modal的数
//     据打包，这其中的session通过getSessionsArray函数获取一个数
//     组，其中包含了所有添加的uuid/major/minor数据；logo字段是通
//     过后台返回的responseText.logo得到的logo地址;调用url!add
//     接口，传入参数进行ajax验证新增url是否成功   
//======================================================
function packageInfo(responseText,statusText){
	if(responseText.success){
		console.log('转码前logo:'+responseText.logo);
		console.log('转码后logo:'+encodeURIComponent(responseText.logo));
		var jsonObj = [{
				"parent_id": publicElement.login_id,
				"title": $('#title').val(),
				"name": $('#name').val(),
				"content": encodeURIComponent($('#content0').val()),
				"other_info": $('#other_info').val(),
				"session": getSessionsArray('url_sessions'),
				"project_id": $('#project_id').val(),
				"logo": responseText.logo
				
		}];
		console.log(getSessionsArray('url_sessions'),responseText.logo);	
		var jsonStr = JSON.stringify(jsonObj);
		$('#add_one').block({ message: '<img src="./images/busy.gif" />' });
		var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!add?jsonstr="+jsonStr+"&jsoncallback=?";
		$.getJSON(
			url,
			function(result){
				if(!result.success){
					alert(result.message);
					$('#add_one').unblock();
					return;
				}else{
					var pageError = result.pageError?result.pageError:"";
					var logoError = result.logoError?result.logoError:"";
					if(pageError == "" && logoError == ""){
						alert('url审核通过');
						$('#add_one').unblock();
						location.reload();
					}else{
						var errorStr = "";
						if(pageError != "" && pageError.length > 0){
							errorStr += "配置信息错误：";
							errorStr += pageError;
						}
						if(logoError != "success." && logoError.length>0 ){
							errorStr += "配置logo错误：";
							errorStr += logoError;
						}
						alert(errorStr);
						$('#add_one').unblock();
						return;
					}
				}
			}
		);
	}else{
		alert(responseText.message);
		return;
	}	
}


//======================================================
//功能：  编辑url的modal表单提交前执行的函数,功能基本同validateForm1
//======================================================
function validateForm2() {
	var file = document.getElementById('file2').files[0];
	var flag = checkPicture(file,"file2");
	if(!flag){
		console.log("checkPicture函数验证失败"+flag);
		return false;
	}else{
		console.log("checkPicture函数验证正确"+flag);
		return true; 
	}			
}

//======================================================
//功能：  编辑url的modal表单提交成功后执行的函数，通过responseText
//     判断图片上传是否成功，若成功，通过responseText.logo获取图片
//     本地logo,然后调用submitEditInfo('logo',logo)函数进一步
//     调用编辑接口
//======================================================
function showResponse(responseText,statusText) {
	console.log("进入showResponse函数");
	if(responseText.success){
		console.log('转码前logo:'+responseText.logo);
		console.log('转码后logo:'+encodeURIComponent(responseText.logo));
		var logo = responseText.logo;
		submitEditInfo('logo',logo);
	}else{
		var msg = responseText.message;
		if(msg.indexOf("权限不足") != -1){
			alert(msg);
		}else{
			alert('修改失败');
			console.log("错误信息："+msg);
		}		
		return;
	}	
}

//======================================================
//功能：  参数flag表示提交的内容是服务器logo还是本地logo,分别取值为
//     'logo_url','logo';参数logo为图片地址；根据不同flag打包
//     json数据包调用url!edit接口编辑url,注意返回信息有所不同，即使
//     success字段为true,也不一定代表成功，只是表示上传到本地服务器
//     成功，需要进一步通过pageError、logoError判断在微信服务器是
//     否审核成功
//======================================================
function submitEditInfo(flag,logo){
	if(flag == 'logo'){
		var jsonObj = [{
			"staff_id": publicElement.login_id,
			"url_id": $('#id2').val(),
			"title": $('#title2').val(),
			"name": $('#name2').val(),
			"content": encodeURIComponent($('#content2').val()),
			"other_info": $('#other_info2').val(),
			"project_id": $('#project_id2').val(),
			"logo": logo
		}];
	}else if(flag =='logo_url'){
		var jsonObj = [{
			"staff_id": publicElement.login_id,
			"url_id": $('#id2').val(),
			"title": $('#title2').val(),
			"name": $('#name2').val(),
			"content": encodeURIComponent($('#content2').val()),
			"other_info": $('#other_info2').val(),
			"project_id": $('#project_id2').val(),
			"logo_url": logo
		}];
	}
	
	var jsonstr = JSON.stringify(jsonObj);
	console.log('转以后json:'+jsonstr);
	$('#edit_one').block({ message: '<img src="./images/busy.gif" />' });
	var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!edit?jsonstr="+jsonstr+"&jsoncallback=?";
	$.getJSON(
		url,
		function(result){
			if(!result.success){
				alert('调用url编辑接口失败：'+result.message);
				$('#edit_one').unblock();
				return;
			}else{
				var pageError = result.pageError?result.pageError:"";
				var logoError = result.logoError?result.logoError:"";
				if(pageError == "" && logoError == ""){
					alert('url审核通过');
					$('#edit_one').unblock();
					location.reload();
				}else{
					var errorStr = "";
					console.log(pageError+" "+logoError);
					if(pageError != "" && pageError.length > 0){
						errorStr += "配置信息错误：";
						errorStr += pageError;
					}
					if(logoError != "" && logoError.length>0 ){
						errorStr += "配置logo错误：invalid logo.";
					}
					alert(errorStr);
					$('#edit_one').unblock();
					return;
				}
			}
		}
	);
}

function submitCondition(){//提交
	var V = new validateFormInput($('#searchConditionModal'));
	if(V.validate()){
		var title = $('#condition_title').val()?$('#condition_title').val():"";
		var name = $('#condition_name').val()?$('#condition_name').val():"";
		var pr_title = $('#condition_project').val()?$('#condition_project').val():"";
		var major = $('#condition_major').val()?$('#condition_major').val():"";
		var minor = $('#condition_minor').val()?$('#condition_minor').val():"";
		var status = $('input[name="condition_state"]:checked').val()?$('input[name="condition_state"]:checked').val():"";
		var end_time = $('#condition_endDate').val()?$('#condition_endDate').val():"";
		var otherInfo = $('#condition_otherInfo').val()?$('#condition_otherInfo').val():"";
		var jsonObj = {
				"title": $.trim(title),
				"name": $.trim(name),
				"pr_title": $.trim(pr_title),
				"major": $.trim(major),
				"minor": $.trim(minor),
				"otherInfo": $.trim(otherInfo),
				"status": $.trim(status),
				"end_time": $.trim(end_time)
		};
		var jsonstr = JSON.stringify(jsonObj);
		console.log("条件筛选："+jsonstr);
		$('#searchConditionModal').block({ message: '<img src="./images/busy.gif" />' });
		var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!showListCon?staff_id="+publicElement.login_id+"&jsonstr="+jsonstr+"&jsoncallback=?";	 
		$.getJSON(
			url,
			function(result){
				if(!result.success){
					alert('未搜索到匹配信息，请重新输入搜索条件');
					$('#searchConditionModal').unblock();
					return;
				}				
				publicElement.messages = result.message;
				constructUrltable(result.total);
				
				//暂时隐藏分页
				$("#urltable_length,#urltable_info,#urltable_paginate").css("display","inline-block");
				$("#Paging-div").css("display","none");
				//暂时隐藏分页
				$('#searchConditionModal').unblock();
				$('#searchConditionModal').modal("hide");
			}
		);
		
		
	}else{
		return;
	}
}

function showSessions(message_id, page_id){
	var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!showDeList?urlId="+message_id+"&staff_id="+publicElement.login_id+"&jsoncallback=?";
	$.getJSON(
		url,
		function(result){
			if(!result.success){
				return;
			}
			var sessions = result.message[0].sessions;
			if($.isArray(sessions)){
            	$("#show_sessions").html("");
                for(var i=0;i<sessions.length;i++){
                    var obj = sessions[i];
                    var uuid = obj.uuid;
                    $tr1 = $("<div class='add_uuid'>" +
                        "<div class='form-group form-group-sm'> <label class='col-md-2 control-label'>UUID</label>" +
                        "<div class='col-md-7 col-md-offset-1'><input type='text' class='form-control validate_notNull' value="+uuid+"></div> " +
                        "<a class='btn btn-success btn-xs add_uuid_btn'> <i class='glyphicon glyphicon-plus'></i> </a> " +
                        "<a class='btn btn-danger btn-xs del_uuid_btn'> <i class='glyphicon glyphicon-minus'></i> </a></div>" );
                    $tr1.append("<div class='add_major'></div>")
                    var majorarr = obj.majors;
                    for(var j = 0; j < majorarr.length; j ++){
                        var major = majorarr[j].major;
                        $tr2 = $(
                            "<div class='form-group form-group-sm '><label class='col-md-2 col-md-offset-1 control-label'>major</label>" +
                            "<div class='col-md-6 col-md-offset-1'><input type='text' class='form-control validate_number validate_notNull' value="+major+"></div> " +
                            "<a class='btn btn-success btn-xs add_major_btn'> <i class='glyphicon glyphicon-plus'></i> </a> " +
                            "<a class='btn btn-danger btn-xs del_major_btn'> <i class='glyphicon glyphicon-minus'></i> </a>" +
                            "</div>" +
                            "<div class='add_minor'></div>"
                            );            

                        $minor = $($tr2[1]);
                        var sectionarr = majorarr[j].minors;
                        for(var k = 0; k < sectionarr.length; k ++){
                            var minor1 = sectionarr[k].value0;
                            var minor2 = sectionarr[k].value1;
                            $tr3 = $("<div class='form-group form-group-sm '>" +
                                "<label class='col-md-2 col-md-offset-2 control-label'>minor</label>" +
                                "<div class='col-md-2 '><input type='text' class='form-control validate_number validate_notNull' value="+minor1+"></div> " +
                                "<label class='col-md-1  control-label'>至</label>" +
                                "<div class='col-md-2 '><input type='text' class='form-control validate_number validate_notNull' value="+minor2+"></div>" +
                                "<a class='btn btn-danger btn-xs del_minor_btn'> <i class='glyphicon glyphicon-minus'></i> </a></div>");
                            $minor.append($tr3);

                        }
                        $major = $($($tr1[0]).children()[1]);
                        
                        $major.append($tr2);
                    }
                    $tr1.on("click",function(e){
                        var $target = $(e.target);
                        if($target.hasClass("add_uuid_btn")||$target.parent().hasClass("add_uuid_btn")){
                            while(!$target.next().hasClass("add_major")){
                                $target=$($target.parent());
                            }
                            add_Major( $target.next());

                        }else if($target.hasClass("del_uuid_btn")||$target.parent().hasClass("del_uuid_btn")) {

                        	 if(confirm("是否确认删除该号段？") == true){
             	            	while(!$target.next().hasClass("add_major")){
             		                $target=$($target.parent());
             		            }
             		            $target.parent().remove();
             	            }else{
             	            	return;
             	            }

                        }
                        else if($target.hasClass("add_major_btn")||$target.parent().hasClass("add_major_btn")) {
                            while(!$target.next().hasClass("add_minor")){
                                $target=$($target.parent());
                            }
                            add_Minor( $target.next());
                            //console.log( "add_major_btn");
                        }
                        else if($target.hasClass("del_major_btn")||$target.parent().hasClass("del_major_btn")) {
                        	 if(confirm("是否确认删除该号段？") == true){
             	            	while(!$target.next().hasClass("add_minor")){
             		                $target=$($target.parent());
             		            }
             		            $target.next().remove();
             		            $target.remove();
             	            }else{
             	            	return;
             	            }
                        }
                        else if($target.hasClass("del_minor_btn")||$target.parent().hasClass("del_minor_btn")) {
                        	  if(confirm("是否确认删除该号段？") == true){
              	            	while(!$target.parent().hasClass("add_minor")){
              		                $target=$($target.parent());
              		            }
              		            $target.remove();
              	            }else{
              	            	return;
              	            }
                        }
                    });
                    $("#show_sessions").append($tr1);
                    $("#submitSessionsChange").attr("msg_id",message_id);
                    $("#submitSessionsChange").attr("page_id",page_id);
                    $("#showSessionsModal").modal("show");
                }
            }
		}
	);
}

function submitSessionsChange(msg_id, page_id){
	var V = new validateFormInput($('#showSessionsModal'));
    if(V.validate()){ 
    	if(validateSession($('#show_sessions'))){
    		
    		var uuidarr = getSessionsArray('show_sessions');    	   
    	    if(!uuidarr.length){
    	    	uuidarr = [];
    	    }
    	  
    	    var jsonstr=[];
    	    jsonstr.push({
    	    	parent_id:publicElement.login_id,
    	    	message_id:msg_id,
    	        session:uuidarr,
    	        page_id:page_id
    	    });
    		jsonstr = JSON.stringify(jsonstr);
    		console.log(jsonstr);
    		
    		var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!adddelete?jsonstr="+jsonstr+"&jsoncallback=?";
    		$.getJSON(
    			url,
    			function(result){
    				if(!result.success){
    					alert(result.message);
    					return;
    				}
    				alert(result.message);
    			}
    		);
    	}else{
    		alert("号段不合法.");
    		return;
    	}   	
    }else{
    	return;
    }
}

$(function(){
    publicElement.login_id = $("#login_id").attr("uid");
    publicElement.manage = $("#login_id").attr("manage");
    getMessages(publicElement.currentPageNum);//加载主页面url信息
    
    getTotalNumber();
    getProject();//获取该用户项目缓存到publicElement元素中
    getSessionCollapseList();//获取该用户Beacon号段信息
    getUnUseDevice();//获取该用户位绑定页面Beacon号段
    $('#sessionCollapse').collapse('hide');
    $('#unUseDeviceCollapse').collapse('hide');
    $('#submitConditionBtn').click(submitCondition);
  //配置日期插件参数
	$('.datetimepicker').datetimepicker({
		format: 'yyyy-mm-dd hh:ii:ss',
	    autoclose: true,
	    minView: 'hour',
	   // startView: 'year',
	    todayBtn: 'linked',
	    todayHighlight: true
	});
    
   /* if(publicElement.manage == '0'){//暂时屏蔽掉manage=0用户的添加Url能力
    	$('#addUrlBtn').hide();
    }*/
    
    //当点击选择图片按钮选择了一张图片后，先调用uploadPic函数将图片放进ID为myImg这个img标签中，用于之后对于图片格式的审核
    $('#file').on('change',function(){
        uploadPic(this.files[0]);
    });
    $('#file2').on('change',function(){
        uploadPic(this.files[0]);
    });
    
    var options1 = {
    		beforeSubmit: validateForm1,
    		success: packageInfo,    		
    		resetForm: false,
    		dataType: 'json'
    }
    var options2 = {
    		beforeSubmit: validateForm2,
    		success: showResponse,
    		resetForm: false,
    		dataType: 'json'
    }
    
//======================================================
//功能： 表单提交函数ajaxSubmit，使用了jquery.form.min.js插件；
//     参数option制定了提交表单前、提交成功后相应的执行函数，以及想要
//     返回的数据类型，是否在提交后重置表单等等
//======================================================
    $("#add_form").submit(function() {
    	$(this).ajaxSubmit(options1);
        return false;	
    });
    
//===============================================================    
//功能：  编辑url的modal，当点击提交按钮后，首先进行form表单格式检测，若检测成功，
//     进一步判断是否上传新图片，若上传了新图片，则利用ajaxSubmit提交form表单
//     的形式进一步操作；若没有上传新图片，则默认采用原服务器logo图片，调用
//     submitEditInfo方法进一步操作；若无服务器logo也未上传图片，则提示必须
//    上传新图片
//===============================================================
    $('#submitEdit').on('click',function(){
    	var V = new validateFormInput($('#edit_one'));
    	if(V.validate()){
    		var logo = document.getElementById('file2').files[0];
    		var logo_url = $('#logo_url2').val();
    		if(logo){
    			$("#edit_form").ajaxSubmit(options2);
    		    return false;
    		}else if(logo_url){
    			submitEditInfo('logo_url',logo_url);    			
    		}else{
    			alert('请上传logo图片');
    			return;
    		}
    	}else{
    		return;
    	}
    });
//======================================================
//功能： addSessions函数用于添加uuid/major/minor域
//======================================================    
    $("#addSessionsBtn").on('click',function(){
    	addSessions('url_sessions');
    });
    $("#copy_addSessionsBtn").on('click',function(){
    	addSessions('copy_url_sessions');
    });
    
    $("#submitSessionsChange").on("click", function(){
    	submitSessionsChange($("#submitSessionsChange").attr("msg_id"),$("#submitSessionsChange").attr("page_id"));
    });
 })