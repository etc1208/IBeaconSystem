/*//global variable
var publicElement = (function () {
	this.ip = "10.103.240.242";
    this.port = "8080";
	this.login_id = null;
	//当前如果点击‘筛选条件’按钮应该显示的modal的id
	this.willShowModal = null;
	//缓存数据
	this.DeviceResult = [];
	this.UrlResult = [];
	this.ProjectResult = [];
    return this;
})();*/

$(function(){
	publicElement.login_id = $("#login_id").attr("uid");
	publicElement.willShowModal = 'conditionBeaconModal';//默认选择基于设备查询统计信息
	//配置日期插件参数
	$('.datetimepicker').datetimepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
	    minView: 'month',
	   // startView: 'year',
	    todayBtn: 'linked',
	    todayHighlight: true
	});
	
	getStatisticInfo(0);//默认加载以设备查询统计信息
});

//=============================================
//功能：参数mode(0:设备  1：页面  2：项目)，还函数首先判断
//     是以哪种mode进行查询，然后去检测publicElement.xxxResult
//     是否有数据，若有，则直接用该数据调用fillTable函数
//     填充表格；若没有，再调用getStatisticInfoByUrl
//     方法通过后台url接口获取数据填充表格
//=============================================
function getStatisticInfo(mode){
	if(mode == '0'){
		if(publicElement.DeviceResult.length > 0){			
			fillTable(publicElement.DeviceResult);
			highchart1(publicElement.DeviceResult,0);
		}else{
			getStatisticInfoByUrl(mode);
		}
	}else if(mode == '1'){
		if(publicElement.UrlResult.length > 0){
			fillTable(publicElement.UrlResult);
			highchart1(publicElement.UrlResult,0);
		}else{
			getStatisticInfoByUrl(mode);
		}
	}else{
		if(publicElement.ProjectResult.length > 0){
			fillTable(publicElement.ProjectResult);
			highchart1(publicElement.ProjectResult,0);
		}else{
			getStatisticInfoByUrl(mode);
		}
	}	
}

//=============================================
//功能：data是包含统计数据的一个数组，用它来填充表格
//=============================================
function fillTable(data){
	$('#statisticInfoTable').DataTable().destroy();//解决datatable插件的一个Warning: Cannot reinitialise Datatables...
	$('#statisticInfoTable tbody').empty();
	var $tr = null;
	var title = "";
	console.log(data);
	for(var i=0;i<data.length;i++){
		title = data[i].title?data[i].title:data[i].major+'-'+data[i].minor;
		$tr = $("<tr><td>"+title+"</td><td>"+
				data[i].shake_uv+"</td><td>"+
				data[i].shake_pv+"</td><td>"+
				data[i].click_uv+"</td><td>"+
				data[i].click_pv+"</td><td>"+
				data[i].ftime+"</td></tr>");
		$('#statisticInfoTable tbody').append($tr);
	}
	$('#statisticInfoTable').dataTable(
		{
			"order": [ 5, 'desc' ],
			"columns": [
			             { "width": "20%" },
			             { "width": "15%" },
			             { "width": "15%" },
			             { "width": "15%" },
			             { "width": "15%" },
			             { "width": "20%" }
			           ]
		}
	);
	//highchart1(data,1);
}
//=============================================
//功能：data是包含统计数据的一个数组，用它来绘制图表
//=============================================
function highchart1(data,count){
	
	var category = new Array();
			//alert(category);
			var shakepv = new Array();
			var shakeuv = new Array();
			var clickpv = new Array();
			var clickuv = new Array();
			//alert(shakepv);
/*			if(data.length>=15)
			{
				for(var i=0;i<15;i++){
					var t = i+10*count;
					category[i]=data[t].title?data[t].title:data[t].major+'-'+data[t].minor;
					shakepv[i]=parseInt(data[t].shake_pv);
					shakeuv[i]=parseInt(data[t].shake_uv);
					clickpv[i]=parseInt(data[t].click_pv);
					clickuv[i]=parseInt(data[t].click_uv);
					
				}
			}
			else
*/			{
				for(var i=0;i<data.length;i++){
					var t = i+10*count;
					category[i]=data[t].title?data[t].title:data[t].major+'-'+data[t].minor;
					shakepv[i]=parseInt(data[t].shake_pv);
					shakeuv[i]=parseInt(data[t].shake_uv);
					clickpv[i]=parseInt(data[t].click_pv);
					clickuv[i]=parseInt(data[t].click_uv);
					
				}
			}
	
	Highcharts.setOptions({
		lang:{
			resetZoom:'还原',
			resetZoomTitle:'还原整体情况'
		}
	}
			);
	
	$('#statistic1').highcharts({
        chart: {
            type: 'column',//column
            zoomType: 'x',
            panning:true
        },
        title: {
            text: '摇一摇统计信息'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: 
				category                
            
        },
        yAxis: {
            min: 0,
            title: {
                text: '统计数量 (人or次)'
            }
        },
        tooltip: {
        	
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
        	name: '摇出页面人数',
            data: shakeuv

        }, {
        	name: '摇出页面次数',
            data: shakepv
            

        }, {
        	name: '打开页面人数',
            data: clickuv            

        }, {            
            name: '打开页面次数',
            data: clickpv

        }]
    });
	
}


