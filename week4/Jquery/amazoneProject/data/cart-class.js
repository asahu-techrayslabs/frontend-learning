
class Cart{
      cartItem;
      #localstorageKey;

      constructor(localstorageKey){
        this.#localstorageKey=localstorageKey;
        this.#loadFromStorage();
      }
          
      #loadFromStorage(){
        this.cartItems=JSON.parse(localStorage.getItem(this.#localstorageKey));
      
      if(!this.cartItems){
        this.cartItems=[
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
    };

    saveToStorage(){
      localStorage.setItem(this.#localstorageKey,JSON.stringify(this.cartItems));

    };

    addToCard(productId){
      let matchingItem;

      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deleveryOptionId:'3'
        });
      }

      this.saveToStorage();
    }

    removeCard(productId){
      const newCard=[];
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId!==productId){
          newCard.push(cartItem);
        }
      })

      this.cartItems=newCard;

      this.saveToStorage();
    }

    updateDeleveryOption(productId,deleveryOptionId){
    
      let matchingItem;

      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      matchingItem.deleveryOptionId=deleveryOptionId;

      this.saveToStorage();

    }



}



const cart=new Cart('cart-oop');

const bussnessCart=new Cart('bussness');




cart.addToCard('3ebe75dc-64d2-4137-8860-1f5a963e534b')

cart.addToCard('8c9c52b5-5a19-4bcb-a5d1-158a74287c53')


bussnessCart.addToCard('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');

bussnessCart.addToCard('3ebe75dc-64d2-4137-8860-1f5a963e534b')

console.log(bussnessCart)

console.log(cart);
