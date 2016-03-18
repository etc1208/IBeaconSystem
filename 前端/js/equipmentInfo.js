/*//global variable
var publicElement = (function () {
    this.ip = "10.103.240.242";
    this.port = "8080";
	this.login_id = null;
    return this;
})();*/

$(function(){
	publicElement.login_id = $("#login_id").attr("uid");
	loadEquipmentList();
	BeaconAlluse();
	
	
	//配置日期插件参数
	$('.datetimepicker').datetimepicker({
		format: 'yyyy-mm-dd',
	    autoclose: true,
	    minView: 'month',
	   // startView: 'year',
	    todayBtn: 'linked',
	    todayHighlight: true
	});
	
	$('#submitConditionBtn').click(submitCondition);
	
	var options = {
    		beforeSubmit: validateExcel,
    		success: submitUpload,    		
    		resetForm: true,
    		dataType: 'json'
    };
	
	$("#uploadExcel_form").submit(function() {
	    $(this).ajaxSubmit(options);
	    return false;	
	});
});

function checkExcel(file,id){
	var flag = true;
    if(file){
        var fileName = (file.name).toLocaleLowerCase(); 
        var suffixs = fileName.split(".");
        var suffix = suffixs[suffixs.length-1];
        if(suffix === 'xls'){
        	console.log("-----------geshiduile");
            flag = true;
        }else{
        	 alert('格式有误，请上传以.xls结尾的excel文件');
             $('#'+id).val("");
             flag = false;
        }
    }else{
    	alert('请上传excel文件');
    	flag = false;
    } 
    return flag; 
}

function validateExcel(){
	var file = document.getElementById('excelFile').files[0];
	var flag = checkExcel(file,"excelFile");
	if(!flag){	
		return false;
	}else{
		return true;
	}
}

function submitUpload(responseText,statusText){
	if(responseText.success){
		var localExcel = responseText.logo;
		console.log('excel本地地址:'+localExcel);
		$('#uploadExcelModal').block({ message: '<img src="./images/busy.gif" />' });
		var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/beaconapi!importEquipExcel?filePath="+localExcel+"&user_id="+publicElement.login_id+"&jsoncallback=?";
		$.getJSON(
			url,
			function(result){
				if(result.success){
					alert(result.message);
					$('#uploadExcelModal').unblock();
					return;
				}else{
					alert('上传失败：'+result.message);
					$('#uploadExcelModal').unblock();
					return;
				}
			}
		);
	}else{
		alert(responseText.message);
		return;
	}
}

