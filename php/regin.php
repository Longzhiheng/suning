<?php

    require "conn.php";//引入数据库连接

    //获取前端页面传来的值
  
        $usename=$_GET['usename'];
        $password=$_GET['password'];
        $conn->query("insert coment values(null,'$usename','$password')");
 
    
    