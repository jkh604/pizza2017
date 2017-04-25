var arr = [];

//document: .html file containing this file
//.ready(): The web page is fully loaded by the browser
$(document).ready(function(){
	//This ajax is sending the request to the same server it comes from
	var jqxhr = $.ajax("/getMenuItems")
				.done(function(docs) {
					for(doc of docs) 
						arr.push(doc);
					generateCart();
				})
				.fail(function(){
					alert("Please try again!");
				})
});

function sendOrder() {
	cartArr = JSON.parse("[" + localStorage.getItem("cart") + "]");
	var itemIds = [];
	if(cartArr === null)
		document.getElementById("cart").value = "No item!";
	else
	{
		for(index of cartArr)
			itemIds.push(arr[index]._id);
		var phone = document.getElementById("phone").value;
		//var phone = $("#phone").value;
		var order = {"phone":phone, "itemIds":itemIds};

		$.ajax({
			method: "post",
			url: "processOrders",
			data: order
		})
		.done(function(msg) {
			document.getElementById("data").innerHTML = "Your order has been placed!" + msg;
			//$("#cart").html("Your order has been placed!" + result);
		});
	}
}

function generateMenuNum(){
	var numS=localStorage.getItem("num");
	if(numS===null){                                 //isNaN(numS)
		document.getElementById("numItems").textContent=0;
		localStorage.setItem("num",0);
		cartArr=[];
	}
	else
		document.getElementById("numItems").textContent=numS;

}

function getCartItems () {
	arrS=localStorage.getItem("cart");
	if(arrS===null)
		cartArr=[];
	else
	{
	cartArr = JSON.parse("[" + arrS + "]");	
    }
}

function getCartNum () {
numS=localStorage.getItem("num"); //for chrome, it returns not available
 if(isNaN(numS))
	 num=0;
else {
	 num=parseInt(numS);
}
return num;
}

function buttonSelect (id) {
  getCartItems();
 cartArr.push(id);
 var p1=document.getElementById("items");
 p1.innerHTML=cartArr.toString();
 localStorage.setItem("cart",cartArr.toString() );
 numS=localStorage.getItem("num"); //for chrome, it returns not available
 var num=getCartNum()+1;
 localStorage.setItem("num",num);
 var nItemsId=document.getElementById("numItems").textContent=num;
}

function buttonRemove (itemNo) {
 var arrS=localStorage.getItem("cart");
 var arrIndices = JSON.parse("[" + arrS + "]");
 var no=parseInt(itemNo);
 var index = arrIndices.indexOf(no);
 arrIndices.splice(index, 1);
 var div=document.getElementById("cart");
 div.innerHTML='ok';
 ;
// while (div.hasChildNodes()) {
//     div.removeChild(div.firstChild);}

 localStorage.setItem("cart",arrIndices.toString());  
  generateCart();
 // window.location.reload();
 var p1=document.getElementById("items");
 p1.innerHTML=arrIndices.toString();
 var num=getCartNum()-1;
 localStorage.setItem("num",num);
 document.getElementById("numItems").textContent=num; 

}

function generateCart() {
	var i=0;
	var htmlPart="";
	var arrS=localStorage.getItem("cart");
	if(arrS===null)
		htmlPart="You have no items in the cart!";
	else
	{
		var arrIndices = JSON.parse("[" + arrS + "]");
	
	  for(i = 0, length1 = arrIndices.length; i < length1; i++){
	  	itemNo=arrIndices[i];
		 if(i%3===0)
		 {
		 	htmlPart+='<div class="row top-margin">';		
		}
		htmlPart+='<div class="col-sm-4 text-center"';
		htmlPart+='<p>'+arr[itemNo].name+'</p>';
		var imgName=arr[itemNo].img;
		var str='<img src="./images/'+imgName+'" alt="./images/'+
			imgName+'"' +'class=".img-responsive">';
		htmlPart+=str;
		// htmlPart+='<div><button type="button" '+
		// 	' class="btn btn-primary" onclick="buttonRemove('+
		// 	"'"+itemNo+"'"+')">Remove</button>'+'</div></div>';

		htmlPart+='<div><button type="button" '+
			' class="btn btn-primary" onclick="buttonRemove('+
			"'"+itemNo+"'"+')">Remove</button>'+'</div></div>';
	
		if(i%3===2)
		{
			htmlPart+='</div>';
		}
	  }
	}
	//htmlPart=localStorage.getItem("cart");
	var div=document.getElementById("cart");
	div.innerHTML=htmlPart;
	//div.insertAdjacentHTML('afterend', htmlPart);
}
// function removetry () {
// 	var div=document.getElementById('pizzas');
// 	while (div.hasChildNodes()) {
//     div.removeChild(div.firstChild);}
// }

function clearStorage() {
	localStorage.clear(); 
  generateMenuNum(); 
}

function getMenuArr(){

		var xhr = new XMLHttpRequest();
	    var url = ajaxUrl+"/getMenuItems";
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange=function(){
         if (xhr.readyState==4 && xhr.status==200){
           arr=JSON.parse(xhr.responseText);
            generateCart();
       }
      }
      xhr.send();
}

