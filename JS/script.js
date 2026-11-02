const PANACHE_PRODUCTS={
 'Panache Tracksuit':1950,'Panache T-Shirt':450,'Panache Tank Top':250
};
function getCart(){try{return JSON.parse(localStorage.getItem('panacheCart')||'[]')}catch(e){return []}}
function saveCart(cart){localStorage.setItem('panacheCart',JSON.stringify(cart))}
function addToCart(name,price,colour,size,image){const cart=getCart();const key=[name,colour,size].join('|');const found=cart.find(x=>x.key===key);if(found)found.quantity+=1;else cart.push({key,name,price:Number(price),colour,size,image,quantity:1});saveCart(cart);alert(name+' added to your cart.');}
function changeQuantity(key,delta){const cart=getCart();const item=cart.find(x=>x.key===key);if(!item)return;item.quantity+=delta;saveCart(cart.filter(x=>x.quantity>0));renderCart()}
function removeItem(key){saveCart(getCart().filter(x=>x.key!==key));renderCart()}
function money(n){return 'R'+Number(n).toLocaleString('en-ZA',{maximumFractionDigits:2})}
function renderCart(){const host=document.getElementById('cartItems');if(!host)return;const cart=getCart();host.innerHTML='';const empty=document.getElementById('emptyCart');const summary=document.getElementById('cartSummary');empty.classList.toggle('hidden',cart.length>0);summary.classList.toggle('hidden',cart.length===0);let subtotal=0;cart.forEach(item=>{subtotal+=item.price*item.quantity;const row=document.createElement('article');row.className='cart-item';const product=document.createElement('div');product.className='cart-product';const img=document.createElement('img');img.src=item.image;img.alt=item.name+' in '+item.colour;const details=document.createElement('div');const title=document.createElement('h3');title.textContent=item.name;const colour=document.createElement('p');colour.textContent='Colour: '+item.colour;const size=document.createElement('p');size.textContent='Size: '+item.size;const price=document.createElement('p');price.textContent='Price: '+money(item.price);details.append(title,colour,size,price);product.append(img,details);const quantity=document.createElement('div');quantity.className='quantity';const minus=document.createElement('button');minus.type='button';minus.textContent='−';minus.setAttribute('aria-label','Decrease quantity');minus.onclick=()=>changeQuantity(item.key,-1);const count=document.createElement('span');count.textContent=item.quantity;const plus=document.createElement('button');plus.type='button';plus.textContent='+';plus.setAttribute('aria-label','Increase quantity');plus.onclick=()=>changeQuantity(item.key,1);quantity.append(minus,count,plus);const total=document.createElement('div');total.className='item-total';total.textContent=money(item.price*item.quantity);const remove=document.createElement('button');remove.className='remove-btn';remove.type='button';remove.textContent='Remove';remove.onclick=()=>removeItem(item.key);row.append(product,quantity,total,remove);host.append(row)});const subtotalEl=document.getElementById('cartSubtotal');if(subtotalEl)subtotalEl.textContent=money(subtotal);const checkoutTotal=document.getElementById('checkoutTotal');if(checkoutTotal)checkoutTotal.textContent=money(subtotal)}
function setTracksuitImage(){const select=document.getElementById('tracksuitColour'),img=document.getElementById('tracksuitImage');if(select&&img){img.src='images/'+select.value;img.alt='Panache '+select.options[select.selectedIndex].text+' Tracksuit'}}
function addSelectedProduct(type){const config={tracksuit:{name:'Panache Tracksuit',price:1950,colour:'tracksuitColour',size:'tracksuitSize',image:()=>document.getElementById('tracksuitImage').getAttribute('src')},tshirt:{name:'Panache T-Shirt',price:450,colour:'tshirtColour',size:'tshirtSize',image:()=> 'images/Tshirt black and whte.jpeg'},tank:{name:'Panache Tank Top',price:250,colour:'tankColour',size:'tankSize',image:()=> 'images/Tank tops black and white.jpeg'}}[type];if(!config)return;const colour=document.getElementById(config.colour).value;const size=document.getElementById(config.size).value;addToCart(config.name,config.price,colour,size,config.image())}
document.addEventListener('DOMContentLoaded',()=>{renderCart();setTracksuitImage();document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;if(form.id==='registerForm'){const p=form.querySelector('[name="password"]'),c=form.querySelector('[name="confirmPassword"]');if(p&&c&&p.value!==c.value){c.setCustomValidity('Passwords do not match.');c.reportValidity();c.setCustomValidity('');return}}if(form.id==='checkoutForm'){if(!getCart().length){alert('Your cart is empty. Add products before checkout.');return}alert('Your order details passed validation. This student demo does not process payments or submit orders to a server.');return}if(form.id==='contactForm'){alert('Your message passed validation. This demo does not send messages to a server.');form.reset();return}if(form.id==='loginForm'){alert('This demo has no account server, so login cannot be authenticated.');return}if(form.id==='registerForm'){alert('Your details passed validation. This demo does not securely create an account on a server.');return}alert('Form details passed validation.');}));});
/* =====================================
   PANACHE INTERACTIVE FEATURES
   ===================================== */

