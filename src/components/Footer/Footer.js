import React from 'react';
import { Link } from 'react-router-dom';
// import { Button } from './Button';
import './Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                Join Our Newsletter
                </p>
                <p className="footer-subscription-text">
                Signup to be the first to hear about exclusive deals, special offers and upcoming collections
                </p>
                <div className="input-areas">
                    <form action="">
                        <input className="footer-subscription-input" type="email" name="email" placeholder="Enter email for weekly newsletter" />
                        <button type="submit" className="footer-subscription-button">Subscribe</button>
                        {/* <Button buttonStyle="btn--outline">Subscribe</Button> */}
                    </form>
                </div>
            </section>
            <div className="footer-container2">
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to='/' className="social-logo">
                        <img src="/images/logo.png[800x150].png" alt="" />
                        </Link>
                    </div>
                    <div className="footer-address">
                        <p className="footer-address-para">1418 River Drive, Suite 35 Cottonhall, CA 9622
United States</p>
                    </div>
                    <div className="footer-contact">
                        <Link to='/'>Sale@bookworm.com</Link>
                        <Link to='/'>+124329849814</Link>
                    </div>
                    {/* <small className="website-rights">MyYoutube &copy; 2021</small> */}
                    <div className="social-icons">
                        <Link className="social-icon-link facebook" to='/' target="_blank" aria-label='Facebook'>
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link className="social-icon-link instagram" to='/' target="_blank" aria-label='Instagram'>
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link className="social-icon-link twitter" to='/' target="_blank" aria-label='Twitter'>
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link className="social-icon-link linkedin" to='/' target="_blank" aria-label='Linkedin'>
                            <i className="fab fa-linkedin"></i>
                        </Link>
                        <Link className="social-icon-link youtube" to='/' target="_blank" aria-label='Youtube'>
                            <i className="fab fa-youtube"></i>
                        </Link>
                    </div>
                </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h4>Explore</h4>
                        <Link to='/'>About Us</Link>
                        <Link to='/'>Sitemap</Link>
                        <Link to='/'>Bookmarks</Link>
                        <Link to='/'>Sign in/Join</Link>
                    </div>
                    <div className="footer-link-items">
                        <h4>Customer Service</h4>
                        <Link to='/'>Help Center</Link>
                        <Link to='/'>Returns</Link>
                        <Link to='/'>Product Recalls</Link>
                        <Link to='/'>Accessibility</Link>
                        <Link to='/'>Contact Us</Link>
                        <Link to='/'>Store Pickup</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h4>Policy</h4>
                        <Link to='/'>Return Policy</Link>
                        <Link to='/'>Terms Of Use</Link>
                        <Link to='/'>Security</Link>
                        <Link to='/'>Privacy</Link>
                    </div>
                    <div className="footer-link-items">
                        <h4>Categories</h4>
                        <Link to='/'>Action</Link>
                        <Link to='/'>Comedy</Link>
                        <Link to='/'>Drama</Link>
                        <Link to='/'>Horror</Link>
                        <Link to='/'>Kids</Link>
                        <Link to='/'>Romantic Comedy</Link>
                    </div>
                </div>
            </div>
            </div>
            <div className="footer-container3">
            &copy; 2021 BookShelf. All Rights Reserved
            </div>
            
        </div>
    )
}
export default Footer
