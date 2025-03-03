import { renderOrders } from "../scripts/orderSection.js";

const orderData = JSON.parse(localStorage.getItem("orders")) || []; 

export function saveOrder(cartItems,price) {
  if (cartItems.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const newOrder = {
    id: crypto.randomUUID(), // Generate a unique order ID
    orderTime: new Date().toISOString(),
    totalCostCents: price,
    products: cartItems
  };

  orderData.push(newOrder); // Add new order to existing orders
  localStorage.setItem("orders", JSON.stringify(orderData)); // Save updated order list
  localStorage.removeItem("cart"); // Clear cart after placing order
//   alert("Order placed successfully!");
  window.location.href = "orders.html";
  renderOrders();
  
}


console.log("orderData",orderData);