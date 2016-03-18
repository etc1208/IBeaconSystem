<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Beacon管理平台</title>
	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
    <link id="bs-css" href="css/bootstrap-cerulean.min.css" rel="stylesheet">
    <link href="css/dataTables.bootstrap.css" rel='stylesheet'>
    <link href="css/charisma-app.css" rel="stylesheet">
	<link href='css/style.css' rel="stylesheet">
    <link href='css/bootstrap-datetimepicker.min.css' rel="stylesheet">
    <style>
        @font-face {
            font-family : 'VMapPublic';
            src : url(./VMapPublic.ttf);
        }
        pre,h4,h5,abbr{padding:0;margin-bottom:0;}
        kbd{background-color:#6C5195;margin-left:2px;}
        .img-thumbnail{width:96%;margin-left:2%;}
        abbr{background-color:yellow;color:red;}
    </style>
    <!-- The fav icon -->
    <link rel="shortcut icon" href="images/favicon.ico">
  </head>

  <body>
    <div class="navbar navbar-default" role="navigation">
        <div class="navbar-inner">
            <button type="button" class="navbar-toggle pull-left animated flip">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"> <img alt="Charisma Logo" src="images/logo20.png" class="hidden-xs"/>
                <span>Beacon管理平台</span></a>

            <!-- user dropdown starts -->
            <div class="btn-group pull-right theme-container animated tada">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <i class="glyphicon glyphicon-user"></i><span class="hidden-sm hidden-xs" id="login_id" uid='${sessionScope.admin.get("staff_id")}' typeId='${sessionScope.admin.get("state")}' manage='${sessionScope.admin.get("manage")}'> ${sessionScope.admin.get("staff_name")}</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#" id='personalData'>个人资料</a></li>
                    <li class="divider"></li>
                    <li><a href="logout" >注销</a></li>
                </ul>
            </div>
		</div>
	</div>
    <div class="ch-container">
      <div class="row">
        <!-- left menu starts -->
        <div class="col-sm-2 col-lg-2">
		<div>
		</div>	
          <div class="sidebar-nav">
            <div class="nav-canvas">
              <div class="nav-sm nav nav-stacked">
              </div>
                <ul id = "leftMenu" class="nav nav-pills nav-stacked main-menu">
                    <li id = "view">
                        <a href="ad_staff.jsp"><i class="glyphicon glyphicon-user"></i><span>  代理资源管理</span></a>
                    </li>
                    
					<li>
                        <a href="ad_equipmentInfo.jsp"><i class="glyphicon glyphicon-th-list"></i><span>  设备信息查看</span></a>
                    </li>
                     <li>
                        <a href="ad_distributionAndCheck.jsp"><i class="glyphicon glyphicon-indent-left"></i><span>  设备分配管理</span></a>
                    </li>
                    <li class="accordion">
                    	<a href="#"><i class="glyphicon glyphicon-tasks"></i><span> 摇一摇项目管理</span></a>
                        <ul class="nav nav-pills nav-stacked">
                            <li><a href="ad_project.jsp"><i class="glyphicon glyphicon-tags"></i> 项目</a></li>
                            <li><a href="ad_url.jsp"><i class="glyphicon glyphicon-link"></i> URL</a></li>
                            <li><a href="ad_appendUrl.jsp"><i class="glyphicon glyphicon-plus-sign"></i> URL追加</a></li>
                            <li><a href="ad_urlBatchAudit.jsp"><i class="glyphicon glyphicon-hdd"></i> URL批量审核</a></li>
                            <!--<li><a href="#"><i class="glyphicon glyphicon-bold"></i> Beacon ID</a></li>-->
                        </ul>
                    </li>
                    <li>
                        <a href="ad_statisticalInformation.jsp"><i class="glyphicon glyphicon-list-alt"></i><span>  摇一摇统计信息</span></a>
                    </li> 
                    <li class="active">
                        <a href="ad_manual.jsp"><i class="glyphicon glyphicon-question-sign"></i><span>  平台使用手册<strong>(更新至2.1版)</strong> </span></a>
                    </li>
                </ul>
            </div>
          </div>
        </div>
        <!--/span-->
        <!-- left menu ends -->

        <noscript>
          <div class="alert alert-block col-md-12">
            <h4 class="alert-heading">警告!</h4>
            <p>You need to have <a href="http://en.wikipedia.org/wiki/JavaScript" target="_blank">JavaScript</a>
              enabled to use this site.</p>
          </div>
        </noscript>
		
        <div id="content" class="col-lg-10 col-sm-10">
          <!-- content starts -->
            <div>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">主页</a>
                    </li>
                    <li>
                        <a href="#">平台使用手册</a>
                    </li>
                </ul>
            </div>
            <!-- 说明文档巨幕开始 -->
            
            
            <div >
            <h3>使用手册2.1</h3>
            <h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意：该部分只添加在2.0基础之上新增加的功能说明</abbr></h4>
            </div>
            <div class="jumbotron">
  				<pre>
  					<h4><kbd>摇一摇统计信息</kbd> 在每一部分统计中都添加<abbr>图形统计</abbr>，包括<abbr>柱状图</abbr>和<abbr>折线图</abbr></h4>
  					<h4>在条件筛选中，添加了<strong><u>最近7日，最近10日，最近15日</u></strong>的查询，同时依然保留自定义时间查询</h4>
  					<!--  h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：修改信息时尽量避免填写特殊字符，例如￥，&，#等</abbr></h4> -->
  					<img src="images/manualImg/13.png" alt="统计信息新增图形统计" class="img-thumbnail">
  					<img src="images/manualImg/14.png" alt="统计信息新增图形统计" class="img-thumbnail">
  				</pre>
			</div>
            
          
            
            <div>
            <h3>使用手册2.0</h3>
            <h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意：该部分只添加在1.0基础之上新增加的功能说明</abbr></h4>
            </div>
            <div class="jumbotron">
  				<pre>
  					<h4><kbd>代理资源管理</kbd> 添加权限归属查看，点击查看权限按钮</h4>
  					<!--  h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：修改信息时尽量避免填写特殊字符，例如￥，&，#等</abbr></h4> -->
  					<img src="images/manualImg/9.png" alt="查看权限归属" class="img-thumbnail">
  				</pre>
			</div>
			<div class="jumbotron">
  				<pre>
  					<h4><kbd>代理详情查看</kbd> 添加代理的Beacon信息，点击查看按钮</h4>
  					<!--  h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：修改信息时尽量避免填写特殊字符，例如￥，&，#等</abbr></h4> -->
  					<img src="images/manualImg/10.png" alt="查看权限归属" class="img-thumbnail">
  				</pre>
			</div>
           
            <div class="jumbotron">
  				<pre>
  					<h4><kbd>设备信息查看</kbd> 添加设备使用的总体情况，并对每一个设备可以查看设备所在项目等详情，点击设备详情按钮</h4>
  					<!--  h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：修改信息时尽量避免填写特殊字符，例如￥，&，#等</abbr></h4> -->
  					<img src="images/manualImg/11.png" alt="设备信息查看" class="img-thumbnail">
  				</pre>
			</div>
			<div class="jumbotron">
  				<pre>
  					<h4><kbd>摇一摇项目管理--URL</kbd> 添加对某一条URL增减绑定设备的功能，点击增减按钮；并可以查看URL所绑定的资源、设备个数等详情，点击查看按钮</h4>
  					<h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：增减功能只能对URL增加绑定和原来相同UUID的资源，解除原有的任意资源绑定</abbr></h4>
  					<img src="images/manualImg/12.png" alt="URL新增功能" class="img-thumbnail">
  				</pre>
			</div>
			
            <div>
            <h3>使用手册1.0</h3>
            </div>
			<div class="jumbotron">
  				<pre>
  					<h4><kbd>注销/查看&修改个人资料</kbd> 点击管理平台页面右上角按钮即可进行相关操作</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：修改信息时尽量避免填写特殊字符，例如￥，&，#等</abbr></h4>
  					<img src="images/manualImg/1.png" alt="注销/查看&修改个人资料" class="img-thumbnail">
  				</pre>
			</div>
			
			<div class="jumbotron">
  				<pre>
  					<h4><kbd>代理资源管理</kbd> 可查看该用户的代理信息；点击每条记录右侧“查看”、“修改”按钮，可相应地查看详细信息及修改资料，详细信息里包括用户名，密码，联系电话、用户类别。审核权限等基本信息，以及该用户所拥有的权限；修改操作可对上述信息进行相应更改</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：修改用户信息时，一要注意避免特殊字符（%，&，#等）；二要注意分配设备时要符合规范（UUID下必须有至少一个major以及一个minor），并填写所拥有号段，否则无权限修改</abbr></h4>
  					<img src="images/manualImg/2.png" alt="代理资源管理" class="img-thumbnail">
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击右上方“+增加用户”按钮，可新增代理，需填写有关信息及分配权限等</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：新增用户时要避免输入特殊字符（%，&，#等）；管理员可新增有审核权限的中间代理，中间代理只能新增无审核权限的末级代理；添加UUID时要符合规范，并在所拥有设备范围内填写，否则无法完成新增</abbr></h4>
  				</pre>
			</div>
			
			<div class="jumbotron">
  				<pre>
  					<h4><kbd>设备信息查看</kbd>可查询该用户拥有设备的详细记录以及地图展示等</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：为保证加载速度，设备信息列表中仅显示前100条记录，未在列表中显示的记录可通过更多搜索检索得到，地图分布按钮为绿色状态可点击查看地图分布</abbr></h4>
  					<img src="images/manualImg/3.png" alt="设备信息查看" class="img-thumbnail">
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击右侧“更多搜索”按钮，可根据UUID，major，minor，时间，状态等筛选条件进行条件查询</h4>
  				</pre>
			</div>
			
			<div class="jumbotron">
  				<pre>
  					<h4><kbd>设备分配管理</kbd>可查看当前设备分配情况；点击右侧“查看”按钮，可查询分配详情信息；点击“分配”按钮可进行设备分配</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：再进行分配时要填写分配类型以及分配数量，两项均为必填，避免特殊字符</abbr></h4>
  					<img src="images/manualImg/4.png" alt="设备分配管理" class="img-thumbnail">
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击右侧“上传设备绑定Excel”按钮(只有管理员有此功能权限)，通过上传excel,将设备信息导入数据库</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：上传文件的格式必须为.xls或.xlsx结尾的Excel文件，否则失败；Excel文件内容要符合约定格式</abbr></h4>
  				</pre>
			</div>
			
			<div class="jumbotron">
  				<pre>
  					<h4><kbd>摇一摇项目管理</kbd>点击左侧“项目”选项，可查询用户创建的项目信息</h4>
  					<img src="images/manualImg/5.png" alt="摇一摇项目管理" class="img-thumbnail">
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击“+新建项目”按钮，填写项目名称、项目位置、时间等信息，进行新项目创建;点击每条记录右侧“修改”按钮，可进行相应项目信息的修改</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：避免填写特殊字符（#，%，&等），前四项为必填项</abbr></h4>
  				</pre>
			</div>
			
			<div class="jumbotron">
  				<pre>
  					<h4><kbd>URL</kbd>可查看当前该用户申请的url信息，包括审核状态，页面编号，（副）标题，url，所属设备、项目等信息</h4>
  					<img src="images/manualImg/6.png" alt="URL" class="img-thumbnail">
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击右侧“+新增url”按钮，填写标题、副标题、url、上传logo、选择隶属项目、添加Beacon设备等，进行url新增操作</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：避免输入特殊字符，上传的Logo必须为png,jpg,jpeg,gif等图片格式，建议尺寸为120*120的正方形图片，最好不超过200*200.必须至少添加一个Beacon，要求符合格式规范并在所拥有号段范围内。url必须以http(s)://开头，符合url地址规范</abbr></h4>
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击每条记录右侧“查看”按钮，可查询相应记录的详细信息</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：避免输入特殊字符，上传的Logo必须为png,jpg,jpeg,gif等图片格式，建议尺寸为120*120的正方形图片，最好不超过200*200.必须至少添加一个Beacon，要求符合格式规范并在所拥有号段范围内。url必须以http(s)://开头，符合url地址规范</abbr></h4>
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击每条记录右侧“修改”按钮，可对于相应记录的标题、副标题、url、logo等信息进行编辑操作</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：避免输入特殊字符，若使用服务器已有logo，则无需再次上传本地图片；若上传了新的logo图片，则默认不使用已有服务器logo</abbr></h4>
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击每条记录右边“复制”按钮，可依据当前记录条目简化新增流程，使用已有的服务器logo，url地址等信息，快速添加url记录</h4>
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击每条记录右边“删除”按钮，会删除微信平台相对应条目的有关记录，服务器端将相应条目的状态位置为删除状态</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：请确保您要删除的条目已不再使用，否则删除后原来绑定的beacon设备将无法摇出页面,所以尽量不要轻易进行删除操作，若想要修改信息，大可通过修改按钮进行相关改动</abbr></h4>
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击上方“该用户拥有Beacon号段”和“该用户未绑定页面Beacon号段”，可分别展示下拉菜单，内容分别为当前用户拥有的Beacon详细信息以及未绑定页面的Beacon详细信息</h4>
  				</pre>
			</div>
			
			<div class="jumbotron">
  				<pre>
  					<h4><kbd>URL批量审核</kbd>填写标题。副标题，上传logo，其他信息，url前缀、后缀，UUID，major，minor号段范围等信息进行批量审核</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：避免输入特殊字符，可上传本地logo图片，也可直接在服务器logo一栏中填写已有的服务器logo地址，若上传本地图片，默认不使用服务器logo；注意图片格式要求；url前缀为批量上传url的公共部分；url后缀为批量url最后的参数，为数字格式；注意url后缀的范围长度要等于minor号段的区间长度，才能一一对应进行批量处理</abbr></h4>
  					<img src="images/manualImg/7.png" alt="URL批量审核" class="img-thumbnail">  					
  				</pre>
			</div>
						
			<div class="jumbotron">
  				<pre>
  					<h4><kbd>摇一摇统计信息</kbd>可查询近期基于“设备”、“页面”、“项目”的摇一摇数据统计，包括要出页面人数/次数，打开页面人数/次数等</h4>
  					<img src="images/manualImg/8.png" alt="摇一摇统计信息" class="img-thumbnail">
  					<h4><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span> 点击右侧“筛选条件”按钮，可分别基于“设备”、“页面”、“项目”进行条件筛选，输入筛选信息进行信息匹配查询</h4><h4><abbr><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>注意事项：选择“页面”、“设备”、“项目”单选按钮，下方列表内容会相应变化，同事所选择筛选条件弹出框也会相应变化；注意筛选条件除时间以外为必填项，不可漏填</abbr></h4>
  				</pre>
			</div>
            <!-- 说明文档巨幕结束 -->
            
            
		</div><!--/#content.col-md-0-->
	</div><!--/fluid-row-->
</div> 
   
       
    
    <div class="modal fade" id="personalDataModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <div><h3 >个人资料</h3></div>
                </div>
                <div class="modal-body" >
                	<form class="form-horizontal" role="form">

                        <div class="form-group form-group-sm">
                            <label class="col-md-3 control-label">用户ID</label>
                            <div class="col-md-9"><input type="text" class="form-control" id="personal_id" disabled></div>
                        </div>

                        <div class="form-group form-group-sm">
                            <label class="col-md-3 control-label">用户名</label>
                            <div class="col-md-9"><input type="text" class="form-control" id="personal_name" disabled></div>
                        </div>

                        <div class="form-group form-group-sm">
                            <label class="col-md-3 control-label">密码</label>
                            <div class="col-md-9"><input type="text" class="form-control" id="personal_pwd" disabled></div>
                        </div>
						
						<div class="form-group form-group-sm">
                            <label class="col-md-3 control-label">联系人电话</label>
                            <div class="col-md-9"><input type="text" class="form-control validate_specialCharacter" id="personal_contact"></div>
                        </div>

						 <div class="form-group form-group-sm">
                            <label class="col-md-3 control-label" >联系人QQ</label>
                            <div class="col-md-9"><input type="text" class="form-control validate_specialCharacter" id="personal_qq"></div>
                        </div>
						
						 <div class="form-group form-group-sm">
                            <label class="col-md-3 control-label">联系人微信</label>
                            <div class="col-md-9"><input type="text" class="form-control validate_specialCharacter" id="personal_wechat"></div>
                        </div>
						
						<div class="form-group form-group-sm">
                            <label class="col-md-3 control-label">联系人邮箱</label>
                            <div class="col-md-9"><input type="text" class="form-control validate_specialCharacter" id="personal_email"></div>
                        </div>
							
                        <div class="form-group form-group-sm">
                            <label class="col-md-3 control-label">其他信息</label>
                            <div class="col-md-9"><input type="text" class="form-control validate_specialCharacter" id="personal_other"></div>
                        </div>
                        
                        <div class="form-group form-group-sm">
                            <label class="col-md-3 control-label">用户类别</label>
                            <div class="col-md-9"><input type="text" class="form-control" id="personal_type" disabled></div>
                        </div>
						<div class="form-group form-group-sm">
                            <label class="col-md-3 control-label">审核权限</label>
                            <div class="col-md-9"><input type="text" class="form-control" id="personal_manage" disabled></div>
                        </div>
                        <div id = "personal_sessions">
                        </div>
                    </form>                 					
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id='submitPersonalInfoBtn'>提交</button>
                	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>              
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="js/publicElement.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.blockUI.js"></script>
	<script src="js/personalData.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/charisma.js"></script>
	<script src='js/validate.js'></script>
  </body>
</html>

