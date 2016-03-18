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
    <style>
        @font-face {
            font-family : 'VMapPublic';
            src : url(./VMapPublic.ttf);
        }
        body, html{
        	width: 100%;
        	height: 100%;
        	margin:0;
        }
		#searchBeaconUrl{
        	float:left;
        }
        #searchBeaconUrl input,#searchBeaconUrl select{
        	font-size: 13px;
        	-moz-border-radius: 5px;      /* Gecko browsers */
		    -webkit-border-radius: 5px;   /* Webkit browsers */
		    border-radius:5px;            /* W3C syntax */
		    outline:none;
        }
        #searchBeaconUrl #searchMajor,#searchBeaconUrl #searchMinor{
        	width: 60px; 
        }
        #bindUrlBtn{
        	float: right;
        	-moz-border-radius: 100px;      /* Gecko browsers */
		    -webkit-border-radius: 100px;   /* Webkit browsers */
		    border-radius:100px;            /* W3C syntax */
		    outline:none;
		    color: #fff;
		    background-color: #5cb85c;
		    border-color: #4cae4c; 
        }
        #urltable img{
        	width: 40px;
        	height: 40px;
        }
        #urltable,#urltable th,#bindingHeader,#bindingBody{
        	text-align: center;
        }
        .unbindUrlBtn{
        	width: 24px;
        	height: 24px;
        	-moz-border-radius: 20%;      /* Gecko browsers */
		    -webkit-border-radius: 20%;   /* Webkit browsers */
		    border-radius:20%; 
        }
        #addUrlBtn{
        	float:right;
        }
        #bindUrlModal .modal-header{
        	padding-bottom: 35px;
        }
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
                           	<li class="active"><a href="ad_appendUrl.jsp"><i class="glyphicon glyphicon-plus-sign"></i> URL追加</a></li>
                           	<li><a href="ad_urlBatchAudit.jsp"><i class="glyphicon glyphicon-hdd"></i> URL批量审核</a></li>
                           <!--  <li><a href="#"><i class="glyphicon glyphicon-bold"></i> Beacon ID</a></li> -->
                        </ul>
                    </li> 
                    <li>
                        <a href="ad_statisticalInformation.jsp"><i class="glyphicon glyphicon-list-alt"></i><span>  摇一摇统计信息</span></a>
                    </li>
                    <li>
                        <a href="ad_manual.jsp"><i class="glyphicon glyphicon-question-sign"></i><span>  平台使用手册<strong>(更新至2.1版)</strong></span></a>
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
                        <a href="#">Url追加</a>
                    </li>
                </ul>
            </div>	
            
            <div class="row">
                <div class="box col-md-12" style="margin-top:20px">
                    <div class="box-inner">
                        <div class="box-header well" data-original-title="">
                            <div id="searchBeaconUrl">
                            	<select name="UUID" id='searchUuid'>
									<option value="FDA50693-A4E2-4FB1-AFCF-C6EB07647825" selected="selected">FDA50693-A4E2-4FB1-AFCF-C6EB07647825</option>
									<option value="AB8190D5-D11E-4941-ACC4-42F30510B408">AB8190D5-D11E-4941-ACC4-42F30510B408</option>
								</select> - 
                            	<input class="validate_notNull validate_number" id="searchMajor" type="text" placeholder="major"/> -
                            	<input class="validate_notNull validate_number" id="searchMinor" type="text" placeholder="minor"/> -
                            	<input class="btn btn-xs btn-primary" id="submitSearchBtn" type="submit" value="查询"/>
                            </div>
                            <button id="bindUrlBtn">绑定url</button>
                        </div>
						
                        <div class="box-content">
                            <table class="table table-bordered table-condensed" id="urltable">
                                <thead>
                                <tr>
                                 	<th>编号</th>
                                    <th>标题</th>
                                    <th>副标题</th>
                                    <th>logo</th>
                                    <th>URL</th>
                                    <th>备注信息</th>
                                    <th>时间</th>
                                </tr>
                                </thead>
                                <tbody>
									<tr><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>	
	</div><!--/fluid-row-->
</div>

<div class="modal fade" id="bindUrlModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <div id="bindingHeader"></div>
                    <div><button id="addUrlBtn" class="btn btn-sm btn-info">+绑定url</button></div>
                </div>
                <div class="modal-body" id="bindingBody">
                	           					
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id='submitBindUrl'>提交</button>
                	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>                
                </div>
            </div>
        </div>
    </div>
    
    
    <script src="js/publicElement.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.blockUI.js"></script>
    <script src="js/jquery.form.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/charisma.js"></script>
    <script src='js/jquery.dataTables.min.js'></script>
    <script src="js/dataTables.bootstrap.js"></script>
    <script src="js/validate.js"></script>
	<script src="js/personalData.js"></script>
	<script src="js/appendUrl.js"></script>
  </body>
</html>

