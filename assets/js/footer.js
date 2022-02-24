const createFooter = () =>{
    let footer = document.querySelector('.footer');
    footer.innerHTML = `
    
        <div class="footer__gap"></div>
        <div class="wrapper">
            <div class="footer__list">
                <div class="footer__item">
                    <div class="footer__heading">Chăm sóc khách hàng</div>
                    <ul class="footer__nav">
                        <li><a class="footer__nav-link" href="">Trung tâm trợ giúp</a></li>
                        <li><a class="footer__nav-link" href="">Shopee blog</a></li>
                        <li><a class="footer__nav-link" href="">Shopee mall</a></li>
                        <li><a class="footer__nav-link" href="">Hướng dẫn mua hàng</a></li>
                        <li><a class="footer__nav-link" href="">Hướng dẫn bán hàng</a></li>
                        <li><a class="footer__nav-link" href="">Thanh toán</a></li>
                        <li><a class="footer__nav-link" href="">Shopee xu</a></li>
                        <li><a class="footer__nav-link" href="">Vận chuyển</a></li>
                        <li><a class="footer__nav-link" href="">Trả hàng & Hoàn tiền</a></li>
                        <li><a class="footer__nav-link" href="">Chăm sóc khách hàng</a></li>
                        <li><a class="footer__nav-link" href="">Chính sách bảo hành</a></li>
                    </ul>
                </div>
                <div class="footer__item">
                    <div class="footer__heading">Về shopee</div>
                    <ul class="footer__nav">
                        <li><a class="footer__nav-link" href="">Giới thiệu về shopee việt nam</a></li>
                        <li><a class="footer__nav-link" href="">Tuyển dụng</a></li>
                        <li><a class="footer__nav-link" href="">Điều khoản về shopee</a></li>
                        <li><a class="footer__nav-link" href="">Chính sách bảo mật</a></li>
                        <li><a class="footer__nav-link" href="">Chính hãng</a></li>
                        <li><a class="footer__nav-link" href="">Kênh người bán</a></li>
                        <li><a class="footer__nav-link" href="">Flash slae</a></li>
                        <li><a class="footer__nav-link" href="">Chương trình tiếp thị liên kết shopee</a></li>
                        <li><a class="footer__nav-link" href="">Liên hệ với truyền thông</a></li>
                    </ul>
                </div>
                <div class="footer__item">
                    <div class="footer__item">
                        <div class="footer__heading">Thanh toán</div>
                        <ul class="footer__nav footer__nav--img">
                            <li>
                                <a class="footer__nav-link" href="">
                                    <img class="footer__img" src="./assets/img/visa.png" alt="">
                                </a>
                            </li>
                            <li>
                                <a class="footer__nav-link" href="">
                                    <img class="footer__img" src="./assets/img/master-card.png" alt="">
                                </a>
                            </li>
                            <li>
                                <a class="footer__nav-link" href="">
                                    <img class="footer__img" src="./assets/img/jcb.png" alt="">
                                </a>
                            </li>
                            <li>
                                <a class="footer__nav-link" href="">
                                    <img class="footer__img" src="./assets/img/amex.png" alt="">
                                </a>
                            </li>
                            <li>
                                <a class="footer__nav-link" href="">
                                    <img class="footer__img" src="./assets/img/cod.png" alt="">
                                </a>
                            </li>
                            <li>
                                <a class="footer__nav-link" href="">
                                    <img class="footer__img" src="./assets/img/shopee-pay.png" alt="">
                                </a>
                            </li>


                        </ul>
                    </div>
                    <div class="footer__item">
                        <div class="footer__heading">Đơn vị vận chuyển</div>
                        <ul class="footer__nav footer__nav--img">
                            <li>
                                <a class="footer__nav-link" href="">
                                    <img class="footer__img" src="./assets/img/shopee-express.png" alt="">
                                </a>
                            </li>
                            <li>
                                <a class="footer__nav-link" href="">
                                    <img class="footer__img" src="./assets/img/J&T.png" alt="">
                                </a>
                            </li>
                            <li>
                                <a class="footer__nav-link" href="">
                                    <img class="footer__img" src="./assets/img/grab-express.png" alt="">
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="footer__item">
                    <div class="footer__heading">Theo dõi chúng tôi trên</div>
                    <ul class="footer__nav">
                        <li><a class="footer__nav-link" href="">
                                <i class="navbar__icon fa-brands fa-facebook"></i>
                                Facebook
                            </a></li>
                        <li><a class="footer__nav-link" href="">
                                <i class="navbar__icon fa-brands fa-instagram"></i>
                                Instagram
                            </a></li>
                        <li><a class="footer__nav-link" href="">
                                <i class="navbar__icon fa-brands fa-linkedin"></i>
                                LinkedIn
                            </a></li>
                    </ul>
                </div>
                <div class="footer__item">
                    <div class="footer__heading">Tải ứng dụng trên shopee ngay thôi</div>
                    <div class="footer__download">
                        <a href=""><img style="width: 86px; margin-right: 15px;" src="./assets/img/qr.png" alt=""></a>
                        <div class="footer__download-app">
                            <a href=""><img style="width: 86px; height: auto;" src="./assets/img/app-store.png"
                                    alt=""></a>
                            <a href=""><img style="width: 86px; height: auto;" src="./assets/img/chplay.png" alt=""></a>
                            <a href=""><img style="width: 86px; height: auto;" src="./assets/img/app-gallery.png"
                                    alt=""></a>

                        </div>

                    </div>
                </div>
            </div>
        </div>


   
    `;
}
createFooter();