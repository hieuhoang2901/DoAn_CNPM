document.addEventListener('DOMContentLoaded', (event) => {
    var getRows = Array.from(document.querySelectorAll('.table > tbody > tr[data-id]'));
    getRows.forEach(ele => {
        ele.addEventListener('click', () => {
            var dataId = ele.getAttribute('data-id');
            var eleHidden = document.getElementById(dataId);
            eleHidden.classList.toggle('hidden_modal');
        })
    })
});