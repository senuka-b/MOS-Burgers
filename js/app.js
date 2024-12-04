
setup();

function setup() {
    activateHomePageItemCaroussel();
    activateHomePageBranchesCarousel();
    
}


function activateHomePageItemCaroussel(){

    let swiper = new Swiper(".home-page-item-carousel", {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 20,
        autoplay: {
            delay: 1200,
            disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".home-page-item-carousel .swiper-button-next",
          prevEl: ".home-page-item-carousel .swiper-button-prev",
        },
        breakpoints: {
            400: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
        },
  
         
        
    });
    
    let itemArray = getRandomItemArray();
    itemArray.forEach((item) => {
        
        let slide = `
        <div class="swiper-slide">
            <div class="bg-indigo-50 rounded-2xl h-64 flex overflow-hidden justify-center items-center
             transform transition ease-out duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-600">
                <div class=" flex flex-row items-end pt-60">
                    <div class="absolute  pl-7 bg-red-400 bg-opacity-[0.26] w-full">

                        <span class="text-[21px] font-itim text-white block">${item.name}</span>
                        <span class="text-[20px] font-itim text-white ">Rs. ${item.price}</span>
                    </div>
                </div>
                <img src="${getImageURL(item.code)}" class="object-cover w-full h-full" alt="">
            </div>
        </div>
        
        `

        swiper.appendSlide(slide);
    });

}

function activateHomePageBranchesCarousel() {
    let swiper = new Swiper(".home-page-branches-carousel", {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 0     ,
 
        navigation: {
          nextEl: ".home-page-branches-carousel .swiper-button-next",
          prevEl: ".home-page-branches-carousel .swiper-button-prev",
        },
  
      
  
         
        
    });
    
    let branchesArray = getBranches();
    branchesArray.forEach((branch) => {
        
        console.log(branch);
        

        let slide = `
        <div class="swiper-slide">
                                
            <div class="flex flex-col md:flex-row justify-between overflow-hidden">

                <div>

                    <div class="text-2xl sm:text-4xl font-semibold bg-red-400 bg-opacity-40 h-fit px-10 py-2 pr-20 rounded-xl
                    ">
                        ${branch.name}
                    </div>

                    <div class="font-mono block py-6 text-xl sm:text-2xl">
                        ${branch.description}
                    </div>
                </div>


                <img src="${branch.image}" class="object-contain relative rounded-lg w-fit md:w-[50%]" alt="">


            </div>

        </div>
        
        `

        swiper.appendSlide(slide);
    });
}

