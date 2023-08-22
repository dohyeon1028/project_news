const dynamic_ul = document.querySelector("#dynamic_news>ul");
const next = document.querySelector(".next");
const lis = dynamic_ul.querySelectorAll("li");
let len = lis.length;

const static_ul = document.querySelector("#static_news> ul");
const static_lis = static_ul.querySelectorAll("li");
const static_btns = document.querySelectorAll(".listBtn ul li");

static_btns.forEach((el, index) => {
    el.addEventListener("click", ()=>{
        console.log(index-1);
        for (const el of static_lis) {
            el.classList.remove("on");
        }
        static_lis[index-1].classList.add("on");
    })
});


// static_news


// dynamic_news
init();

setInterval(() => {
    nextSlide()
}, 6000);

function nextSlide(){
    const duration = 2000;
    const initialValue = parseInt(dynamic_ul.style.left) || -100;
    const targetValue = -200;
    const unit = "%";

    const startTime = performance.now();

    function animate(time){
        const timeReal = time - startTime;

        const progress = timeReal / duration;

        const currentValue = initialValue + (targetValue - initialValue) * progress;
        dynamic_ul.style.left = `${currentValue}${unit}`;

        if(progress < 1){
            requestAnimationFrame(animate);
        }else if(progress >= 1){
            dynamic_ul.style.left = "-100%";
            dynamic_ul.append(dynamic_ul.firstElementChild);
            enableClick = true;
        }

    }
    requestAnimationFrame(animate);
}


function init(){
    dynamic_ul.style.width = `${100 * len}%`;
    lis.forEach((el)=>{
        el.style.width = `${100 / len}%`;
    });
    dynamic_ul.style.left = "-100%";
    dynamic_ul.prepend(dynamic_ul.lastElementChild);
}
