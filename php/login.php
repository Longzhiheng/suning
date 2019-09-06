<?php  
	
	include "conn.php";
	
    $usename=$_GET['usename'];
    $password=$_GET['password'];
     $result=$conn->query("select * from coment where usename='$usename' and password='$password'");
      if($result->fetch_assoc()){//匹配结果索引
              echo true; 
          }
          else{
              echo false;
          };
    // if(isset($_POST['usename']) && isset($_POST['password'])){
    //     $user=$_POST['usename'];
    //     $pass=sha1($_POST['password']);
    
    //     $result=$conn->query("select * from coment where username='$user' and password='$pass' ");
    
    //     if($result->fetch_assoc()){//匹配成功
    //         echo true;
    //     }else{
    //         echo false;
    //     }
    
    // }
?>


