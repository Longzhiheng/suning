<?php  
	// //1.连接数据库--mysql_connect(主机名,用户名,密码);
	// header('content-type:text/html;charset=utf-8');
	// define('HOST','localhost');
	// define('USERNAME','root');
	// define('PASSWORD','');//密码是自己数据库的密码。
	// $conn=@mysql_connect(HOST,USERNAME,PASSWORD);//@:简单的容错处理。
	// if(!$conn){
	// 	die('数据库连接失败'.mysql_error());
	// 	//退出并返回括号里面的内容  mysql_error():报错信息。
	// }
	// //2.选择数据库,设置字符集
	// mysql_select_db('user');
	// mysql_query('SET NAMES UTF8');///设置字符编码集utf-8


	header('content-type:text/html;charset=utf-8');//设置字符编码
	define('HOST','localhost');//本地主机
	define('NAME','root');//数据库的用户名
	define('PASSWORD','');//数据库的密码
	define('DBNAME','user');//数据库名称
	$conn=@new mysqli(HOST,NAME,PASSWORD,DBNAME);
	if($conn->connect_error){
		die('数据库连接失败'.$conn->connect_error);//结束并输出里面的内容
	}
	$conn->query("set names utf8");

?>