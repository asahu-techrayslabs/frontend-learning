import { cart, removeCard, updateDeleveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { deleveryOptions, getdileveryOptions } from "../../data/deleveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
    let cartSummary = "";
    
    if (cart.length === 0) {
        cartSummary = `
            <div class="empty-cart-message">
                <img class="amazon-logo" src="images/amazon-logo.png" />
                <h2>Your Amazon Cart is empty</h2>
                <p>Shop today’s deals</p>
                <a href="amazon.html" class="shop-button">Continue Shopping</a>
            </div>
        `;
        
        document.querySelector(".main").innerHTML = cartSummary;
        return;
    }
    
    cart.forEach((cartItem) => {
        const matchingProduct = getProduct(cartItem.productId);
        const deleveryOption = getdileveryOptions(cartItem.deleveryOptionId);

        const todays =  dayjs();

        const deliveryDate = todays.add(deleveryOption.deliveryDays, "days");
        const dateString = deliveryDate.format("dddd, MMM D");

        cartSummary += `
            <div class="cart-item-container 
            js-cart-item-container
            js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">Delivery date: ${dateString}</div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">
                    <div class="cart-item-details">
                        <div class="product-name">${matchingProduct.name}</div>
                        <div class="product-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
                        <div class="product-quantity  js-product-quantity-${matchingProduct.id}">
                            
                            <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
                            <span class="update-quantity-link link-primary">Update</span>
                            <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${matchingProduct.id}">Delete</span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">Choose a delivery option:</div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        return deleveryOptions.map((deleveryOption) => {
            const todays = dayjs();
            const deliveryDate = todays.add(deleveryOption.deliveryDays, "days");
            const dateString = deliveryDate.format("dddd, MMM D");
            const priceString = deleveryOption.priceCents === 0 ? "FREE" : `$${deleveryOption.priceCents / 100} -`;
            const isChecked = deleveryOption.id === cartItem.deleveryOptionId;

            return `
                <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deleveryOption.id}">
                    <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}" ${isChecked ? "checked" : ""}>
                    <div>
                        <div class="delivery-option-date">${dateString}</div>
                        <div class="delivery-option-price">${priceString} Shipping</div>
                    </div>
                </div>
            `;
        }).join("");
    }
      
    $('.js-order-summary').html(cartSummary);
    

    $(".js-delete-link").on("click", function () {
        const productId = $(this).data("product-id");
        removeCard(productId);
        $(`.js-cart-item-container-${productId}`).remove();
    
        if (cart.length === 0) {
            renderOrderSummary();
        } else {
            renderPaymentSummary();
        }
    });


    document.querySelectorAll(".js-delivery-option").forEach((element) => {
        element.addEventListener("click", () => {
            const productId = element.dataset.productId;
            const deliveryOptionId = element.dataset.deliveryOptionId;
            updateDeleveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

  

}
