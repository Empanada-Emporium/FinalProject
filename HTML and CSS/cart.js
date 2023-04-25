let label = document.getElementById('label') // declaring block scoped variable
let shoppingCart = document.getElementById('shopping-cart') // declaring block scoped variable
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Caculation function to calculate the amount of item selected

let Calculation =()=>{
    let cartIcon = document.getElementById("cartAmount"); // Target Id = "cartAmount" in Html
    cartIcon.innerHTML =  basket.map((x)=>x.item).reduce((x, y) => x + y ,0);
       
    };
    
    Calculation ();
    
    let generateCartItem = ()=>{
        if(basket.length !==0){
            return (shoppingCart.innerHTML = basket.map((x)=>{
                let {id, item} = x;
                let search = shopItemsData.find((y)=> y.id === id) || [];
                let {img, name, price}= search

                return `
                <div class="cart-item">
                <img width="100" height="120"  src=${img} alt=" five Empanada product">
                <div class="details">

                <h2 class="cart_price">$ ${item * search.price}</h2>

                <div class="title-price-x">
                    <h4 class="title-price">
                    <p>${name}</p>
                    <p class ="cart-item-price">$${price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>

                <div class="buttons_cart">
							<i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
							<div id=${id} class="quantity">${item}</div>
							<i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                            
				</div>

            
                </div>    
                </div>
                `;
            }).join(""));
        }
        else{
            shoppingCart.innerHTML =``;
            label.innerHTML = `
            <center><h3> Cart is Empty</h3></center>
            <a href="menu.html">
            <center><button class="MenuBtn"> Back to the Menu</button></center>
            </a>
            `;
        }

    };

    generateCartItem();

    let increment = (id) => {
        let selectedItem = id; // Assigning the variable id to selectedItem
    
        // search for item and pushing it to the basket
        let search = basket.find((x)=> x.id === selectedItem.id);
    
        if( search === undefined){
            basket.push(
            {
                id: selectedItem.id,
                item: 1,
            }
        );
    
        } 
        else{
            search.item += 1;
        }
        localStorage.setItem("data", JSON.stringify(basket)); //Saving data in a local storage
        generateCartItem();
        update(selectedItem.id);
    };
    
    // Decreasing the item function
    let decrement = (id) => {
        let selectedItem = id; // Assigning the variable id to selectedItem
    
        // search for item and pushing it to the basket
        let search = basket.find((x)=> x.id === selectedItem.id);
        if (search === undefined) return;
        else if( search.item === 0) return; // end if item equal zero
        else{
            search.item -= 1;
        }
        update(selectedItem.id); 
        basket = basket.filter((x)=>x.item !==0); // this is to make sure the item does not store zero item in the array.
        generateCartItem();
        localStorage.setItem("data", JSON.stringify(basket)); //Saving data in a local storage
    };
    
    // making the number in the item count work.
    let update = (id) => {
        let search = basket.find((x)=>x.id === id);
        document.getElementById(id).innerHTML = search.item
        Calculation();
        TotalAmount();
    };

    //removing item from the cart
    let removeItem =(id) => {
        let selectedItem = id;
        basket = basket.filter((x)=>x.id !== selectedItem.id);
        generateCartItem();
        TotalAmount();
        Calculation();
        localStorage.setItem("data", JSON.stringify(basket));
    };

    let clearCart = ()=>{
        basket = []
        generateCartItem();
        Calculation();
        localStorage.setItem("data", JSON.stringify(basket)); //Saving data in a local storage
    }
    // Calculating Total amount
    let TotalAmount = () =>{
        if(basket.length !==0){
            let amount = basket.map((x)=>{
               let {item, id} =x; 
               let search = shopItemsData.find((y)=> y.id === id) || [];
               return item * search.price;
            }). reduce((x,y)=>x+y,0)
           label.innerHTML = `
           <div class="CheckClear">
           <h3> Total Bill : $ ${amount}</h3>
           <center><button id="checkoutBtn" class ="checkout">Checkout</button></center>
           <center><button onclick="clearCart()" class="removeall">Clear Cart</button></center>
           `
           document.getElementById('checkoutBtn').addEventListener('click', function() {
            window.location.href = 'checkout.html'; 
        });
        } else return;

    } ;
     
    TotalAmount();