//====================================================
//功能： 调用beacon!findbystaff接口获取该用户的设备信息，这里面
//     包含地图sdk和百度地图的使用
//====================================================
function loadEquipmentList(){
	$.blockUI({ message: '<img src="./images/busy.gif" />' });
	var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/beacon!findbystaff?user_id="+publicElement.login_id+"&jsoncallback=?";	
	$.getJSON(
			url,
			function(result){
				
				if(!result.success){
					$.unblockUI();
					return;
				}
				$("#equipmentTable tbody").empty();
				var beaconArray = result.beacon;
				
				var mac_id = "";
				var uuid = "";
				var major = "";
				var minor = "";
				var address = "";
				var address_type = "";
				var coverage = 0;
				var power = "";
				var frequency = "";
				var type = "";
				var firm = "";
				var create_time = "";
				var status = "";
				var building = "";
				var floor = "";
				var coord_x = "";
				var coord_y = "";

				if(result.total == '101'){
					var totalNum = beaconArray[100].total;
					$('#totalBeacon').text('该用户拥有设备总数：'+totalNum+'，前一百条设备记录如下：').show();
					for(var i=0;i<beaconArray.length-1;i++){
						
						mac_id = beaconArray[i].mac_id;
						uuid = beaconArray[i].uuid;
						if(uuid.length > 8){
							uuid = uuid.substring(0,8);
						}
						major = beaconArray[i].major;
						minor = beaconArray[i].minor;
						address = beaconArray[i].address;
						address_type = beaconArray[i].address_type?beaconArray[i].address_type:"-";
						coverage = beaconArray[i].coverage;
						power = beaconArray[i].power;
						frequency = beaconArray[i].frequency;
						type = beaconArray[i].type;
						firm = beaconArray[i].firm;
						create_time = beaconArray[i].last_modify_time;
						status = beaconArray[i].status;			
						building = beaconArray[i].building==""?"-1":beaconArray[i].building;
						floor = beaconArray[i].floor;
						coord_x = beaconArray[i].coord_x;
						coord_y = beaconArray[i].coord_y;
						//alert(mac_id+" "+uuid+" "+major+" "+minor+" "+address+" "+coverage+" "+power+" "+frequency+" "+type+" "+firm+" "+create_time+" "+status);
		                var $tr = null;
						if(status !== "已部署"){
		                	$tr = $("<tr><td><button type='button' class='btn btn-info'><span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span></button></td><td>"+mac_id+"</td><td>"+uuid+"..."+"</td><td>"+major+
			                "</td><td>"+minor+"</td><td>"+type+"</td><td>"+address_type+"</td><td>"+coverage+
			                "</td><td>"+power+"</td><td>"+frequency+"</td><td>"+firm+
			                "</td><td>"+create_time+"</td><td>"+status+"</td><td>"+address+
			                "</td><td><button type='button' class='btn btn-danger' disabled='disabled'><span class='glyphicon glyphicon-eye-close'></span></button></td></tr>");
		                }else{
		                	$tr = $("<tr><td><button type='button' class='btn btn-info'><span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span></button></td><td>"+mac_id+"</td><td>"+uuid.substring(0,8)+"..."+"</td><td>"+major+
			                "</td><td>"+minor+"</td><td>"+type+"</td><td>"+address_type+"</td><td>"+coverage+
			                "</td><td>"+power+"</td><td>"+frequency+"</td><td>"+firm+
			                "</td><td>"+create_time+"</td><td>"+status+"</td><td>"+address+
			                "</td><td><button type='button' class='btn btn-success' building='"+building+"' x='"+coord_x+"' y='"+coord_y+"' floor='"+floor+"'><span class='glyphicon glyphicon-eye-open'></span></button></td></tr>");
		                }
						
						$tr.attr("mac_id",mac_id);
		                $("#equipmentTable tbody").append($tr);
		                
		                $tr.on('click',function(e){
		                	var $target = $(e.target);
		                	if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
		                		showBeacondetail($target.parents("tr").attr("mac_id"));
		                	}
		                	if($target.attr('x')||$target.parent().attr('x')){
		                		//console.log($target.attr('building'));
		                		var building = $target.attr('building')?$target.attr('building'):$target.parent().attr('building');
		                		if(building !== '-1' && building !=='未设置'){
		                			var floor = $target.attr('floor')?$target.attr('floor'):$target.parent().attr('floor');
			                		var x = $target.attr('x')?$target.attr('x'):$target.parent().attr('x');
			                		var y = $target.attr('y')?$target.attr('y'):$target.parent().attr('y');
			                			                		
			                	    var m = document.getElementById("map");
			                	    $(m).empty();
			                		var map = new Vmap(m,building,floor);
			                		map.onFloorChange = function(){
			                			var pointer = new VPoint(x, y, floor);
			            				var marker = new VMarker(pointer);
			            				map.addOverlay(marker);		            				
			                		};
			                		$('#showMapModal').modal('show');
			                		$("#big").bind("click",map.zoomIn);
			                	    $("#small").bind("click",map.zoomOut);
			                	    $('#closeMapModal').on('click',function(){
			                	    	$('#showMapModal').modal('hide');
			                	    });
		                		}else{
		                			
		                			var baiduM = document.getElementById("allmap");
			                	    $(baiduM).empty();
			                	    $('#showBaiduMapModal').modal('show');
		                			var x = $target.attr('x')?$target.attr('x'):$target.parent().attr('x');
			                		var y = $target.attr('y')?$target.attr('y'):$target.parent().attr('y');
			                		
			                		// 百度地图API功能
			                		setTimeout(function(){
			                			var map = new BMap.Map("allmap");
			                			if(parseFloat(x) > parseFloat(y)){
			                				//console.log("x>y");
			                				var point = new BMap.Point(x,y);
			                			}else{
			                				var point = new BMap.Point(y,x);
			                			}
				                		
				                		map.centerAndZoom(point, 20);	
				                		map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
				                		map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
				                		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
				                		var marker = new BMap.Marker(point); // 创建点
				                		map.addOverlay(marker); //增加点
			                		},1000);
			                		
		                			
			                	    $('#closeBaiduMapModal').on('click',function(){
			                	    	$('#showBaiduMapModal').modal('hide');
			                	    });
		                		}
		                		
		                	}
		                });	                
					}
					$.unblockUI();
				}else{
					for(var i=0;i<beaconArray.length;i++){
						
						mac_id = beaconArray[i].mac_id;
						uuid = beaconArray[i].uuid;
						if(uuid.length > 8){
							uuid = uuid.substring(0,8);
						}
						major = beaconArray[i].major;
						minor = beaconArray[i].minor;
						address = beaconArray[i].address;
						address_type = beaconArray[i].address_type?beaconArray[i].address_type:"-";
						coverage = beaconArray[i].coverage;
						power = beaconArray[i].power;
						frequency = beaconArray[i].frequency;
						type = beaconArray[i].type;
						firm = beaconArray[i].firm;
						create_time = beaconArray[i].last_modify_time;
						status = beaconArray[i].status;			
						building = beaconArray[i].building==""?"-1":beaconArray[i].building;
						floor = beaconArray[i].floor;
						coord_x = beaconArray[i].coord_x;
						coord_y = beaconArray[i].coord_y;
						//alert(mac_id+" "+uuid+" "+major+" "+minor+" "+address+" "+coverage+" "+power+" "+frequency+" "+type+" "+firm+" "+create_time+" "+status);
		                var $tr = null;
						if(status !== "已部署"){
		                	$tr = $("<tr><td><button type='button' class='btn btn-info'><span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span></button></td><td>"+mac_id+"</td><td>"+uuid+"..."+"</td><td>"+major+
			                "</td><td>"+minor+"</td><td>"+type+"</td><td>"+address_type+"</td><td>"+coverage+
			                "</td><td>"+power+"</td><td>"+frequency+"</td><td>"+firm+
			                "</td><td>"+create_time+"</td><td>"+status+"</td><td>"+address+
			                "</td><td><button type='button' class='btn btn-danger' disabled='disabled'><span class='glyphicon glyphicon-eye-close'></span></button></td></tr>");
		                }else{
		                	$tr = $("<tr><td><button type='button' class='btn btn-info'><span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span></button></td><td>"+mac_id+"</td><td>"+uuid.substring(0,8)+"..."+"</td><td>"+major+
			                "</td><td>"+minor+"</td><td>"+type+"</td><td>"+address_type+"</td><td>"+coverage+
			                "</td><td>"+power+"</td><td>"+frequency+"</td><td>"+firm+
			                "</td><td>"+create_time+"</td><td>"+status+"</td><td>"+address+
			                "</td><td><button type='button' class='btn btn-success' building='"+building+"' x='"+coord_x+"' y='"+coord_y+"' floor='"+floor+"'><span class='glyphicon glyphicon-eye-open'></span></button></td></tr>");
		                }
						
		                $("#equipmentTable tbody").append($tr);
		                
		                $tr.on('click',function(e){
		                	var $target = $(e.target);
		                	if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
		                		showBeacondetail($target.parents("tr").attr("mac_id"));
		                	}
		                	if($target.attr('x')||$target.parent().attr('x')){
		                		//console.log($target.attr('building'));
		                		var building = $target.attr('building')?$target.attr('building'):$target.parent().attr('building');
		                		if(building !== '-1' && building !=='未设置'){
		                			var floor = $target.attr('floor')?$target.attr('floor'):$target.parent().attr('floor');
			                		var x = $target.attr('x')?$target.attr('x'):$target.parent().attr('x');
			                		var y = $target.attr('y')?$target.attr('y'):$target.parent().attr('y');
			                			                		
			                	    var m = document.getElementById("map");
			                	    $(m).empty();
			                		var map = new Vmap(m,building,floor);
			                		map.onFloorChange = function(){
			                			var pointer = new VPoint(x, y, floor);
			            				var marker = new VMarker(pointer);
			            				map.addOverlay(marker);		            				
			                		};
			                		$('#showMapModal').modal('show');
			                		$("#big").bind("click",map.zoomIn);
			                	    $("#small").bind("click",map.zoomOut);
			                	    $('#closeMapModal').on('click',function(){
			                	    	$('#showMapModal').modal('hide');
			                	    });
		                		}else{
		                			
		                			var baiduM = document.getElementById("allmap");
			                	    $(baiduM).empty();
			                	    $('#showBaiduMapModal').modal('show');
		                			var x = $target.attr('x')?$target.attr('x'):$target.parent().attr('x');
			                		var y = $target.attr('y')?$target.attr('y'):$target.parent().attr('y');
			                		
			                		// 百度地图API功能
			                		setTimeout(function(){
			                			var map = new BMap.Map("allmap");
			                			if(parseFloat(x) > parseFloat(y)){
			                				var point = new BMap.Point(x,y);
			                			}else{
			                				var point = new BMap.Point(y,x);
			                			}
				                		map.centerAndZoom(point, 20);	
				                		map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
				                		map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
				                		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
				                		var marker = new BMap.Marker(point); // 创建点
				                		map.addOverlay(marker); //增加点
			                		},1000);
			                		
		                			
			                	    $('#closeBaiduMapModal').on('click',function(){
			                	    	$('#showBaiduMapModal').modal('hide');
			                	    });
		                		}
		                		
		                	}
		                });	                
					}
					$.unblockUI();
				}
				
				$('#equipmentTable').dataTable(
					{
		                 "order": [ 11, 'desc' ],
		                 "columns": [
		                             { "width": "5%" },
		   				             { "width": "9%" },
		   				             { "width": "5%"  },
		   				             { "width": "5%"  },
		   				             { "width": "5%"  },
		   				             { "width": "10%" },
		   				             { "width": "8%"  },
		   				             { "width": "2%"  },
		   				             { "width": "10%" },
		   				             { "width": "10%" },
		   				             { "width": "5%"  },
		   				             { "width": "9%" },
		   				             { "width": "5%"  },
		   				             { "width": "8%" },
		   				             { "width": "5%"  }
		   				           ]
		            }
		        );		
			}
	);
}



