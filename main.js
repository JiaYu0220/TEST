import './assets/scss/all.scss';

const header = document.querySelector("header");
const nav = document.querySelector("nav");
const body = document.querySelector("body");
const metaThemeColor = document.querySelector("meta[name='theme-color']");

handleHeaderLight()

window.addEventListener("scroll", () => handleHeaderLight())
function handleHeaderLight() {
	const scrollTop = window.scrollY;
	let themeColor = '#ad0000';
	if (scrollTop > 0) {
		header.classList.add('light');
		themeColor = '#6495ed';
	} else {
		header.classList.remove('light');
	}
	metaThemeColor.setAttribute('content', themeColor);
	body.style.backgroundColor = themeColor;
}