/* 1. IMAGE LIGHTBOX */

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(
        ".product-card img, .gallery img"
    );

    images.forEach(function (image) {
        image.style.cursor = "zoom-in";

        image.addEventListener("click", function () {
            const overlay = document.createElement("div");

            overlay.className = "lightbox-overlay";
            overlay.setAttribute("role", "dialog");
            overlay.setAttribute("aria-modal", "true");
            overlay.setAttribute("aria-label", "Enlarged product image");

            const enlargedImage = document.createElement("img");
            enlargedImage.src = image.src;
            enlargedImage.alt = image.alt || "Panache product";

            const closeButton = document.createElement("button");
            closeButton.type = "button";
            closeButton.className = "lightbox-close";
            closeButton.textContent = "×";
            closeButton.setAttribute("aria-label", "Close image");

            overlay.append(enlargedImage, closeButton);
            document.body.appendChild(overlay);

            function closeLightbox() {
                overlay.remove();
                document.removeEventListener("keydown", handleKey);
                image.focus();
            }

            function handleKey(event) {
                if (event.key === "Escape") {
                    closeLightbox();
                }
            }

            closeButton.addEventListener("click", closeLightbox);

            overlay.addEventListener("click", function (event) {
                if (event.target === overlay) {
                    closeLightbox();
                }
            });

            document.addEventListener("keydown", handleKey);
            closeButton.focus();
        });
    });
});


/* 2. FAQ ACCORDION */

document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(function (question) {
        question.setAttribute("aria-expanded", "false");

        question.addEventListener("click", function () {
            const answer = question.nextElementSibling;

            if (!answer) {
                return;
            }

            const isOpen =
                question.getAttribute("aria-expanded") === "true";

            question.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            answer.hidden = isOpen;
        });
    });
});


/* 3. PRODUCT CATEGORY TABS */

document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll("[data-product-tab]");
    const panels = document.querySelectorAll("[data-product-panel]");

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            const category = tab.dataset.productTab;

            tabs.forEach(function (otherTab) {
                otherTab.setAttribute(
                    "aria-selected",
                    String(otherTab === tab)
                );
            });

            panels.forEach(function (panel) {
                panel.hidden =
                    panel.dataset.productPanel !== category;
            });
        });
    });
});
/* PANACHE: DYNAMIC SHOP SEARCH, FILTER AND SORT */

document.addEventListener("DOMContentLoaded", function () {
    const search = document.getElementById("productSearch");
    const category = document.getElementById("categoryFilter");
    const sort = document.getElementById("priceSort");

    const grid = document.querySelector(".products");

    if (!grid || !search || !category || !sort) {
        return;
    }

    const noProducts = document.getElementById("noProducts");

    // Add a message if no products match.
    let message = noProducts;

    if (!message) {
        message = document.createElement("p");
        message.id = "noProducts";
        message.textContent = "No products found.";
        message.hidden = true;
        grid.insertAdjacentElement("afterend", message);
    }

    // Save the original order of the product cards.
    const cards = Array.from(
        grid.querySelectorAll(".product-card")
    );

    cards.forEach(function (card, index) {
        card.dataset.originalOrder = index;

        // Assign a category based on the product name.
        const name = (
            card.querySelector("h2, h3")?.textContent || ""
        ).toLowerCase();

        if (name.includes("tracksuit")) {
            card.dataset.category = "tracksuit";
        } else if (name.includes("t-shirt") ||
                   name.includes("tshirt")) {
            card.dataset.category = "tshirt";
        } else if (name.includes("tank")) {
            card.dataset.category = "tank";
        } else {
            card.dataset.category =
                card.dataset.category || "other";
        }

        // Read the price displayed in the card.
        const priceText =
            card.querySelector(".price")?.textContent || "";

        const price = Number(
            priceText.replace(/[^\d.]/g, "")
        );

        card.dataset.price = Number.isFinite(price) ? price : 0;
    });

    function updateProducts() {
        const query = search.value.trim().toLowerCase();
        const selectedCategory = category.value;
        const selectedSort = sort.value;

        let visibleCards = cards.filter(function (card) {
            const text = card.textContent.toLowerCase();

            const matchesSearch = text.includes(query);

            const matchesCategory =
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory;

            card.hidden = !(matchesSearch && matchesCategory);

            return !card.hidden;
        });

        visibleCards.sort(function (a, b) {
            if (selectedSort === "low-high") {
                return Number(a.dataset.price) -
                       Number(b.dataset.price);
            }

            if (selectedSort === "high-low") {
                return Number(b.dataset.price) -
                       Number(a.dataset.price);
            }

            if (selectedSort === "name") {
                const nameA =
                    a.querySelector("h2, h3")?.textContent || "";

                const nameB =
                    b.querySelector("h2, h3")?.textContent || "";

                return nameA.localeCompare(nameB);
            }

            return Number(a.dataset.originalOrder) -
                   Number(b.dataset.originalOrder);
        });

        // Reorder visible products dynamically.
        visibleCards.forEach(function (card) {
            grid.appendChild(card);
        });

        message.hidden = visibleCards.length > 0;
    }

    search.addEventListener("input", updateProducts);
    category.addEventListener("change", updateProducts);
    sort.addEventListener("change", updateProducts);

    updateProducts();
});