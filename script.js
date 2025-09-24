let cart = [];
let totalAmount = 0;

const bookButton = document.querySelector('.book-btn1');

const servicePrices = {
    'DryCleaning': 200.00,
    'Wash&Fold': 100.00,
    'Ironing': 30.00,
    'StrainRemoval': 500.00,
    'leather&SuedeCleaning': 999.00,
    'WeddingDresscleaning': 2800.00
};

const serviceNames = {
    'DryCleaning': 'Dry Cleaning',
    'Wash&Fold': 'Wash & Fold',
    'Ironing': 'Ironing',
    'StrainRemoval': 'Strain Removal',
    'leather&SuedeCleaning': 'Leather & Suede Cleaning',
    'WeddingDresscleaning': 'Wedding Dress Cleaning'
};

function toggleCart(serviceValue, button) {
    const serviceIndex = cart.findIndex(item => item.value === serviceValue);
    if (cart.length < 0){
        bookButton.style.opacity=0.5;
    } else {
        bookButton.style.opacity=1;
    }
    
    if (serviceIndex === -1) {
        const service = {
            name: serviceNames[serviceValue],
            value: serviceValue,
            price: servicePrices[serviceValue]
        };
        cart.push(service);
        totalAmount += service.price;
        button.textContent = 'Remove Item ⊖';
        button.style.backgroundColor = '#dc3545';
        button.style.color = 'white';
    } else {
        const removedItem = cart[serviceIndex];
        totalAmount -= removedItem.price;
        cart.splice(serviceIndex, 1);
        button.textContent = 'Add Item ⊕';
        button.style.backgroundColor = '';
        button.style.color = '';
    }
    
    updateCartDisplay();
}

const indianRupeeSymbol = '₹';

function updateCartDisplay() {
    const cartItemList = document.getElementById('cartItemList');
    const totalAmountElement = document.querySelector('.total-amount p');
    cartItemList.innerHTML = '';
    
    if (cart.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart';
        emptyMessage.textContent = 'No items added yet';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.color = '#666';
        emptyMessage.style.fontStyle = 'italic';
        emptyMessage.style.padding = '20px';
        cartItemList.appendChild(emptyMessage);
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.style.display = 'flex';
            cartItem.style.justifyContent = 'space-between';
            cartItem.style.alignItems = 'center';
            cartItem.style.padding = '8px';
            cartItem.style.borderBottom = '1px solid #eee';
            cartItem.innerHTML = `<span>${index + 1}. ${item.name}</span><span>&#8377; ${item.price.toFixed(2)}</span>`;
            cartItemList.appendChild(cartItem);
        });
    }
    totalAmountElement.textContent = `${indianRupeeSymbol} ${totalAmount.toFixed(2)}`;
}

function resetCart() {
    cart = [];
    bookButton.style.opacity = "0.5";  
    totalAmount = 0;
    const serviceButtons = document.querySelectorAll('.services-list button');
    serviceButtons.forEach(button => {
        button.textContent = 'Add Item ⊕';
        button.style.backgroundColor = '';
        button.style.color = '';
    });
    updateCartDisplay();
}

const cartbtncheck = document.querySelector("#cart-btn-check");

function bookService() {
    const fullName = document.querySelector('.name').value;
    const email = document.querySelector('.email1').value;
    const phone = document.querySelector('.ph1').value;
    
    if (cart.length === 0) {
        cartbtncheck.innerHTML="❗Add the items to the cart to Book";
        cartbtncheck.style.color = "red";
        return;
    }
    if (!fullName || !email || !phone) {
        cartbtncheck.innerHTML="❗enter Name Email Phone number";
        cartbtncheck.style.color = "red";
        return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
        cartbtncheck.innerHTML="❗ enter valid 10-digit phone number";
        cartbtncheck.style.color = "red";
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        cartbtncheck.innerHTML="❗enter a valid 10-digit phone number";
        cartbtncheck.style.color = "red";
        return;
    }
    let serviceList = '';
    cart.forEach((item, index) => {
        serviceList += `${index + 1}. ${item.name} - ₹${item.price}\n`;
    });
    const confirmation = true;
    if (confirmation) {
        resetCart();
        document.querySelector('.name').value = '';
        document.querySelector('.email1').value = '';
        document.querySelector('.ph1').value = '';
        const cartbtncheck1 = document.getElementById("cart-btn-check1");
        cartbtncheck.innerHTML= "email has been sent successfully";
        cartbtncheck.style.color = "green";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const serviceButtons = document.querySelectorAll('.services-list button');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleCart(this.value, this);
        });
    });
    const bookButton = document.querySelector('.book-btn1');
    if (bookButton) {
        bookButton.addEventListener('click', bookService);
    }
    const subscribeButton = document.querySelector('.sub-bottom-button');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function() {
            const name = document.querySelector('.sub-bottom-input').value;
            const email = document.querySelector('.sub-bottom-input-email').value;
            if (name && email) {
                alert(`Thank you ${name}! You have successfully subscribed.`);
                document.querySelector('.sub-bottom-input').value = '';
                document.querySelector('.sub-bottom-input-email').value = '';
            } else {
                alert('Please enter both name and email to subscribe.');
            }
        });
    }
    updateCartDisplay();
});

function drycleaning() {
    const button = document.querySelector('#btn1');
    toggleCart('DryCleaning', button);
}
