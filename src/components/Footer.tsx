import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export const Footer = ()=>{
    return (
        <footer className="footer">
            <section>
                <section>
                    <address className="footer-address">
                        <span className="footer__title">Contact Us at</span>
                        <a className="contact--btn" role="button" href="mailto:webmaster@example.com"> HomeDecore</a><br/>
                        Visit us at:<br/>
                        Riyadh, Saudi Arabia<br/>
                        Box 564, Alfaysalyah<br/>
                        tel: +966-987-654-3210  
                    </address>
                </section>
                <section className='footer__subscribe'>
                    <input type='email' placeholder='subscribe' />
                    <input type='submit' value="subscribe" />
                </section>
                <section aria-labelledby="social-media">
                    <p id="social-media" className="footer__title">Follow Us on Social Media</p>
                    <div id="icons" className="footer__icons">
                        <XIcon/>
                        <InstagramIcon/>
                        <FacebookIcon />
                    </div>
                </section>
            </section>
            <p className="footer__copyrights">&copy; All right reserved </p>
        </footer>
    )
}