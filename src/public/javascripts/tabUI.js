const $1 = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $1(".tab-item.active");
const line = $1(".tabs .line");

line.style.left = tabActive.offsetLeft + "px";
line.style.width = tabActive.offsetWidth + "px";

tabs.forEach((tab, index) => {
    const pane = panes[index];

    tab.onclick = function() {
        $1(".tab-item.active").classList.remove("active");
        $1(".tab-pane.active").classList.remove("active");

        line.style.left = this.offsetLeft + "px";
        line.style.width = this.offsetWidth + "px";

        this.classList.add("active");
        pane.classList.add("active");
    };
});



const $ = document.querySelectorAll.bind(document);
const images = $(".slider__item");
// console.log(images);
$(".next__btn")[0].onclick = () => {
    let i = Math.floor(images[0].offsetLeft / images[0].offsetWidth);
    if (i <= -(images.length - 1)) i = 1;
    i = i - 1;
    images.forEach((image) => (image.style.left = i * 100 + "%"));
    $(".dot__item.active")[0].classList.remove("active");
    $(".dot__item")[-i].classList.add("active");
};
$(".prev__btn")[0].onclick = () => {
    let i = Math.ceil(images[0].offsetLeft / images[0].offsetWidth);
    if (i === 0) i = -images.length;
    i = i + 1;
    images.forEach((image) => (image.style.left = i * 100 + "%"));
    $(".dot__item.active")[0].classList.remove("active");
    $(".dot__item")[-i].classList.add("active");
};
$(".dot__item").forEach((dot, index) => {
    dot.onclick = () => {
        $(".dot__item.active")[0].classList.remove("active");
        dot.classList.add("active");
        images.forEach((image) => (image.style.left = -index * 100 + "%"));
    };
});

// Auto slider 10s //
setInterval(() => { $(".next__btn")[0].click() }, 5000)