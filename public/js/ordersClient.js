function sendOrder () {
	arrS=localStorage.getItem("cart");
	var phone=document.getElementById("phone").value;
	var data= JSON.stringify({"phone":phone,"cart":arrS});
	if(arrS===null)
		document.getElementById("cart").value="No Item!";
	else
	{
	
		
		var xhr = new XMLHttpRequest();
	   var url = ajaxUrl+"/order";
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange=function(){
         if (xhr.readyState==4 && xhr.status==200){
           var obj=JSON.parse(xhr.responseText);
           document.getElementById("cart").innerHTML="Order Id:"+obj.orderId;
//           document.getElementById("cart").innerHTML=xhr.responseText;
		document.getElementById("data").innerHTML="Your order has been placed!"+arrS;
		
       }
      }
      xhr.send(data);


		
  }
}