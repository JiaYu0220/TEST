import './assets/scss/all.scss';
import $ from 'jquery';

const header = document.querySelector("header");
const body = document.querySelector("body");
const metaThemeColor = document.querySelector("meta[name='theme-color']");

function handleHeaderLight() {
	const scrollTop = window.scrollY;
	let themeColor = '#ad0000';
	if (scrollTop > 0) {
		header.classList.add('light');
		themeColor = '#fffffe';
	} else {
		header.classList.remove('light');
	}
	metaThemeColor.setAttribute('content', themeColor);
	// body.style.backgroundColor = themeColor;
}

$(function () {
	handleHeaderLight();

});

$(window).on('scroll', function () {
	handleHeaderLight();
});

$('.scale-btn').click(function () {
	setTimeout(function () {
		$('.scale').addClass('anime');
	}, 800);


	setTimeout(function () {
		$('.scale').removeClass('anime');
	}, 2000);
})