$('#conditionalSearchBtn').on('click',function(){
	var V = new validateFormInput($('#searchConditionModal'));
	V.destroy();
	$('#searchConditionModal').modal('show');
});

//================================
//功能： 根据用户输入的筛选条件进行条件查询 
//================================
function submitCondition(){
	var V = new validateFormInput($('#searchConditionModal'));
	if(V.validate()){
		var uuid = $('#condition_uuid').val();
		var major = $('#condition_major').val();
		var minor = $('#condition_minor').val();
		var mac = $('#condition_mac').val();
		var address = $('#condition_address').val();
		var start = $('#condition_startDate').val();
		var end = $('#condition_endDate').val();
		var state =  $('input[name="condition_state"]:checked').val()?$('input[name="condition_state"]:checked').val():"";
		//console.log(uuid+" "+major+" "+minor+" "+startDate+" "+endDate+" "+state);
		var jsonObj = {
				"user_id": publicElement.login_id,
				"uuid": uuid,
				"major": major,
				"minor": minor,
				"mac": mac,
				"address": address,
				"start": start,
				"end": end,
				"status": state
		};
		var jsonStr = JSON.stringify(jsonObj);
		$('#searchConditionModal').block({ message: '<img src="./images/busy.gif" />' });
		var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/staff!findbeacon?jsonstr="+jsonStr+"&jsoncallback=?";	 
		$.getJSON(
				url,
				function(result){
					if(!result.success){
						
						alert('未搜索到匹配信息，请重新搜索条件');
						$('#searchConditionModal').unblock();
						return;
					}
					$('#totalBeacon').hide();
					$('#equipmentTable').DataTable().destroy();
					$("#equipmentTable tbody").empty();
					var beaconArray = result.Beacon;
					
					var mac_id = "";
					var uuid = "";
					var major = "";
					var minor = "";
					var address = "";
					var address_type = "";
					var coverage = 0;
					var power = "";
					var frequency = "";
					var type = "";
					var firm = "";
					var create_time = "";
					var status = "";
					var building = "";
					var floor = "";
					var coord_x = "";
					var coord_y = "";
									
					for(var i=0;i<result.total;i++){
						
						mac_id = beaconArray[i].mac_id;
						uuid = beaconArray[i].uuid;
						major = beaconArray[i].major;
						minor = beaconArray[i].minor;
						address = beaconArray[i].address;
						address_type = beaconArray[i].address_type?beaconArray[i].address_type:"-";
						coverage = beaconArray[i].coverage;
						power = beaconArray[i].power;
						frequency = beaconArray[i].frequency;
						type = beaconArray[i].type;
						firm = beaconArray[i].firm;
						create_time = beaconArray[i].last_modify_time;
						status = beaconArray[i].status;			
						building = beaconArray[i].building==""?"-1":beaconArray[i].building;
						floor = beaconArray[i].floor;
						coord_x = beaconArray[i].coord_x;
						coord_y = beaconArray[i].coord_y;
						//alert(mac_id+" "+uuid+" "+major+" "+minor+" "+address+" "+coverage+" "+power+" "+frequency+" "+type+" "+firm+" "+create_time+" "+status);
		                var $tr = null;
						if(status !== "已部署"){
		                	$tr = $("<tr><td><button type='button' class='btn btn-info'><span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span></button></td><td>"+mac_id+"</td><td>"+uuid.substring(0,8)+"..."+"</td><td>"+major+
			                "</td><td>"+minor+"</td><td>"+type+"</td><td>"+address_type+"</td><td>"+coverage+
			                "</td><td>"+power+"</td><td>"+frequency+"</td><td>"+firm+
			                "</td><td>"+create_time+"</td><td>"+status+"</td><td>"+address+
			                "</td><td><button type='button' class='btn btn-danger' disabled='disabled'><span class='glyphicon glyphicon-eye-close'></span></button></td></tr>");
		                }else{
		                	$tr = $("<tr><td><button type='button' class='btn btn-info'><span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span></button></td><td>"+mac_id+"</td><td>"+uuid.substring(0,8)+"..."+"</td><td>"+major+
			                "</td><td>"+minor+"</td><td>"+type+"</td><td>"+address_type+"</td><td>"+coverage+
			                "</td><td>"+power+"</td><td>"+frequency+"</td><td>"+firm+
			                "</td><td>"+create_time+"</td><td>"+status+"</td><td>"+address+
			                "</td><td><button type='button' class='btn btn-success' building='"+building+"' x='"+coord_x+"' y='"+coord_y+"' floor='"+floor+"'><span class='glyphicon glyphicon-eye-open'></span></button></td></tr>");
		                }
						
		                $("#equipmentTable tbody").append($tr);
		                $tr.on('click',function(e){
		                	var $target = $(e.target);
		                	if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
		                		showBeacondetail($target.parents("tr").attr("mac_id"));
		                	}
		                	if($target.attr('x')||$target.parent().attr('x')){
		                		//console.log($target.attr('building'));
		                		var building = $target.attr('building')?$target.attr('building'):$target.parent().attr('building');
		                		if(building !== '-1' && building !=='未设置'){
		                			var floor = $target.attr('floor')?$target.attr('floor'):$target.parent().attr('floor');
			                		var x = $target.attr('x')?$target.attr('x'):$target.parent().attr('x');
			                		var y = $target.attr('y')?$target.attr('y'):$target.parent().attr('y');
			                			                		
			                	    var m = document.getElementById("map");
			                	    $(m).empty();
			                		var map = new Vmap(m,building,floor);
			                		map.onFloorChange = function(){
			                			var pointer = new VPoint(x, y, floor);
			            				var marker = new VMarker(pointer);
			            				map.addOverlay(marker);		            				
			                		};
			                		$('#showMapModal').modal('show');
			                		$("#big").bind("click",map.zoomIn);
			                	    $("#small").bind("click",map.zoomOut);
			                	    $('#closeMapModal').on('click',function(){
			                	    	$('#showMapModal').modal('hide');
			                	    });
		                		}else{
		                			
		                			var baiduM = document.getElementById("allmap");
			                	    $(baiduM).empty();
			                	    $('#showBaiduMapModal').modal('show');
		                			var x = $target.attr('x')?$target.attr('x'):$target.parent().attr('x');
			                		var y = $target.attr('y')?$target.attr('y'):$target.parent().attr('y');
			                		
			                		// 百度地图API功能
			                		setTimeout(function(){
			                			var map = new BMap.Map("allmap");
			                			if(parseFloat(x) > parseFloat(y)){
			                				var point = new BMap.Point(x,y);
			                			}else{
			                				var point = new BMap.Point(y,x);
			                			}
				                		map.centerAndZoom(point, 20);	
				                		map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
				                		map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
				                		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
				                		var marker = new BMap.Marker(point); // 创建点
				                		map.addOverlay(marker); //增加点
			                		},1000);
			                		
		                			
			                	    $('#closeBaiduMapModal').on('click',function(){
			                	    	$('#showBaiduMapModal').modal('hide');
			                	    });
		                		}
		                		
		                	}
		                });	                
					}
					$('#equipmentTable').dataTable(
						{
			                 "order": [ 11, 'desc' ],  
			                 "columns": [
			                             { "width": "5%" },
		   				             { "width": "9%" },
		   				             { "width": "5%"  },
		   				             { "width": "5%"  },
		   				             { "width": "5%"  },
		   				             { "width": "10%" },
		   				             { "width": "8%"  },
		   				             { "width": "2%"  },
		   				             { "width": "10%" },
		   				             { "width": "10%" },
		   				             { "width": "5%"  },
		   				             { "width": "9%" },
		   				             { "width": "5%"  },
		   				             { "width": "8%" },
		   				             { "width": "5%"  }
			   				           ]
			            }
			        );
					$('#searchConditionModal').unblock();
					$('#searchConditionModal').modal('hide');
				}
		);
	}else{
		return;
	}
	
}

