document.addEventListener('DOMContentLoaded', function () {
    // Mong muốn của chúng ta
//    import { 
//     isValid, 
//     isExpirationDateValid, 
//     isSecurityCodeValid, 
//     getCreditCardNameByNumber 
//   } from 'creditcard.js';
  
//   isValid('4916108926268679'); // returns true
//   isExpirationDateValid('02', '2027'); // returns true
//   isSecurityCodeValid('4556603578296676', '250'); // returns true
//   getCreditCardNameByNumber('4539578763621486'); // returns 'Visa'

//   Validator({
//       mainform: '.form',
//       form: '#form-1',
//       formGroupSelector: '.form-group',
//       errorSelector: '.form-message',
//       rules: [
//         Validator.isRequired('#card-name', 'Please enter card holder name'),
//         Validator.minLength('#password', 6),
//         Validator.isRequired('#password_confirmation'),
//         Validator.isConfirmed('#password_confirmation', function () {
//           return document.querySelector('#form-1 #password').value;
//         }, 'Incorrect password!')
//       ],
//       //onSubmit: function (data) {
//         // Call API
//         // console.log(data);
//         //mainform.submit();
//       //}
//     });


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