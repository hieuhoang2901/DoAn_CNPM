
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
var giohang = []; // (title, price, imageSrc, quantity, itemID)

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

    giohang= JSON.parse(localStorage.getItem('giohang') || "[]");
    // restore2DArray(arr);
    console.log(giohang)
    if(giohang != [])
    {
        for (var i = 0; i < giohang.length; i++) {
            var cartRow = document.createElement('div')
            cartRow.classList.add('cart-row')
            var cartItems = document.getElementsByClassName('cart-items')[0]
            var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
            var to_money = (giohang[i][1]).toString().replace('đ', '').replace('.', '').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + 'đ'
            var cartRowContents = `
                <div class="cart-item cart-column">
                    <input type="hidden" class="cart-item-id" value="${giohang[i][4]}" name="id">
                    <img class="cart-item-image" src="${giohang[i][2]}" width="100" height="100">
                    <span class="cart-item-title">${giohang[i][0]}</span>
                </div>
                <span class="cart-price cart-column">${to_money}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="${giohang[i][3]}">
                    <button class="btn btn-danger" type="button">Loại bỏ</button>
                </div>`
            cartRow.innerHTML = cartRowContents
            cartItems.append(cartRow)
            cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
            cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
        }
    }
    updateCartTotal()
}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function removeAllCartItem() { // xoa all item
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    while (removeCartItemButtons.length > 0) {
        var button = removeCartItemButtons[0]
        button.parentElement.parentElement.remove()
    }
    updateCartTotal();
    giohang.length = 0;
    localStorage.setItem('giohang', JSON.stringify(giohang));
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
    var itemID = shopItem.getElementsByClassName('category-item-id')[0].value
    addItemToCart(title, price, imageSrc, itemID)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc, itemID) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    for (var i = 0; i < giohang.length; i++) {
        if (giohang[i][0] == title) {
            alert('ĐÃ CÓ SẴN TRONG GIỎ HÀNG!')
            return
        }
    }
    var sp = new Array(title, price, imageSrc, 1, itemID)
    giohang.push(sp)
    localStorage.setItem("giohang", JSON.stringify(giohang));


    var to_money = price.replace('đ', '').replace('.', '').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + 'đ'
    var cartRowContents = `
        <div class="cart-item cart-column">
            <input type="hidden" class="cart-item-id" value="${itemID}" name="id">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${to_money}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Loại bỏ</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    var mess = 'ĐÃ THÊM ' + title.toUpperCase() + ' VÀO GIỎ HÀNG!';
    alert(mess);
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var total_quantity = 0
    giohang.length = 0; // clear all
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]

        var titleElement = cartRow.getElementsByClassName('cart-item-title')[0]
        var title = titleElement.innerText
        var imageElement = cartRow.getElementsByClassName('cart-item-image')[0]
        var imageSrc = imageElement.getAttribute("src")


        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseInt(priceElement.innerText.replace('đ', '').replace('.', ''))
        var quantity = quantityElement.value
        var idElement = cartRow.getElementsByClassName('cart-item-id')[0]
        var itemID = idElement.value
        // console.log(itemID)

        var sp = new Array(title, price, imageSrc, quantity, itemID)
        giohang.push(sp)
        console.log(giohang)

        total = total + (price * quantity)
        total_quantity = total_quantity + parseInt(quantity)
    }
    localStorage.setItem('giohang', JSON.stringify(giohang));
    document.getElementsByClassName('cart-total-price')[0].innerText = total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + 'đ'
    document.getElementsByClassName('gio-hang cart-icon')[0].innerText = 'Giỏ hàng(' + total_quantity + ')'
}
var firstTime = 1;

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
// function restore2DArray(arr)
// {
//     giohang.length = 0;
//     var realLength = arr.length/2;
//     for (var i = 0; i < realLength; i += 4)
//         giohang.push(arr[i], arr[i+1], arr[i+2], arr[i+3]);
// }
// function redirect_page() {
//     window.location.href = 'menu_mon_an.html';
// }

document.addEventListener('DOMContentLoaded', function () {
    var payment_form = document.forms['payment-form'];
    var input_cart = document.getElementById('cart');
    var paymentBtn = document.getElementById('payment-btn');
    var removeAllBtn1 = document.getElementById('clear-cart-btn1');
    var removeAllBtn2 = document.getElementById('clear-cart-btn2');

    paymentBtn.onclick = function () {
        var arr = JSON.stringify(giohang);
        $(input_cart).attr('value',arr);
        console.log(arr);
        payment_form.submit();
    };
    removeAllBtn1.onclick = function () {
        removeAllCartItem();
        console.log("ĐÃ XÓA HẾT CÁC MÓN TRONG GIỎ HÀNG !")
    };
    removeAllBtn2.onclick = function () {
        removeAllCartItem();
        console.log("ĐÃ XÓA HẾT CÁC MÓN TRONG GIỎ HÀNG !")
    };
});