function highchart2(data,count){
	
	var category = new Array();
			//alert(category);
			var shakepv = new Array();
			var shakeuv = new Array();
			var clickpv = new Array();
			var clickuv = new Array();
			//alert(shakepv);
/*			if(data.length>=15)
			{
				for(var i=0;i<15;i++){
					var t = i+10*count;
					category[i]=data[t].ftime;
					shakepv[i]=parseInt(data[t].shake_pv);
					shakeuv[i]=parseInt(data[t].shake_uv);
					clickpv[i]=parseInt(data[t].click_pv);
					clickuv[i]=parseInt(data[t].click_uv);
					
				}
			}
			else
*/			{
				for(var i=0;i<data.length;i++){
					var t = i+10*count;
					category[i]=data[t].ftime;
					shakepv[i]=parseInt(data[t].shake_pv);
					shakeuv[i]=parseInt(data[t].shake_uv);
					clickpv[i]=parseInt(data[t].click_pv);
					clickuv[i]=parseInt(data[t].click_uv);
					
				}
			}


Highcharts.setOptions({
	lang:{
		resetZoom:'还原',
		resetZoomTitle:'还原整体情况'
	}
}
		);

	$('#statistic1').highcharts({
        chart: {
            type: 'line',//
            zoomType: 'x',
            panning:true
        },
        title: {
            text: '摇一摇统计信息'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: 
				category                
            
        },
        yAxis: {
            min: 0,
            title: {
                text: '统计数量 (人or次)'
            }
        },
        tooltip: {
        	
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
        	name: '摇出页面人数',
            data: shakeuv

        }, {
        	name: '摇出页面次数',
            data: shakepv
            

        }, {
        	name: '打开页面人数',
            data: clickuv            

        }, {            
            name: '打开页面次数',
            data: clickpv

        }]
    });
	
}

//=============================================
//功能：调用statistic!findall接口获取不同mode下的统计
//     数据，调用fillTable方法将数据填充表格；并将数据缓存
//     在对应的publicElement.xxxResult缓存区内，方
//     便下次获取数据时直接去缓存区取得，免去重复调用接口。    
//=============================================
function getStatisticInfoByUrl(mode){
	$.blockUI({ message: '<img src="./images/busy.gif" />' });
	var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/statistic!findall?staff_id="+publicElement.login_id+"&style="+mode+"&jsoncallback=?";
	$.getJSON(
		url,
		function(result){

			if(!result.success){
				$('#statisticInfoTable tbody').empty();
				$tr = $("<tr><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td></tr>");
				$('#statisticInfoTable tbody').append($tr);
				$.unblockUI();
				return;
			}else{
				if(mode == '0'){
					publicElement.DeviceResult = result.statistic;
				}else if(mode == '1'){
					publicElement.UrlResult = result.statistic;
				}else{
					publicElement.ProjectResult = result.statistic;
				}
				fillTable(result.statistic);
				highchart1(result.statistic,0);
				$.unblockUI();
			}
		}
	);
}

