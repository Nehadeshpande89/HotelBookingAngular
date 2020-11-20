<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$conn = new mysqli('localhost','root','','hotelbooking');

if(isset($_POST['udpateData']))
{
    $sql = "UPDATE bookingdata SET CustomerName='".$_POST['CustomerName']."', StartDate='".$_POST['StartDate']."', EndDate='".$_POST['EndDate']."' WHERE BookingId='".$_POST['id']."'";
    if ($conn->query($sql) === TRUE) {  
    $myJSON = json_encode("Record Updated successfully");
  } else {
    echo "Error deleting record: " . $conn->error;
  }
}
elseif(isset($_POST['CustomerName']) && (isset($_POST['udpateData']) == NULL))
{
    $sql = "INSERT INTO bookingdata (CustomerName, StartDate, EndDate)
    VALUES ('".$_POST['CustomerName']."', '".$_POST['StartDate']."', '".$_POST['EndDate']."')";

  if ($conn->query($sql) === TRUE) {
    $myJSON = json_encode("New Booking created successfully");
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
} 
elseif(isset($_POST['id']) && isset($_POST['udpateData']) == NULL)  
{
  // sql to delete a record
  $sql = "DELETE FROM bookingdata WHERE BookingId=".$_POST['id'];

  if ($conn->query($sql) === TRUE) {
    $myJSON = json_encode("Record deleted successfully");
  } else {
    echo "Error deleting record: " . $conn->error;
  }
}
else
{
$sql = "SELECT * FROM bookingdata";
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