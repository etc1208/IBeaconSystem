$(function(){
	uuid = null, major = null, minor = null, urls = [], origin_msg_ids = [];
	publicElement.login_id = $("#login_id").attr("uid");
	$("#bindUrlBtn").hide();
	
	$("#submitSearchBtn").on("click", function(){
		var V = new validateFormInput($('#searchBeaconUrl'));
    	if(V.validate()) {
    		uuid = $("#searchUuid option:selected").val();
    		major = $("#searchMajor").val();
    		minor = $("#searchMinor").val();
    		
    		var jsonstr = [];
    	    jsonstr.push({
    	    	"staff_id": publicElement.login_id,
    	    	"uuid": uuid,
    	    	"major": major,
    	        "minor": minor
    	    });
    		jsonstr = JSON.stringify(jsonstr);
    		//console.log(jsonstr);
    		var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!findurl?jsonstr="+jsonstr+"&jsoncallback=?";
    		$.getJSON(
    			url,
    			function(result){
    				if(!result.success){
    					alert(result.message);
    					$('#urltable').DataTable().destroy();
        				$('#urltable tbody').empty();
        				var $tr = $("<tr><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td></tr>");
        				$('#urltable tbody').append($tr);
        				$("#bindUrlBtn").hide();
    					return;
    				}
    				
    				if(result.url === null || result.url.length === 0){
    					alert(result.message);
    					$('#urltable').DataTable().destroy();
        				$('#urltable tbody').empty();
        				var $tr = $("<tr><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td></tr>");
        				$('#urltable tbody').append($tr);
        				$("#bindUrlBtn").hide();
    					return;
    				} else {
    					$("#bindUrlBtn").show();
        				
        				
        				urls = result.url;
        				$('#urltable').DataTable().destroy();
        				$('#urltable tbody').empty();
        				
        				for(var i=0;i<urls.length;i++) {
        					var url = urls[i];
        					var message_id = url.message_id,
        						title = url.title,
        						name = url.name,
        						content = url.content,
        						other_info = url.other_info,
        						project_id = url.project_id,
        						logo_url = url.logo_url,
        						page_id = url.page_id,
        						time = url.start_time;
        					$tr = $("<tr><td>"+message_id+"</td><td>"+title+"</td><td>"+name+
        							"</td><td><img src='"+logo_url+"' /></td><td><button class='btn btn-link'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></button></td><td>"+
        							other_info+"</td><td>"+time+"</td></tr>"); 
        					$tr.attr("url_content",content);
        					$tr.on("click",function(e){
        					    var $target = $(e.target);
        					    if($target.hasClass("btn-link")||$target.parent().hasClass("btn-link")){
        					    	window.open($target.parents("tr").attr("url_content"));
        					    }
        					});
        					$('#urltable tbody').append($tr);
        				}
        				$('#urltable').dataTable(
    						{
    						     "order": [ 6, 'desc' ],
    						     "columns": [
    							             { "width": "10%" },
    							             { "width": "15%" },
    							             { "width": "15%" },
    							             { "width": "5%" },
    							             { "width": "5%" },
    							             { "width": "20%" },
    							             { "width": "30%" }
    							            ]
    						}
        				);
    				}
    				
    			}
    		);
    	} else {
    		return;
    	}
	});
	
	$("#bindUrlBtn").on("click", function(){
		if(urls.length === 0) {
			alert("请首先输入uuid-major-minor进行查询");
			return;
		}
		$("#bindUrlModal #bindingHeader").empty();
		$("#bindUrlModal #bindingBody").empty();
		$("#bindUrlModal #bindingHeader").append("<h3>"+uuid+"-"+major+"-"+minor+"</h3>");
		for(var i=0;i<urls.length;i++) {
			$tr = $("<div><label class='control-label'>页面编号：</label><input type='text' value='"+urls[i].message_id+"' disabled /> <button class='btn btn-xs btn-danger unbindUrlBtn'>—</button></div>");
			$tr.on("click", function(e){
				var $target = $(e.target);
				if($target.hasClass("unbindUrlBtn")||$target.parent().hasClass("unbindUrlBtn")){
					$target.parent().remove();
				}
			});
			$("#bindUrlModal #bindingBody").append($tr);
		}
		
		var origin = $("#bindingBody").find("input");
		for(var i=0;i<origin.length;i++) {
			var $input = $(origin[i]).val();
			if($input != "") origin_msg_ids.push($input);
		}
		
		$("#bindUrlModal").modal("show");
	});
	
	$("#addUrlBtn").on("click", function(){
		$tr = $("<div><label class='control-label'>页面编号：</label><input type='text' class='validate_notNull validate_number' placeholder='请在此处填写页面编号'/> <button class='btn btn-xs btn-danger unbindUrlBtn'>—</button></div>");
		$tr.on("click", function(e){
			var $target = $(e.target);
			if($target.hasClass("unbindUrlBtn")||$target.parent().hasClass("unbindUrlBtn")){
				$target.parent().remove();
			}
		});
		$("#bindUrlModal #bindingBody").append($tr);
	});
	
	$("#submitBindUrl").on("click", function(){
		var V = new validateFormInput($('#bindingBody'));
    	if(V.validate()) {
    		var inputs = $('#bindingBody').find("input");
    		//console.log(inputs);
    		var msg_ids = [];
    		for(var i=0;i<inputs.length;i++) {
    			var $input = $(inputs[i]);
    			msg_ids.push($input.val());
    		}
    		var del_msg_ids = [], add_msg_ids = [];
    		for(var i=0;i<origin_msg_ids.length;i++) {
    			if($.inArray(origin_msg_ids[i], msg_ids) === -1) del_msg_ids.push(origin_msg_ids[i]);
    		}
    		for(var i=0;i<msg_ids.length;i++) {
    			if($.inArray(msg_ids[i], origin_msg_ids) === -1) add_msg_ids.push(msg_ids[i]);
    		}
    		//console.log(origin_msg_ids+"---"+msg_ids+"--"+major+"-"+minor);
    		var jsonStr = [];
    		jsonStr.push({
    			"uuid": uuid,
    			"major": major,
    			"minor": minor,
    			"msg_ids":msg_ids,
    			"del_msg_ids": del_msg_ids,
    			"add_msg_ids": add_msg_ids
    		});
    		jsonStr = JSON.stringify(jsonStr);
    		//alert("原始："+origin_msg_ids+"---现在："+msg_ids+"---新增："+add_msg_ids+"---删除："+del_msg_ids+"---"+major+"-"+minor);
    		//location.reload();
    		
    		var  url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/url!addbind?jsonstr="+jsonStr+"&jsoncallback=?";			
    		$.getJSON(
    			url,
    			function( result ) {
    				if (!result.success) {
    					alert(result.message);
    					return;
    				}
    				alert(result.message);
    				location.reload();
    		});
    	} else {
    		return;
    	}
	});
});