//=============================================
//功能：监听单选框点击事件，当单击不同单选框，会获取不同类统
//     计数据，并将‘筛选条件’按钮所触发的modal设定成对应的
//     modal
//=============================================
$('#statisticInfoOptions').on('click',function(){//':radio'
	$('#statisticInfoTable').DataTable().destroy();//解决datatable插件的一个Warning: Cannot reinitialise Datatables...
	$('#statisticInfoTable tbody').empty();
	//alert($(this).val());
	var showInfo_way = $("input[name=statisticOptions]:checked").val();//this
	if(showInfo_way == '0'){
		$('#thead1').text('major-minor');
		getStatisticInfo(0);
		publicElement.willShowModal = 'conditionBeaconModal';
	}else if(showInfo_way == '1'){
		$('#thead1').text('页面标题');
		getStatisticInfo(1);
		publicElement.willShowModal = 'conditionUrlModal';
	}else{
		$('#thead1').text('项目名称');
		getStatisticInfo(2);
		publicElement.willShowModal = 'conditionProjectModal';
	}
});

function choosetime(){
	var timeval = $("input[name=statisticTime]:checked").val();
	if(timeval=='5')
	{
		$('#timechoose').show();
	}
	else
	{
		$('#timechoose').hide();
		//改时间为空
		$('#condition_startDate').val('');
		$('#condition_endDate').val('');
		
	}
	
}
function choosetime2(){
	var timeval = $("input[name=statisticTime2]:checked").val();
	if(timeval=='5')
	{
		$('#timechoose3').show();
	}
	else
	{
		$('#timechoose3').hide();
		//改时间为空
		$('#condition_startDate3').val('');
		$('#condition_endDate3').val('');
		
	}
	
}
function choosetime3(){
	var timeval = $("input[name=statisticTime3]:checked").val();
	if(timeval=='5')
	{
		$('#timechoose2').show();
	}
	else
	{
		$('#timechoose2').hide();
		//改时间为空
		$('#condition_startDate2').val('');
		$('#condition_endDate2').val('');
		
	}
	
}
$('#statisticTime').click(choosetime);
$('#statisticTime2').click(choosetime2);
$('#statisticTime3').click(choosetime3);
//=============================================
//功能：‘筛选条件’按钮触发对应的modal显示
//=============================================
$('#addConditionsBtn').on('click',function(){
	$('#'+publicElement.willShowModal).modal('show');
});

//下面三段为每个modal提交筛选条件后的处理
$('#submitConditionBeacon').on('click',function(){	
	var V = new validateFormInput($('#conditionBeaconModal'));
    if(V.validate()){
    	var uuid = $('#condition_uuid').val();
    	var minor = $('#condition_minor').val();
    	var major = $('#condition_major').val();
    	var timeval = $("input[name=statisticTime]:checked").val();
    	var start,end;
    	if(timeval=='5')
    	{
    		start = $('#condition_startDate').val()?$('#condition_startDate').val():"";
        	end = $('#condition_endDate').val()?$('#condition_endDate').val():"";
    	}
    	else
    	{
    		start = "";
    		end = "";
    	}
    	
    	var jsonObj = {
    		"uuid": uuid,
    		"major": major,
    		"minor": minor,
    		"timeval":timeval,
    		"start": start,
    		"end": end,
    		"staff_id": publicElement.login_id
    	};
    	var jsonStr = JSON.stringify(jsonObj);
    	$('#conditionBeaconModal').block({ message: '<img src="./images/busy.gif" />' });
    	var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/statistic!findbyminor?jsonstr="+jsonStr+"&jsoncallback=?";
    	$.getJSON(
    		url,
    		function(result){
    			if(!result.success){
    				console.log(result.message);
    				alert('无此信息');
    				$('#conditionBeaconModal').unblock();
    				return;
    			}
    			fillTable(result.statistic);
    			highchart2(result.statistic,0);
    			$('#conditionBeaconModal').modal('hide');
    			$('#conditionBeaconModal').unblock();
    		}
    	);
    }else{
    	return;
    }	
});

$('#submitConditionProject').on('click',function(){	
	var V = new validateFormInput($('#conditionProjectModal'));
    if(V.validate()){
    	var project = $('#condition_project').val();
    	var start = $('#condition_startDate2').val()?$('#condition_startDate2').val():"";
    	var end = $('#condition_endDate2').val()?$('#condition_endDate2').val():"";
    	var timeval = $("input[name=statisticTime3]:checked").val();
    	var jsonObj = {
        	"name": project,
        	"timeval":timeval,
        	"start": start,
    		"end": end,
        	"staff_id": publicElement.login_id
        };
        var jsonStr = JSON.stringify(jsonObj);
        $('#conditionProjectModal').block({ message: '<img src="./images/busy.gif" />' });
        var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/statistic!findbyproject?jsonstr="+jsonStr+"&jsoncallback=?";
    	
        $.getJSON(
    		url,
    		function(result){
    			if(!result.success){
    				alert('无此信息');
    				$('#conditionProjectModal').unblock();
    				return;
    				
    			}
    			fillTable(result.statistic);
    			highchart2(result.statistic,0);
    			
    			$('#conditionProjectModal').modal('hide');
    			$('#conditionProjectModal').unblock();
    		}
    	);
    }else{
    	return;
    }	
});

