let cart = JSON.parse(localStorage.getItem('bite_cart')) || []

function saveCart() {
    localStorage.setItem('bite_cart', JSON.stringify(cart))
    updateCartBadge()
}

function updateCartBadge() {
    let cartBtn = document.querySelector('.addtocart')
    if (!cartBtn) {
        return
    }
    let badge = cartBtn.querySelector('.cart-badge')
    let total = cart.reduce(function(a, b) {
        return a + b.quantity
    }, 0)
    if (!badge) {
        badge = document.createElement('span')
        badge.className = 'cart-badge'
        cartBtn.appendChild(badge)
    }
    badge.textContent = total
    if (total === 0) {
        badge.style.display = 'none'
    } else {
        badge.style.display = 'inline-block'
    }
}

function addToCartByInfo(name, price) {
    let existing = cart.find(function(i) {
        return i.name === name
    })
    if (existing) {
        existing.quantity += 1
    } else {
        cart.push({ name: name, price: price, quantity: 1 })
    }
    saveCart()
}

function parsePrice(text) {
    let digits = text.replace(/[^0-9]/g, '')
    return Number(digits) || 0
}

function attachAddToCartButtons() {
    let buttons = document.querySelectorAll('.add-to-cart')
    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            let parent = btn.closest('.food-item')
            if (!parent) {
                return
            }
            let nameEl = parent.querySelector('h4')
            let priceEl = parent.querySelector('p')
            let name = nameEl ? nameEl.innerText.trim() : 'Item'
            let price = priceEl ? parsePrice(priceEl.innerText) : 0
            addToCartByInfo(name, price)
            btn.innerText = 'Added'
            setTimeout(function() {
                btn.innerText = 'Add to Cart'
            }, 900)
        })
    })
}

function attachHeaderCartClick() {
    let cartBtn = document.querySelector('.addtocart')
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            window.location.href = 'cart.html'
        })
    }
}

document.addEventListener('DOMContentLoaded', function() { // run this line when html page is ready
    attachAddToCartButtons() // attach this to all add-to-cart
    attachHeaderCartClick() // attach this to cart icon
    updateCartBadge()
})

window.addEventListener("load", () => {
    let container = document.getElementById("dynamic-reviews");
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    container.innerHTML = "";

    reviews.forEach(r => {
        let starsHTML = "";
        for (let i = 0; i < 5; i++) {
            starsHTML += `<span class="fa fa-star ${i < r.rating ? "checked" : ""}"></span>`;
        }

        let div = document.createElement("div");
        div.classList.add("slide");
        div.innerHTML = `
            <h4>${r.name}</h4>
            <p>${r.review}</p>
            <div class="stars">${starsHTML}</div>
        `;
        container.appendChild(div);
    });
});

