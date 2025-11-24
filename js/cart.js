let cart = JSON.parse(localStorage.getItem('bite_cart')) || []
function renderCart() {
    let list = document.getElementById('cart-list')
    list.innerHTML = ''
    if (cart.length === 0) {
        list.innerHTML = '<p style="color:hsl(43,3%,50%);">Your cart is empty.</p>'
    } else {
        cart.forEach(function(item, idx) {

            let row = document.createElement("div");
            row.style.display = "grid";
            row.style.gridTemplateColumns = "1fr auto 110px";
            row.style.alignItems = "center";
            row.style.columnGap = "20px";
            row.style.background = "rgba(255,255,255,0.9)";
            row.style.padding = "16px";
            row.style.borderRadius = "12px";
            row.style.border = "1px solid rgba(0,0,0,0.05)";
            row.style.marginBottom = "12px";

            let left = document.createElement("div");
            left.innerHTML = `
                <div style="font-weight:700;">${item.name}</div>
                <div style="color:black;">₹${item.price} each</div>
            `;

            let mid = document.createElement("div");
            mid.style.display = "flex";
            mid.style.alignItems = "center";
            mid.style.gap = "10px";

            let dec = document.createElement("button");
            dec.innerText = "-";
            dec.style.fontSize = "20px";
            dec.style.display = "flex";
            dec.style.justifyContent = "center";
            dec.style.alignItems = "center";
            dec.style.color = "white";
            dec.style.backgroundColor = "hsl(30,100%,50%)";
            dec.style.width = "34px";
            dec.style.height = "34px";
            dec.style.borderRadius = "8px";
            dec.style.border = "0";
            dec.style.cursor = "pointer";

            dec.addEventListener("click", function () {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart.splice(idx, 1);
                }
                localStorage.setItem("bite_cart", JSON.stringify(cart));
                renderCart();
            });

            let qty = document.createElement("div");
            qty.innerText = item.quantity;
            qty.style.minWidth = "28px";
            qty.style.textAlign = "center";
            qty.style.fontWeight = "600";

            let inc = document.createElement("button");
            inc.innerText = "+";
            inc.style.fontSize = "20px";
            inc.style.display = "flex";
            inc.style.justifyContent = "center";
            inc.style.alignItems = "center";
            inc.style.color = "white";
            inc.style.backgroundColor = "hsl(30,100%,50%)";
            inc.style.width = "34px";
            inc.style.height = "34px";
            inc.style.borderRadius = "8px";
            inc.style.border = "0";
            inc.style.cursor = "pointer";

            inc.addEventListener("click", function () {
                item.quantity += 1;
                localStorage.setItem("bite_cart", JSON.stringify(cart));
                renderCart();
            });

            mid.appendChild(dec);
            mid.appendChild(qty);
            mid.appendChild(inc);

            let right = document.createElement("div");
            right.style.display = "flex";
            right.style.flexDirection = "column";
            right.style.alignItems = "flex-end";
            right.style.gap = "6px";

            right.innerHTML = `
                <div style="font-weight:700;">₹${item.price * item.quantity}</div>
                <button class="remove-btn" style="
                    background:#fff;
                    border:1px solid rgba(0,0,0,0.15);
                    padding:6px 12px;
                    border-radius:8px;
                    cursor:pointer;
                ">Remove</button>
            `;

            right.querySelector(".remove-btn").addEventListener("click", function () {
                cart.splice(idx, 1);
                localStorage.setItem("bite_cart", JSON.stringify(cart));
                renderCart();
            });


            /* APPEND ALL TO ROW */
            row.appendChild(left);
            row.appendChild(mid);
            row.appendChild(right);

            list.appendChild(row);
        });

    }
    let totalItems = cart.reduce(function(a, b) {
        return a + b.quantity
    }, 0)
    let totalPrice = cart.reduce(function(a, b) {
        return a + b.quantity * b.price
    }, 0)
    document.getElementById('total-items').innerText = totalItems
    document.getElementById('total-price').innerText = totalPrice
    let cartBtn = document.querySelector('.addtocart')
    if (cartBtn) {
        let badge = cartBtn.querySelector('.cart-badge')
        if (!badge) {
            badge = document.createElement('span')
            badge.className = 'cart-badge'
            cartBtn.appendChild(badge)
        }
        badge.textContent = totalItems
        badge.style.display = totalItems === 0 ? 'none' : 'inline-block'
        cartBtn.addEventListener('click', function() {
            window.location.href = 'cart.html'
        })
    }
}
document.getElementById('clear-cart-btn').addEventListener('click', function() {
    cart = []
    localStorage.removeItem('bite_cart')
    renderCart()
})
document.getElementById('place-order-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty')
        return
    }
    localStorage.removeItem('bite_cart')
    cart = []
    renderCart()
    alert('Order placed successfully!')
    window.location.href = 'index.html'
})
renderCart()