$('#submitConditionUrl').on('click',function(){	
	var V = new validateFormInput($('#conditionUrlModal'));
    if(V.validate()){
    	var url3 = $('#condition_url').val();
    	var other_info = $('#condition_url_otherinfo').val();
    	var start = $('#condition_startDate3').val()?$('#condition_startDate3').val():"";
    	var end = $('#condition_endDate3').val()?$('#condition_endDate3').val():"";
    	var timeval = $("input[name=statisticTime2]:checked").val();
    	var mesid = $('#condition_url_mesid').val();
    	var pageid ;
    	
    	
    	//加判断是否为唯一的URL
    	if(mesid=="")
    	{
    		//message_id为空，和原来不变
    		var url2 = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/statistic!findoneURL?title="+url3+"&other_info="+other_info+"&jsoncallback=?";
        	$.getJSON(
        			url2,
            		function(result){
            			if(!result.success){
            				var mesdatil="";
            				if(result.size>0)
            				{
            					for(var i=0;i<result.oneURL.length;i++)
            					{
            						mesdatil+="URL编号："+result.oneURL[i].message_id+"标题："+result.oneURL[i].title+"，备注信息："+result.oneURL[i].other_info+"\n";
            					}
            				}
            				
            				alert(result.message+"\n"+"相关URL如下：\n"+mesdatil);
            				return;
            			}
            			else
            			{
            				pageid = result.oneURL[0].page_id;
            				var jsonObj = {
            						"message_id":mesid,
            			    		"page_id":pageid,
            			            "title":url3,
            			            "other_info":other_info,
            			            "timeval":timeval,
            			            "start": start,
            			            "end": end,
            			        	"staff_id": publicElement.login_id
            			        };
            			        var jsonStr = JSON.stringify(jsonObj);
            			        $('#conditionUrlModal').block({ message: '<img src="./images/busy.gif" />' });
            			        var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/statistic!findbyurl?jsonstr="+jsonStr+"&jsoncallback=?";
            			    	$.getJSON(
            			    		url,
            			    		function(result){
            			    			if(!result.success){
            			    				alert('无此信息');
            			    				$('#conditionUrlModal').unblock();
            			    				return;
            			    			}
            			    			fillTable(result.statistic);
            			    			highchart2(result.statistic,0);
            			    		
            			    			$('#conditionUrlModal').modal('hide');
            			    			$('#conditionUrlModal').unblock();
            			    		}
            			    	);
            			}
            			
            		}
        			
        	);
    	}
    	else
    	{
    		//message_id不为空，直接用message_id查询
    		var jsonObj = {
					"message_id":mesid,
		    		"page_id":"",
		            "title":url3,
		            "other_info":other_info,
		            "timeval":timeval,
		            "start": start,
		            "end": end,
		        	"staff_id": publicElement.login_id
		        };
		        var jsonStr = JSON.stringify(jsonObj);
		        $('#conditionUrlModal').block({ message: '<img src="./images/busy.gif" />' });
		        var url = "http://"+publicElement.ip+":"+publicElement.port+"/beacon/statistic!findbyurl?jsonstr="+jsonStr+"&jsoncallback=?";
		    	$.getJSON(
		    		url,
		    		function(result){
		    			if(!result.success){
		    				alert('无此信息');
		    				$('#conditionUrlModal').unblock();
		    				return;
		    			}
		    			fillTable(result.statistic);
		    			highchart2(result.statistic,0);
		    		
		    			$('#conditionUrlModal').modal('hide');
		    			$('#conditionUrlModal').unblock();
		    		}
		    	);
    	}
    	
    	
    	
    }else{
    	return;
    }	
});

//Lynn
$("#statisticInfoTable_paginate ul").on('click',function(){
	alert("i love you");
	
});