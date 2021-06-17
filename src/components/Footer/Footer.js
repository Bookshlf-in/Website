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
                        <input className="footer-subscription-input" type="email" name="email" placeholder="Enter email for weekly newsletter" required />
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
                        <img src="./images/logo[800x150].png" alt="" />
                        </Link>
                    </div>
                    <div className="footer-address">
                        <p className="footer-address-para">IIIT Lucknow, Ahmamau 226002 UP, India</p>
                    </div>
                    <div className="footer-contact">
                        <Link to='/'>bookshlf@outlook.com</Link>
                        <br/>
                        <Link to='/'>+91 97926 66122</Link>
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
                        <Link to='/About'>About Us</Link>
                        <Link to='/'>Sitemap</Link>
                        <Link to='/'>Sign in</Link>
                        <Link to='/'>Join Us</Link>
                    </div>
                    <div className="footer-link-items">
                        <h4>Customer Service</h4>
                        <Link to='/'>Returns</Link>
                        <Link to='/'>Report Product</Link>
                        <Link to='/'>Accessibility</Link>
                        <Link to='/Contact'>Contact Us</Link>
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
                        <Link to='/'>JEE Mains</Link>
                        <Link to='/'>NEET PG</Link>
                        <Link to='/'>JEE Advanced</Link>
                        <Link to='/'>High School</Link>
                        <Link to='/'>Programming</Link>
                        <Link to='/'>Novels</Link>
                    </div>
                </div>
            </div>
            </div>
            <div className="footer-container3">
            &copy; 2021 BookShlf. All Rights Reserved
            </div>
            
        </div>
    )
}
export default Footer
