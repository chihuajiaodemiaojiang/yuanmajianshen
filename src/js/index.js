require('../css/index.less');
require('../../node_modules/swiper/swiper-bundle.js');
require('../../node_modules/swiper/swiper-bundle.css');
var mySwiper = new Swiper ('.swiper', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    }
})
