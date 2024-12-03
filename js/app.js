
setup();

function setup() {
    activateHomePageItemCaroussel();
    
}


function activateHomePageItemCaroussel(){

    new Swiper(".home-page-item-carousel", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        autoplay: {
            delay: 1200,
            disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".home-page-item-carousel .swiper-button-next",
          prevEl: ".home-page-item-carousel .swiper-button-prev",
        },
        // breakpoints: {
        //     1920: {
        //       slidesPerView: 4,
        //       spaceBetween: 30
        //     },
        //     1028: {
        //       slidesPerView: 5,
        //       spaceBetween: 10
        //     },
        //     990: {
        //       slidesPerView: 1,
        //       spaceBetween: 0
        //     }
        // }
         
        
    });

    let carousel = document.querySelector(".swiper-wrapper");
    
    let itemArray = getRandomItemArray();
    itemArray.forEach((item) => {
        console.log(getImageURL(item.code));
        
        carousel.innerHTML += `
        <div class="swiper-slide">
            <div class="bg-indigo-50 rounded-2xl h-64 w-[418px] flex overflow-hidden justify-center items-center">
                <div class="relative flex flex-row items-end">
                    <div class="absolute block py-10 pl-7">

                        <span class="text-[29px] font-itim text-white block">${item.name}</span>
                        <span class="text-[20px] font-itim text-white ">Rs. ${item.price}</span>
                    </div>
                    <img src="${getImageURL(item.code)}" alt="">
                </div>
            </div>
        </div>
        
        `
    });

}

