export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart=[
    {
        productId: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
        quantity:2,
        deleveryOptionId:'1'
      },
      {
        productId: "e4f64a65-1377-42bc-89a5-e572d19252e2",
        quantity:1,
        deleveryOptionId:'3'
      },
      {
        productId: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
        quantity:1,
        deleveryOptionId:'2'
      }
  
  ];
}
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}



export function addToCard(productId){
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deleveryOptionId:'3'
    });
  }

  saveToStorage();
}

export function removeCard(productId){
  const newCard=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCard.push(cartItem);
    }
  })

  cart=newCard;

  saveToStorage();
}



export function updateDeleveryOption(productId,deleveryOptionId){
 
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  matchingItem.deleveryOptionId=deleveryOptionId;

  saveToStorage();
}


