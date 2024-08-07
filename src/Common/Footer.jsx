import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            {/* <!-- ======= Footer ======= --> */}
            <footer id="footer">

                <div class="footer-top">
                    <div class="container">
                        <div class="row">

                            <div class="col-lg-3 col-md-6 footer-contact">
                                <h3>Blog</h3>
                                <p>
                                    15 SC Street <br />
                                    Kolkata, 700003<br />
                                    West Bengal <br /><br />
                                    <strong>Phone:</strong> +033-26643827<br />
                                    <strong>Email:</strong> blog@gmail.com<br />
                                </p>
                            </div>

                            <div class="col-lg-2 col-md-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i class="bx bx-chevron-right"></i> <Link to="/">Home</Link></li>
                                    <li><i class="bx bx-chevron-right"></i> <Link to="/blog">Blog</Link></li>
                                    <li><i class="bx bx-chevron-right"></i> <Link to="/course">Course</Link></li>
                                    <li><i class="bx bx-chevron-right"></i> <Link to="/contact">Contact</Link></li>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                </ul>
                            </div>

                            <div class="col-lg-3 col-md-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Web Design</a></li>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>
                                </ul>
                            </div>

                            <div class="col-lg-4 col-md-6 footer-newsletter">
                                <h4>Join Our Newsletter</h4>
                                <form action="" method="post">
                                    <input type="email" name="email" /><input type="submit" value="Subscribe" />
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="container d-md-flex py-4">

                    <div class="mr-md-auto text-center text-md-left">
                        <div class="copyright">
                            &copy; Copyright <strong><span>BLOG</span></strong>. All Rights Reserved
                        </div>
                        <div class="credits">
                            {/* <!-- All the links in the footer should remain intact. -->
          <!-- You can delete the links only if you purchased the pro version. -->
          <!-- Licensing information: https://bootstrapmade.com/license/ -->
          <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/company-free-html-bootstrap-template/ --> */}
                            Designed by Mousom Ray
                        </div>
                    </div>
                    <div class="social-links text-center text-md-right pt-3 pt-md-0">
                        <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                        <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
                        <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
                        <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
                        <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
                    </div>
                </div>
            </footer>
            {/* <!-- End Footer --> */}
            <br />
        </>
    )
}

export default Footer
