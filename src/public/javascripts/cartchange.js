$(document).ready(function() {
    var plus = $('.btn-plus')
    var minus = $('.btn-minus')

    plus.each(function(index, plusBtn) {
        var jplus = $(plusBtn)
        jplus.click(function() {
            var quantity = parseInt(jplus.prev().val()) + 1
            jplus.prev().val(quantity)

            var test = (jplus.parent()).parent().next()
            var priceProduct = test.find('.slidebar__wrap-price').text()

            var total = 5 * quantity
            console.log(priceProduct)
            test.find('.slidebar__wrap-price').text(total)
        })
    })

    minus.each(function(index, minusBtn) {
        var jminus = $(minusBtn)
        jminus.click(function() {
            if (parseInt(jminus.prev().val()) == 0)
                var quantity = parseInt(jminus.prev().val()) - 1
            jminus.prev().val(quantity)

            var test = (jminus.parent()).parent().next()
            var priceProduct = test.find('.slidebar__wrap-price').text()

            var total = 5 * quantity
            console.log(priceProduct)
            test.find('.slidebar__wrap-price').text(total)
        })
    })

    var addBtn = $('.js-add-btn')
    var cart1 = document.querySelector('.slidebar__wrap-list')
    var cart = $('.slidebar__wrap-list')
    addBtn.click(function() {
        var parentProduct = addBtn.parentsUntil('.feature-item')[0]
        var productPictureSrc = parentProduct.querySelector('.product__item-img').getAttribute('src')
        var price = parentProduct.querySelector('.product__item-price .product__item-price-sale').innerHTML
        console.log(price)
        var productInfo = `<li class="slidebar__wrap-item">
            <img src="/image/fried_chicken.jpg" alt="" class="slidebar__wrap-img">
            <div class="slidebar__wrap-info">
              <a href="" class="slidebar__wrap-info-product">Fried Chicken</a>

              <span class="slidebar__wrap-info-food">
                <button class="btn-minus" onclick="decrease()">-</button>
                <input class="slidebar__wrap-info-quantity" id="productQuantity" type="text" value="1"></input>
                <button class="btn-plus" onclick="increase()">+</button>
              </span>
            </div>
            <div class="slidebar__wrap-trash-and-price">
              <i class="fal fa-trash-alt trash-btn"></i>
              <div class="slidebar__wrap-price">${price}</div>
            </div>
          </li>`
        cart.append(productInfo)

    })


    var trashBtnes = $('.trash-btn')
    trashBtnes.each(function(index, trash) {
        var jtrash = $(trash)
        jtrash.click(function() {
            var htmltrash = jtrash[0];
            var trashBtnParent = (htmltrash.parentElement).parentElement

            trashBtnParent.remove()
        })

    })
})