document.addEventListener('DOMContentLoaded', function () {

    var cod = document.getElementById('cod');
    var zalopay = document.getElementById('zalopay');
    var momo = document.getElementById('momo');
    var credit = document.getElementById('credit');
    var button = document.getElementById('checkout-btn');
    var method = document.getElementById('method');

    cod.onclick = function() {
        console.log('cod');
        $(button).attr('data-target','#order-success');
        $(method).attr('value','COD');
    }
    credit.onclick = function() {
        console.log('credit');
        $(button).attr('data-target','#credit-card-form');
        $(method).attr('value','Credit Card');
    }
    zalopay.onclick = function() {
        console.log('zalopay');
        $(button).attr('data-target','#zalopay-form')
        $(method).attr('value','Zalo Pay');
    }
    momo.onclick = function() {
        console.log('momo');
        $(button).attr('data-target','#momo-form')
        $(method).attr('value','MOMO');
    }


  });