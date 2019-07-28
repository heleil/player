<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	if(request.getAttribute("result")!=null){
		String result =request.getAttribute("result").toString();
		if(result.equals("1")){
			out.print("保存成功");
			out.print("<script>alert('保存成功');</script>");
		}
		else{
			out.print("保存失败");
			out.print("<script>alert('保存失败');</script>");
		}
	}
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加设备号到转发系列</title>
</head>
<body>
<a href="addImei.htm">添加需要转发数据的设备号</a>
	<div>
		<form name="savaImei" onsubmit="checksubmit()" action="savaForwardImei.htm" method="post">
			<table border="1" cellpadding="0" cellspacing="0" bordercolor="#666" height="260"  width="700">
			<caption>*请谨慎操作</caption>
				<tr>
					<td>IMEI</td>
					<td><input name="imei"/>*必填，输入 *#06#  查询</td>
				</tr>
				<tr>
					<td>URL</td>
					<td><input name="url"/>*必填，服务器地址+端口号（如：http://115.29.5.227:8080） </td>
				</tr>
				<tr>
					<td>公司名称</td>
					<td><input name="name"/></td>
				</tr>
				<tr>
					<td>描述</td>
					<td><textarea name="desc" cols="60" rows="4"></textarea></td>
				</tr>
				<tr>
					<td colspan="2" align="center"><input type="submit" value="保存"></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>



