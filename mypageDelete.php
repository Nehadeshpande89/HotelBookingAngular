<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$conn = new mysqli('localhost','root','','user');
if(isset($_POST['name']))
{
  $sql = "INSERT INTO userdata (firstname, email, mobile)
  VALUES ('".$_POST['name']."', '".$_POST['email']."', ".$_POST['phone'].")";

  if ($conn->query($sql) === TRUE) {
    $myJSON = json_encode("New user created successfully");
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}
elseif(isset($_POST['id']))
{
  // sql to delete a record
  $sql = "DELETE FROM userdata WHERE id=".$_POST['id'];

  if ($conn->query($sql) === TRUE) {
    $myJSON = json_encode("Record deleted successfully");
  } else {
    echo "Error deleting record: " . $conn->error;
  }
}
else
{
$sql = "SELECT * FROM userdata";
$result = $conn->query($sql);
$myArr = array();
if ($result->num_rows > 0) {
// output data of each row
while($row = $result->fetch_assoc()) {
$myArr[] = $row;
}
} else {
echo "0 results";
}

$myJSON = json_encode($myArr);
echo $myJSON;
}