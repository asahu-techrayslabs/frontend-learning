import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getdileveryOptions } from "../../data/deleveryOptions.js";
import { saveOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let deliveryPriceCents = 0;
  let cartQuentity = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    cartQuentity += cartItem.quantity;
    const deliveryOption = getdileveryOptions(cartItem.deleveryOptionId);
    deliveryPriceCents += deliveryOption.priceCents;
  });

  const totalpriceInCents = productPriceCents + deliveryPriceCents;
  const tax = 0.1 * totalpriceInCents;
  const totalPriceAfterTax = tax + totalpriceInCents;

  const paymentSummeryHTML = `
        <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
          <div>Items (${cartQuentity}):</div>
          <div class="payment-summary-money">$${(productPriceCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping & handling:</div>
          <div class="payment-summary-money">$${(deliveryPriceCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${(totalpriceInCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${(tax / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${(totalPriceAfterTax / 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button js-place-order button-primary">Place your order</button>
  `;

  $(".js-payment-summary").html(paymentSummeryHTML);

  $(".js-place-order").on("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    saveOrder(cart,totalPriceAfterTax);
    localStorage.setItem("cart", JSON.stringify([]));
  });
}
