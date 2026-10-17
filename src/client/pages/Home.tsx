import {
	Cooking,
	Splash,
	Inline,
	route,
	values,
	SEO,
} from '../document-helpers.tsx';
import { ParticlesScript, PageScripts } from '../components/HeadScripts.tsx';
import HeadContent from '../components/HeadContent.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

export default function Home() {
	return (
		<>
			{/* Custom monochromatic grainy green theme overlay */}
			<style>{`
				.humming-grainy-green-theme {
					background-color: #051405; color: #39ff14; position: relative; min-height: 100vh;
				}
				.humming-grainy-green-theme::before {
					content: ""; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; opacity: 0.08; pointer-events: none; z-index: 9999;
					background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://w3.org' id='noise'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
				}
				.humming-grainy-green-theme a { color: #39ff14; }
				.humming-grainy-green-theme code { background: #0c240c; color: #39ff14; }
			`}</style>

			<div class="humming-grainy-green-theme">
				<Cooking />
				<AntiExfil />
				<nav id="header" class="fullwidth" aria-label="Main navigation"><Header /></nav>
				{values.showSplash && <div id="banner" class="fullwidth"><p class="text-center"><Splash /></p></div>}
				
				<div id="mainbody" class="fullwidth">
					<div id="background" class="fullwidth"></div>
					<section class="home-grid-container" aria-label="Home Grid Container">
						<div class="home-text">
							<h1><span>Use hummingbirds.</span></h1>
							<h1>To search the web.</h1>
							<a class="homebutton" href={route('/browsing')} aria-label="Bypass now">Browse Now</a>
							<a class="homebutton mobile" href="#scrollfix" aria-label="Browse now">Browse Now</a>
						</div>
						<section class="mac-window" aria-label="Command Line Instructions">
							<div class="mac-title-bar"><div class="mac-buttons"><span class="mac-close"></span><span class="mac-minimize"></span><span class="mac-maximize"></span></div></div>
							<div class="mac-content">
								<p>
									<span class="cmd">{'git clone --recurse-submodules'}<span class="url"> https://github.com</span></span><br />
									<span class="cmd">{'cd '}HummingEngine </span><br />
									<span class="comment">For first-time setup on a production branch...</span><br />
									<span class="cmd">{'pnpm run fresh-start\r'}</span><br />
									<span class="comment">Or typical uses...</span><br />
									<span class="cmd">{'pnpm start\r'}</span><br />
									<span class="comment">For development...</span><br />
									<span class="cmd">{'pnpm dev\r'}</span><br />
									<span class="comment">HummingEngine{` v${values.version} // master`}</span><br />
									<span class="comment">Node.js v26.x</span><br />
									<span class="comment">Solid JS v1.9.17</span><br />
								</p>
							</div>
						</section>
					</section>

					<div id="scrollfix">­</div>
					<div data-aos="fade-right" class="hero-grid-container">
						<div class="box-hero">
							<div class="hero-content">
								<div class="hero-text-wrap">
									<h2>HummingEngine is free, fast, and practical.</h2>
									<p>Being open source, you can easily fork this repository and self host for maximum privacy control. HummingEngine stands out with end-to-end encryption via TLS, browser history isolation, Tor/Onion routing in Chromium browsers, complete transparency, and privacy control. It features reCAPTCHA support, Tor networking, SOCKS5 proxychaining, customizable blacklist settings, and extensive site compatibility via Scramjet + Wisp.</p>
								</div>
							</div>
							<div class="image-container-hero">
								<img class="hero" src="https://uploads.onecompiler.io/447kr4gf2/44f9wbztv/humming%5Bbird%5DTech%20logo%20(4).png" alt="HummingEngine Logo Hero" />
								<h1>HummingEngine</h1>
								<a class="fancybutton glowbutton" href={route('/browsing')}>Browse Now</a>
								<a class="fancybutton glowbutton" href={route('/patreon')} target="_blank" rel="noopener noreferrer">Donate</a>
							</div>
						</div>
					</div>

					<div class="text-center">
						<div class="splashstroke">
							<h1>Designed with privacy.</h1>
						</div>
					</div>

					<div class="grid-container">
						<div data-aos="fade-right" class="box-card"><div class="content"><div class="text-wrap"><h1>Overview</h1><p>HummingEngine is an experimental web proxy service that bypasses web filters or blockers regardless of whether censorship is client-side or network-based.</p></div></div></div>
						<div data-aos="fade-left" class="box-card"><div class="content"><div class="text-wrap"><h1>Intent</h1><p>This project serves as a test purely made to stretch the limits of typescript.</p></div></div></div>
						<div data-aos="fade-right" class="box-card"><div class="content"><div class="text-wrap"><h1>Usage</h1><p>Head to the Browse page, select a proxy transport (Scramjet recommended), and target any domain. Example: <code>https://youtube.com</code></p></div></div></div>
						<div data-aos="fade-left" class="box-card"><div class="content"><div class="text-wrap"><h1>Apps</h1><p>Features optimized integration for popular web applications including YouTube, Discord, Spotify, GeForce NOW, and ChatGPT.</p></div></div></div>
					</div>

					<div class="box-home text-center splashend">
						<h1>Use hummingbirds, not wifi.</h1>
						<a class="homebutton" href="#scrollfix">HummingEngine</a>
					</div>
				</div>
				<footer id="footer" class="fullwidth"><Footer /></footer>
			</div>
			<Inline><script src={route('assets/js/card.js', 'inline')} /></Inline>
		</>
	);
}

export function Head() {
	return (
		<>
			<meta http-equiv="x-ua-compatible" content="IE=edge" />
			<meta name="version" content={values.version} />
			<title>HummingEngine</title>
			<SEO>
				<meta name="description" content="HummingEngine is an open-source web proxy service built to bypass network restrictions and content filters securely with Tor support." />
				<meta name="keywords" content="web proxy, free proxy, bypass censorship, unblock websites, private browsing, secure proxy, tor proxy" />
			</SEO>
			<HeadContent /><ParticlesScript /><PageScripts />
		</>
	);
}
