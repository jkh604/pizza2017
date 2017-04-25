let pizzas = [
        {name: "Cheese", img: "cheese.png", price: 7.89},
        {name: "Pepperoni", img: "pizza.png", price: 9.99},
        {name: "Alfredo", img: "alfredo-pizza.png", price: 10.89}
];

//separate javascript, html, css
//easy to maintain, easy to debug
//easy to write
function registerButtonEvents()
{
        let buttons=document.getElementsByTagName("button");
        for(let i = 0; i < buttons.length-1; i++)
        {
                buttons[i].addEventListener("click", function() {
                        addToCart(i);
                });
        }
        let number = localStorage.getItem("number");
        if(number===null)
                number=0;
        document.getElementById("numItem").innerHTML=number;
}

function addToCart(pId)
{
        let cartJ = localStorage.getItem("cart");
        let cart;
        if (cartJ === null) //shopping cart is empty
        {
                cart = [];
        }
        else
        {
                cart = cartJ.split(",");
        }
        cart.push(pId);
        let number = localStorage.getItem("number");
        if(number === null)
                number = 0;
        document.getElementById("numItem").innerHTML=`${++number}`;
        localStorage.setItem("cart", cart.toString());
        localStorage.setItem("number", number);
}

function clearCart()
{
        localStorage.removeItem("cart");
        localStorage.removeItem("number");
        number = 0;
        //document.getElementById("numItem").innerHTMl = 10;
        document.getElementById("numItem").innerHTML=`${number}`;
}

function createCart() {
var jqxhr=$.ajax("/getMenuItems")
        .done(function(docs) {
                for(doc of docs)
                        arr.push(doc);
                showCart()
        })
        .fail(function() {
                alert("Try Again!");
        })
}


function showCart()
{
        let cartJ = localStorage.getItem("cart");
        let cart = [];
        let cartTotal = [];
        let info = "";
        let totalPrice = 0;
        if(cartJ === null)
        {
                document.getElementById("totalPrice").innerHTML=`<p>$ 0.00 </p>`;
        }
        else
        {
                cartTotal = cartJ.split(",");

                for (let i of cartTotal) //for loop to add up total price
                {
                        let item=pizzas[i];
                        totalPrice = totalPrice + item.price;
                }
                document.getElementById("totalPrice").innerHTML = `<p>$ ${totalPrice} </p>`;
        }
        if (cartJ === null)
        {
                document.getElementById("myCart").innerHTML = "<h2>You have no items in the cart!</h2>";
        }
        else
        {
                cart = cartJ.split(",");

                for (let i in cart)
                {
                        let item = pizzas[cart[i]];
                        info+=
                                `<div class="row">
                                        <div class="col-md-2 text-center">
                                                <h3>${item.name}</h3>
                                        </div>
                                        <div class="col-md-2 text-center">
                                                <img class="pizza" src="./images/${item.img}" alt="pepperoni">
                                        </div>
                                        <div class="col-md-2 text-center">
                                                <h3>${item.price}</h3>
                                        </div>
                                        <div class="col-md-2 text-center">
                                                <button type="button" class="btn btn-primary" onclick="removePizza(${i})">Remove</button>
                                        </div>
                                </div>
                                `;
                } //end of loop
                document.getElementById("myCart").innerHTML=info;
        }
}

function removePizza(piz)
{
        var cart = localStorage.getItem("cart");
        cart = cart.split(",");
        cart.splice(piz, 1);
        if (cart.length == 0)
                clearCart();
        else
        {
                localStorage.setItem("cart", cart);
                localStorage.setItem("number",cart.length);
        }
showCart();
}

function getSummary() {
        var jqxhr=$.ajax("/getOrders")
        .done(function(docs) {
                var total = 0;
                var numPizzas = 0;
                for(doc of docs) {
                        numPizzas += doc.items.length;
                        for (pizza of doc.items)
                                total += pizza.price;
                }
                document.getElementById("numPizzas").innerHTML = "There were " + numPizzas + " pizzas sold today!";
                document.getElementById("total").innerHTML = "The total revenue for today was $"+total.toFixed(2);
        })
        .fail(function() {
                alert("Try Again!");
        })
}
