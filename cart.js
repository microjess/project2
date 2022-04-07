// HTML - add cart.js to front end file 
// <btn class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>

// Waiting for event of DOM Content loaded 
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// Calls ready function when ready. Lets you add or remove items in cart
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i =0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
}
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i =0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i] 
        input.addEventListener('change', quantityChanged)
}
    var addToCartButtons = document.getElementsByClassName('shop-item-buttons')
    for (var i =0; i < addToCartButtons.length; i++) {
        var input = addToCartButtons[i] 
        input.addEventListener('click', addToCartClicked)
}
}


// Function to remove items in cart 
function removeCartItem(event) {
    var buttonCliclked = event.target
    buttonCliclked.parentElement.parentElement.remove()
    updateCartTotal()
}

// Function to ensure quantity cannot be less than 0 
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1 
    }
    updateCartTotal()
}

// Adds items to cart once "ADD TO CART" button is clicked
function addToCartClicked(event) {
    var button = event.target
    varShopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
}

var removeCartItemButtons = document.getElementsByClassName('btn-danger')

for (var i =0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function(event) {
        var buttonCliclked = event.target
        buttonCliclked.parentElement.parentElement.remove()
    })
}

// Update cart total as items are added and removed from cart
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
        [0]
        var price = paseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        console.log(price * quantity)
        total = total + (price * quantity)
    }
    // Ensures total does not have more than 2 decimal places (formats in currrency)
    total = Math.round(total *100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
