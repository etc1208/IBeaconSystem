$(function(){
	//getTotalNumber();
	$("#previous_page").on("click",onPreBtnClick);
	$("#next_page").on("click",onNxtBtnClick);
	$("#jumpToPageBtn").on("click", onJumpToBtnClick);
})


function onPreBtnClick() {
    if (publicElement.currentPageNum <= 1) {
    	$("#previous_page").attr("disabled","disabled");
    } else {
    	publicElement.currentPageNum -= 1;
    	getMessages(publicElement.currentPageNum);
    	console.log("当前页："+publicElement.currentPageNum);
    	if (publicElement.currentPageNum == 1) {
    		$("#previous_page").attr("disabled","disabled");
    	} else {
    		$("#previous_page").attr("disabled",false);
    	}
    	$("#next_page").attr("disabled",false);
    }
}

function onNxtBtnClick() {
    if (publicElement.currentPageNum >= parseInt($("#Paging-total span").text())) {
    	$("#next_page").attr("disabled","disabled");
    } else {
    	publicElement.currentPageNum += 1;
    	getMessages(publicElement.currentPageNum);
    	console.log("当前页："+publicElement.currentPageNum);
    	if (publicElement.currentPageNum == parseInt($("#Paging-total span").text())) {
    		$("#next_page").attr("disabled","disabled");
    	} else {
    		$("#next_page").attr("disabled",false);
    	}
    	$("#previous_page").attr("disabled",false);
    }
}

function onJumpToBtnClick() {
	var jumpToNum = parseInt($("#jumpToNum").val());
	if(jumpToNum == null || jumpToNum == "") {
		alert("请输入整数页码");
	}else if(jumpToNum > parseInt($("#Paging-total span").text())) {
		alert("超过页数范围，请重新输入");
	} else {
		getMessages(jumpToNum);
		publicElement.currentPageNum = jumpToNum;
		console.log("当前页："+publicElement.currentPageNum);
		if(jumpToNum == 1) {
			$("#next_page").attr("disabled",false);
			$("#previous_page").attr("disabled","disabled");
		}else if(jumpToNum == parseInt($("#Paging-total span").text())) {
			$("#next_page").attr("disabled","disabled");
			$("#previous_page").attr("disabled",false);
		} else {
			$("#next_page").attr("disabled",false);
			$("#previous_page").attr("disabled",false);
		}
	}
}