// ========== EMAILJS CONFIGURATION - YOUR CREDENTIALS ==========
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'aAe9APc_4plCQYyu0',
    SERVICE_ID: 'service_rio5w5j',
    ORDER_TEMPLATE_ID: 'template_pwxa9gd',
    RETURN_TEMPLATE_ID: 'template_fwl1p8i'
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

// ========== EMAIL FUNCTIONS ==========
async function sendOrderEmail(orderDetails) {
    try {
        let orderItemsHtml = '';
        orderDetails.cart.forEach(item => {
            orderItemsHtml += `
                <tr>
                    <td>${item.name}</td>
                    <td align="center">${item.quantity}</td>
                    <td align="right">€${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
        });

        const templateParams = {
            customer_name: `${orderDetails.firstName} ${orderDetails.lastName}`,
            order_code: orderDetails.confirmationCode,
            order_items: orderItemsHtml,
            subtotal: `€${orderDetails.subtotal.toFixed(2)}`,
            shipping: `€${orderDetails.shipping.toFixed(2)}`,
            total: `€${orderDetails.total.toFixed(2)}`,
            shipping_address: `${orderDetails.address}, ${orderDetails.city}, ${orderDetails.postalCode}, ${orderDetails.country}`,
            payment_method: orderDetails.paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal',
            order_date: new Date().toLocaleString()
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.ORDER_TEMPLATE_ID,
            templateParams
        );
        
        console.log('✅ Order confirmation email sent!', response);
        return true;
    } catch (error) {
        console.error('❌ Failed to send order email:', error);
        return false;
    }
}

async function sendReturnEmail(returnDetails) {
    try {
        let returnItemsHtml = '';
        returnDetails.items.forEach(item => {
            returnItemsHtml += `
                <tr>
                    <td>${item.name}</td>
                    <td align="center">${item.quantity}</td>
                    <td align="right">€${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
        });

        const templateParams = {
            customer_name: returnDetails.customerName || 'Customer',
            return_code: returnDetails.code,
            return_items: returnItemsHtml,
            refund_amount: `€${returnDetails.total.toFixed(2)}`,
            return_date: new Date().toLocaleString()
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.RETURN_TEMPLATE_ID,
            templateParams
        );
        
        console.log('✅ Return confirmation email sent!', response);
        return true;
    } catch (error) {
        console.error('❌ Failed to send return email:', error);
        return false;
    }
}

// ========== STOCK MANAGEMENT - RESETS EVERY REFRESH ==========
let productStock = {};

function initStock() {
    const products = document.querySelectorAll('.product-card[data-product-id]');
    products.forEach(product => {
        const productId = product.getAttribute('data-product-id');
        productStock[productId] = 3;
    });
    updateAllStockDisplay();
}

function updateAllStockDisplay() {
    const products = document.querySelectorAll('.product-card[data-product-id]');
    products.forEach(product => {
        const productId = product.getAttribute('data-product-id');
        const stockSpan = product.querySelector('.stock-count');
        const cartBtn = product.querySelector('.cart-btn');
        
        if (stockSpan && productStock[productId] !== undefined) {
            const stock = productStock[productId];
            stockSpan.textContent = stock;
            
            if (stock <= 0) {
                stockSpan.parentElement.classList.add('out-of-stock');
                if (cartBtn) {
                    cartBtn.disabled = true;
                    cartBtn.innerHTML = '<i class="fas fa-times-circle"></i> Sold Out';
                }
            } else {
                stockSpan.parentElement.classList.remove('out-of-stock');
                if (cartBtn && cartBtn.disabled) {
                    cartBtn.disabled = false;
                    cartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                }
            }
        }
    });
}

function decreaseStock(productId) {
    if (productStock[productId] > 0) {
        productStock[productId]--;
        updateAllStockDisplay();
        return true;
    }
    return false;
}

function increaseStock(productId) {
    if (productStock[productId] < 3) {
        productStock[productId]++;
        updateAllStockDisplay();
        return true;
    }
    return false;
}

// ========== CART FUNCTIONALITY ==========
let cart = [];
let orderConfirmationCodes = [];

function loadCart() {
    cart = [];
    const savedCodes = localStorage.getItem('orderConfirmationCodes');
    if (savedCodes) {
        try {
            orderConfirmationCodes = JSON.parse(savedCodes);
        } catch(e) {
            orderConfirmationCodes = [];
        }
    }
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function generateConfirmationCode() {
    const prefix = 'SNOW';
    const random1 = Math.floor(Math.random() * 9000 + 1000);
    const random2 = Math.floor(Math.random() * 9000 + 1000);
    return `${prefix}-${random1}-${random2}`;
}

function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        cartTotalElement.textContent = `€${total.toFixed(2)}`;
    }
    return total;
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<tr><td colspan="5" class="empty-cart-message"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p></td></tr>`;
    } else {
        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><div class="product-info"><img src="${item.image}" alt="${item.name}"><span class="product-name">${item.name}</span></div></td>
                <td>€${item.price.toFixed(2)}</td>
                <td><div class="quantity-controls"><button class="quantity-btn minus" data-index="${index}">-</button><input type="text" class="quantity-input" value="${item.quantity}" readonly><button class="quantity-btn plus" data-index="${index}">+</button></div></td>
                <td>€${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });
    }
    
    if (cartCount) {
        cartCount.textContent = getTotalItems();
    }
    
    updateCartTotal();
    saveCart();
    
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.removeEventListener('click', btn.clickHandler);
        btn.clickHandler = function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                updateCartDisplay();
            }
        };
        btn.addEventListener('click', btn.clickHandler);
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.removeEventListener('click', btn.clickHandler);
        btn.clickHandler = function() {
            const index = parseInt(this.getAttribute('data-index'));
            const productId = cart[index].productId;
            if (productStock[productId] > 0) {
                cart[index].quantity++;
                decreaseStock(productId);
                updateCartDisplay();
            } else {
                showToast('Out of stock!');
            }
        };
        btn.addEventListener('click', btn.clickHandler);
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.removeEventListener('click', btn.clickHandler);
        btn.clickHandler = function() {
            const index = parseInt(this.getAttribute('data-index'));
            const productId = cart[index].productId;
            for (let i = 0; i < cart[index].quantity; i++) {
                increaseStock(productId);
            }
            cart.splice(index, 1);
            updateCartDisplay();
        };
        btn.addEventListener('click', btn.clickHandler);
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ========== CUSTOM MODAL FOR CONFIRMATION ==========
function showConfirmationModal(orderDetails) {
    const existingModal = document.querySelector('.confirmation-modal');
    if (existingModal) existingModal.remove();
    
    let orderItemsHtml = '';
    orderDetails.cart.forEach(item => {
        orderItemsHtml += `
            <div class="modal-order-item">
                <span class="modal-item-name">${item.name}</span>
                <span class="modal-item-qty">x${item.quantity}</span>
                <span class="modal-item-price">€${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    const modalHtml = `
        <div class="confirmation-modal">
            <div class="modal-overlay"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <div class="modal-success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>PAYMENT SUCCESSFUL!</h2>
                    <button class="modal-close" onclick="closeConfirmationModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-section">
                        <h3><i class="fas fa-box"></i> ORDER SUMMARY</h3>
                        <div class="modal-order-items">
                            ${orderItemsHtml}
                        </div>
                        <div class="modal-totals">
                            <div class="modal-total-row">
                                <span>Subtotal:</span>
                                <span>€${orderDetails.subtotal.toFixed(2)}</span>
                            </div>
                            <div class="modal-total-row">
                                <span>Shipping:</span>
                                <span>€${orderDetails.shipping.toFixed(2)}</span>
                            </div>
                            <div class="modal-total-row grand">
                                <span>TOTAL:</span>
                                <span>€${orderDetails.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3><i class="fas fa-truck"></i> SHIPPING ADDRESS</h3>
                        <div class="modal-address">
                            <p>${orderDetails.firstName} ${orderDetails.lastName}</p>
                            <p>${orderDetails.address}</p>
                            <p>${orderDetails.city}, ${orderDetails.postalCode}</p>
                            <p>${orderDetails.country}</p>
                            <p><i class="fas fa-envelope"></i> ${orderDetails.email}</p>
                            <p><i class="fas fa-phone"></i> ${orderDetails.phone}</p>
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3><i class="fas fa-credit-card"></i> PAYMENT METHOD</h3>
                        <p class="modal-payment">${orderDetails.paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}</p>
                    </div>
                    
                    <div class="modal-section confirmation-code">
                        <h3><i class="fas fa-key"></i> CONFIRMATION CODE</h3>
                        <div class="modal-code">${orderDetails.confirmationCode}</div>
                        <p class="modal-warning">
                            <i class="fas fa-exclamation-triangle"></i> 
                            IMPORTANT: Save this code! You will need it to return your products.
                        </p>
                        <p class="modal-warning" style="background: #d4edda; color: #155724; margin-top: 10px;">
                            <i class="fas fa-envelope"></i> 
                            ✅ A confirmation email has been sent to 216855@aedjv.pt
                        </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn" onclick="closeConfirmationModal()">
                        <i class="fas fa-check"></i> OK
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';
}

function closeConfirmationModal() {
    const modal = document.querySelector('.confirmation-modal');
    if (modal) modal.remove();
    document.body.style.overflow = '';
}

// ========== SECTION MANAGEMENT ==========
const productsSection = document.getElementById('products-section');
const cartSection = document.getElementById('cart');
const paymentSection = document.getElementById('payment');
const returnSection = document.getElementById('return-section');
const coverSection = document.querySelector('.cover');
const footer = document.querySelector('footer');

function hideAllSections() {
    if (coverSection) coverSection.style.display = 'none';
    if (productsSection) productsSection.style.display = 'none';
    if (cartSection) cartSection.style.display = 'none';
    if (paymentSection) paymentSection.style.display = 'none';
    if (returnSection) returnSection.style.display = 'none';
    if (footer) footer.style.display = 'none';
}

function showHomePage() {
    hideAllSections();
    if (coverSection) coverSection.style.display = 'block';
    if (footer) footer.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showProductsSection() {
    hideAllSections();
    if (productsSection) productsSection.style.display = 'block';
    if (footer) footer.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCartSection() {
    hideAllSections();
    if (cartSection) cartSection.style.display = 'block';
    if (footer) footer.style.display = 'block';
    updateCartDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPaymentSection() {
    hideAllSections();
    if (paymentSection) paymentSection.style.display = 'block';
    if (footer) footer.style.display = 'block';
    updatePaymentSummary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showReturnSection() {
    hideAllSections();
    if (returnSection) returnSection.style.display = 'block';
    if (footer) footer.style.display = 'block';
    const returnResult = document.getElementById('return-result');
    if (returnResult) returnResult.innerHTML = '';
    const returnInput = document.getElementById('returnCode');
    if (returnInput) returnInput.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updatePaymentSummary() {
    const orderItems = document.getElementById('order-items');
    const paymentSubtotal = document.getElementById('payment-subtotal');
    const paymentTotal = document.getElementById('payment-total');
    
    if (!orderItems) return;
    
    orderItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item-payment';
        itemElement.innerHTML = `<div><strong>${item.name}</strong><br>Qty: ${item.quantity}</div><div>€${(item.price * item.quantity).toFixed(2)}</div>`;
        orderItems.appendChild(itemElement);
    });
    
    const shipping = 5.99;
    const total = subtotal + shipping;
    
    if (paymentSubtotal) paymentSubtotal.textContent = `€${subtotal.toFixed(2)}`;
    if (paymentTotal) paymentTotal.textContent = `€${total.toFixed(2)}`;
}

// ========== PROCESS RETURN ==========
async function processReturn(confirmationCode) {
    const orderIndex = orderConfirmationCodes.findIndex(order => order.code === confirmationCode);
    
    if (orderIndex === -1) {
        return { success: false, message: '❌ Invalid confirmation code. Please check and try again.' };
    }
    
    const order = orderConfirmationCodes[orderIndex];
    
    if (order.returned) {
        return { success: false, message: '⚠️ This order has already been returned.' };
    }
    
    // Process return - add stock back
    order.items.forEach(item => {
        if (productStock[item.productId] !== undefined) {
            productStock[item.productId] += item.quantity;
        }
    });
    
    order.returned = true;
    order.returnDate = new Date().toISOString();
    
    localStorage.setItem('orderConfirmationCodes', JSON.stringify(orderConfirmationCodes));
    updateAllStockDisplay();
    
    // Send return confirmation email
    const returnDetails = {
        code: order.code,
        items: order.items,
        total: order.total,
        customerName: order.shippingAddress ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}` : 'Customer'
    };
    
    await sendReturnEmail(returnDetails);
    
    return { 
        success: true, 
        message: `✅ RETURN SUCCESSFUL!\n\n📦 Order: ${order.code}\n💰 Refund Amount: €${order.total.toFixed(2)}\n📅 Return Date: ${new Date().toLocaleDateString()}\n\nRefund will be processed within 3-5 business days.\n📧 A return confirmation email has been sent to 216855@aedjv.pt`,
        order: order
    };
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    initStock();
    loadCart();
    
    const buyBtn = document.getElementById('buyBtn');
    if (buyBtn) {
        buyBtn.addEventListener('click', function() {
            showProductsSection();
        });
    }
    
    const returnBtn = document.getElementById('returnBtn');
    if (returnBtn) {
        returnBtn.addEventListener('click', function() {
            showReturnSection();
        });
    }
    
    const submitReturnBtn = document.getElementById('submitReturnBtn');
    if (submitReturnBtn) {
        submitReturnBtn.addEventListener('click', async function() {
            const returnCode = document.getElementById('returnCode').value.trim().toUpperCase();
            const returnResult = document.getElementById('return-result');
            
            if (!returnCode) {
                returnResult.innerHTML = '<div class="return-result error">❌ Please enter your confirmation code.</div>';
                return;
            }
            
            const result = await processReturn(returnCode);
            
            if (result.success) {
                returnResult.innerHTML = `<div class="return-result success">${result.message.replace(/\n/g, '<br>')}</div>`;
            } else {
                returnResult.innerHTML = `<div class="return-result error">${result.message}</div>`;
            }
        });
    }
    
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            showHomePage();
        });
    }
    
    const cartLink = document.getElementById('cartLink');
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            showCartSection();
        });
    }
    
    const continueBtn = document.getElementById('continueShoppingBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            showProductsSection();
        });
    }
    
    const backToCartBtn = document.getElementById('backToCartBtn');
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', function() {
            showCartSection();
        });
    }
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            showPaymentSection();
        });
    }
    
    const payNowBtn = document.getElementById('payNowBtn');
    if (payNowBtn) {
        payNowBtn.addEventListener('click', async function() {
            const firstName = document.getElementById('firstName')?.value;
            const lastName = document.getElementById('lastName')?.value;
            const email = document.getElementById('email')?.value;
            const phone = document.getElementById('phone')?.value;
            const address = document.getElementById('address')?.value;
            const city = document.getElementById('city')?.value;
            const postalCode = document.getElementById('postalCode')?.value;
            const country = document.getElementById('country')?.value;
            
            if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode || !country) {
                alert('❌ Please fill in all shipping address fields!');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('❌ Please enter a valid email address!');
                return;
            }
            
            const selectedPayment = document.querySelector('input[name="payment"]:checked');
            const paymentMethod = selectedPayment ? selectedPayment.value : 'card';
            
            if (paymentMethod === 'card') {
                const cardNumber = document.getElementById('card-number')?.value;
                const expiry = document.getElementById('expiry')?.value;
                const cvv = document.getElementById('cvv')?.value;
                const cardName = document.getElementById('card-name')?.value;
                
                if (!cardNumber || !expiry || !cvv || !cardName) {
                    alert('❌ Please fill in all card details!');
                    return;
                }
            }
            
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = 5.99;
            const total = subtotal + shipping;
            const confirmationCode = generateConfirmationCode();
            
            const orderDetails = {
                code: confirmationCode,
                date: new Date().toISOString(),
                items: cart.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                subtotal: subtotal,
                shipping: shipping,
                total: total,
                paymentMethod: paymentMethod,
                shippingAddress: { firstName, lastName, email, phone, address, city, postalCode, country },
                returned: false
            };
            
            orderConfirmationCodes.push(orderDetails);
            localStorage.setItem('orderConfirmationCodes', JSON.stringify(orderConfirmationCodes));
            
            // Send order confirmation email
            const orderDetailsForEmail = {
                cart: [...cart],
                subtotal: subtotal,
                shipping: shipping,
                total: total,
                confirmationCode: confirmationCode,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                city: city,
                postalCode: postalCode,
                country: country,
                paymentMethod: paymentMethod
            };
            
            await sendOrderEmail(orderDetailsForEmail);
            
            showConfirmationModal(orderDetailsForEmail);
            
            // Clear cart after payment
            cart = [];
            updateCartDisplay();
            showHomePage();
        });
    }
    
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardForm = document.getElementById('card-form');
    const paypalInfo = document.getElementById('paypal-info');
    
    if (paymentRadios.length > 0) {
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (cardForm) cardForm.style.display = 'none';
                if (paypalInfo) paypalInfo.style.display = 'none';
                
                if (this.value === 'card' && cardForm) {
                    cardForm.style.display = 'block';
                } else if (this.value === 'paypal' && paypalInfo) {
                    paypalInfo.style.display = 'block';
                }
            });
        });
    }
    
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (button.disabled) return;
            
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-product-id');
            const productImage = productCard.querySelector('.product-image').src;
            
            if (decreaseStock(productId)) {
                const existingItem = cart.find(item => item.name === productName);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1,
                        productId: productId
                    });
                }
                updateCartDisplay();
                showToast(`✓ ${productName} added to cart!`);
            } else {
                showToast(`✗ ${productName} is out of stock!`);
            }
        });
    });
    
    const categoryItems = document.querySelectorAll('.category-list li');
    const categoryContainers = document.querySelectorAll('.category-products');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            categoryItems.forEach(cat => {
                cat.style.background = '';
                cat.querySelector('span:last-child').textContent = '+';
            });
            
            this.style.background = 'rgba(52, 152, 219, 0.1)';
            this.querySelector('span:last-child').textContent = '−';
            
            categoryContainers.forEach(container => {
                container.style.display = 'none';
            });
            
            const selectedCategory = document.getElementById(`${category}-products`);
            if (selectedCategory) {
                selectedCategory.style.display = 'grid';
            }
        });
    });
    
    const mobileCategory = document.querySelector('[data-category="mobile"]');
    if (mobileCategory) {
        setTimeout(() => mobileCategory.click(), 100);
    }
});