//================================
//功能： 查看设备的关联信息详情
//@author：Lynn
//================================
function showBeacondetail(mac_id)
{
	//alert("详情"+mac_id);
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/beacon!finddetail?mac_id="+mac_id+"&jsoncallback=?";
//	$("#showBeacondetail").modal("show");
//	$("#mac_id1").val("1");
//	$("#uuid1").val("2");
//	$("#mes_id1").val("3");
//	$("#mes_title1").val("4");
//	$("#mes_status1").val("5");
//	$("#pro_title1").val("6");
		$.getJSON(
	        url,
	        function( result ) {
	        	if(!result.success){
	        		alert("该设备没有任何详细信息！");
	        		return;
	        	}
	        	//alert("详情"+mac_id);
	        	$("#showBeacondetail").modal("show");
	        	$("#mac_id1").val(result.detail[0].mac_id);
	        	$("#uuid1").val(result.detail[0].uuid);
	        	$("#major1").val(result.detail[0].major);
	        	$("#minor1").val(result.detail[0].minor);
	        	$("#mes_id1").val(result.detail[0].mes_id);
	        	$("#mes_title1").val(result.detail[0].mes_title);
	        	$("#mes_content1").val(result.detail[0].mes_content);
	        	//$("#mes_status1").val(result.detail[0].mes_status);
	        	if(result.detail[0].mes_status == '1'){
	        		$("#mes_status1").val('未审核');
				}else if(result.detail[0].mes_status == '2'){
					$("#mes_status1").val('审核通过');
				}else if(result.detail[0].mes_status == '3'){
					$("#mes_status1").val('审核未通过');
				}else{
					$("#mes_status1").val('删除');
				}
	        	$("#pro_title1").val(result.detail[0].pro_title);
	        }
	);
}
$('#showUrl1').on('click',function(){
	//console.log($('#content1').val());
	window.open($('#mes_content1').val());
});
function BeaconAlluse()
{
	$('.collapse').collapse();   
	//alert("BeaconAlluse加载成功！");
	$('#BeaconAlluse_table tbody').empty();
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/beacon!beaconAllUse?user_id="+publicElement.login_id+"&jsoncallback=?";
	$.getJSON(
	        url,
	        function( result ) {
	        	if(!result.success){
	        		//alert("该设备没有任何详细信息！");
	        		
	        		return;
	        	}
	        	var all=result.alluse[0].all;
	        	var use =result.alluse[0].use; 
	        	var unuse = all - use ;
	        	if(unuse<0)
	        	{
	        		unuse = 0;	        		
	        	}
	        	$tr = $('<tr><td>'+use+'</td><td>'+unuse+'</td></tr>');
	        	$('#BeaconAlluse_table tbody').append($tr);	
	        	
	        }
	        );
	
}