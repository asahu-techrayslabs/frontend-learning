import { getProduct } from './../data/products.js';
import { getdileveryOptions } from '../data/deleveryOptions.js';

export function renderOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const $ordersGrid = $(".js-orders-grid");

    

  if ($ordersGrid.length === 0) {
    console.error("Error: .js-orders-grid not found in the DOM.");
    return;
  }

  if (orders.length === 0) {
    $ordersGrid.html(`<p>No orders found.</p>`);
    return;
  }

  let orderSection = "";

  $.each(orders, function (_, order) {
    orderSection += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${new Date(order.orderTime).toLocaleDateString()}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${(order.totalCostCents / 100).toFixed(2) || "N/A"}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">`;

    $.each(order.products, function (_, cartItem) {
      console.log("order.products", order.products);

      const matchingProduct = getProduct(cartItem.productId);
      const deliveryoptionId=getdileveryOptions(cartItem.deleveryOptionId);

      const todays =  dayjs();

        const deliveryDate = todays.add(deliveryoptionId.deliveryDays, "days");
        const dateString = deliveryDate.format("dddd, MMM D");


      



      orderSection += `
        <div class="product-container">
          <div class="product-image-container">
            <img src="${matchingProduct.image || 'images/default-product.png'}" alt="${cartItem.name || 'Product'}">
          </div>

          <div class="product-details">
            <div class="product-name">${matchingProduct.name || 'Unknown Product'}</div>
            <div class="product-delivery-date">Arriving on: ${dateString || 'N/A'}</div>
            <div class="product-quantity">Quantity: ${cartItem.quantity}</div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">Track package</button>
            </a>
          </div>
        </div>`;
    });

    orderSection += `</div></div>`; // Closing the order container
  });

  $ordersGrid.html(orderSection);
}

$(document).ready(renderOrders);
