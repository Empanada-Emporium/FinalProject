let label = document.getElementById('label') // declaring block scoped variable
let shoppingCart = document.getElementById('shopping-cart') // declaring block scoped variable
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Caculation function to calculate the amount of item selected

// let Calculation =()=>{
//     let cartIcon = document.getElementById("cartAmount"); // Target Id = "cartAmount" in Html
//     cartIcon.innerHTML =  basket.map((x)=>x.item).reduce((x, y) => x + y ,0);
       
//     };
    
//     Calculation ();
    
    // let generateCartItem = ()=>{
    //     if(basket.length !==0){
    //         return (shoppingCart.innerHTML = basket.map((x)=>{
    //             let {id} = x;
    //             let search = shopItemsData.find((y)=> y.id === id) || [];
    //             let {name}= search

    //             return `
                
              
               

    //             <div class="">
    //                 <h4 class="description">
    //                 <p>${name}</p>
                
            
    //             </div>    
                
    //             `;
    //         }).join(""));
    //     }
    //     else{
    //         shoppingCart.innerHTML =``;
    //         label.innerHTML = `
    //         <center><h3> Cart is Empty</h3></center>
    //         <a href="menu.html">
    //         <center><button class="MenuBtn"> Back to the Menu</button></center>
    //         </a>
    //         `;
    //     }

    // };

    // generateCartItem();

    // let increment = (id) => {
    //     let selectedItem = id; // Assigning the variable id to selectedItem
    
    //     // search for item and pushing it to the basket
    //     let search = basket.find((x)=> x.id === selectedItem.id);
    
    //     if( search === undefined){
    //         basket.push(
    //         {
    //             id: selectedItem.id,
    //             item: 1,
    //         }
    //     );
    
    //     } 
    //     else{
    //         search.item += 1;
    //     }
    //     localStorage.setItem("data", JSON.stringify(basket)); //Saving data in a local storage
    //     generateCartItem();
    //     update(selectedItem.id);
    // };
    

    // Calculating Total amount
    
    let TotalAmount = () =>{
        if(basket.length !==0){
          
            let amount = basket.map((x)=>{
               let {item, id} =x; 
               let search = shopItemsData.find((y)=> y.id === id) || [];
               
               return item * search.price;
            }). reduce((x,y)=>x+y,0)
            
         
            label.innerHTML = `
            <div class="popup center">
		<div class="icons">
			<i class="fa fa-check"></i>
		</div>
		<div class="title-head">
			Success!!!
            <h2>Thank you for your purchase</h2>
		</div>
        <h3> Total Bill : $ ${amount}</h3>
		<div class="div description">
			Your details of your purchase will be sent to you shortly.Thanks.
		</div>
		<div class="dismiss-btn">
        <a href="index.html">
			<button id="dismiss-popup-btn">
				ok
			</button>
            </a>
		</div>
	</div>
       
           `
           document.getElementById('checkoutBtn').addEventListener('click', function() {
            window.location.href = 'checkout.html'; 
        });
        } else return;

    } ;
     
    TotalAmount();

    