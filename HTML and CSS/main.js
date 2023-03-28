let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// GENERATESHOP
let generateShop = () => {

    return (shop.innerHTML = shopItemsData.map((x)=>{
        let{id, name, price, desc, img}= x;
        let search = basket.find((x)=>x.id === id) || []
        return`
        <div id=product-id-${id} class="item-box">
                <center><h1>${name}</h1></center>
					<center><img width="219" height="200" src=${img} alt=""></center>
					<div class="details">
						<p class="description">${desc}</p>
						<div class="price-quantity">
                        <div class="price-container">
						<h2>$ ${price}</h2>
                        </div>
                        <div class="buttons-container">
							<div class="buttons">
								<i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
								<div id=${id} class="quantity">
                                ${search.item === undefined? 0: search.item}
                                </div>
								<i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
							</div>
						</div>
                        </div>
					</div>
				</div>
        `
    }).join(""));
};

generateShop();

//increasing the Item (Increment Function)
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
    
    localStorage.setItem("data", JSON.stringify(basket)); //Saving data in a local storage
};

// making the number in the item count work.
let update = (id) => {
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item
    Calculation();
};

// Caculation function to calculate the amount of item selected

let Calculation =()=>{
let cartIcon = document.getElementById("cartAmount"); // Target Id = "cartAmount" in Html
cartIcon.innerHTML =  basket.map((x)=>x.item).reduce((x, y) => x + y ,0);
   
};

Calculation ();