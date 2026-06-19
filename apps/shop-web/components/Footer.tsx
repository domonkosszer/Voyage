import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <div className="wm">VOYAGE</div>
            <p>
              Small-batch sportswear, made in considered numbers for people who
              train on their own terms.
            </p>
            <div className="serif-tag">L&rsquo;Olympionique · for the few.</div>
          </div>
          <div className="fcol">
            <h4>Shop</h4>
            <a href="#collection">Drop 01</a>
            <a href="#signature">L&rsquo;Olympionique</a>
            <a href="#">Sports Club</a>
            <a href="#">Gift card</a>
          </div>
          <div className="fcol">
            <h4>Help</h4>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Size guide</a>
            <a href="#">Contact</a>
          </div>
          <div className="fcol">
            <h4>Brand</h4>
            <a href="#about">About</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </div>
        </div>
        <div className="fbase">
          <span>© {new Date().getFullYear()} Voyage. All rights reserved.</span>
          <span>Basel, Switzerland</span>
        </div>
      </div>
    </footer>
  );
}
