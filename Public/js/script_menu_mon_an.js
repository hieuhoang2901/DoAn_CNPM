
// Slider
const imgPosition = document.querySelectorAll(".aspect-ratio-169 img")
const imgContainer = document.querySelector(".aspect-ratio-169")
const dotItem = document.querySelectorAll(".dot")
let imgNumber = imgPosition.length
let index = 0
imgPosition.forEach(function(image, index) {
    image.style.left = index*100 +"%";
    dotItem[index].addEventListener("click", function(){
        slider(index)
    })
})
function imgSlide () {
    index ++;
    if(index >= imgNumber) index = 0
    slider(index)
}
function slider(idx) { // idx: cuc bo, index: toan cuc; neu index != idx -> con tro da chinh sua vi tri
    if(idx != index) index = idx;
    imgContainer.style.left = "-" + idx*100 + "%";
    const dotActive = document.querySelector(".Active")
    dotActive.classList.remove("Active")
    dotItem[idx].classList.add("Active")
}
setInterval(imgSlide, 3000)
              
// Scroll to
function scroll_to(id) {
    var my_element = document.getElementById(id);

    my_element.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
    });
}

// Cart
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('category-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('category-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('category-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('category-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Loại bỏ</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    alert('Đã thêm ' + title + ' vào giỏ hàng!')
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var total_quantity = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseInt(priceElement.innerText.replace('đ', '').replace('.', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        total_quantity = total_quantity + parseInt(quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + 'đ'
    document.getElementsByClassName('nav-link cart-icon')[0].innerText = 'Giỏ hàng(' + total_quantity + ')'
}
function show_cart()
{
    if(document.getElementById("cartshow").style.display != "block")
        document.getElementById("cartshow").style.display = "block";
}
function close_cart()
{
    if(document.getElementById("cartshow").style.display != "none")
        document.getElementById("cartshow").style.display = "none";
}

// function redirect_page() {
//     window.location.href = 'menu_mon_an.html';
// }