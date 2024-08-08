import './assets/scss/all.scss';
import $ from 'jquery';

function scrollDo() {
    showAnimation('.addonerotate', 'onerotate', 100);
    showAnimation('.addbottom', 'antobottom', 100);
	showAnimation('.addtop', 'antotop', 100);
	showAnimation('.addleft', 'antoleft', 100);
	showAnimation('.addright', 'antoright', 100);
}

function showAnimation(divName, cssName, offset, callback) {
    if ($(divName).length > 0) {
        $(divName).each(function() {
            var divTop = $(this).offset().top;
            var divTopOffset = eval(divTop + offset);
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scrollTop + windowHeight > divTopOffset && scrollTop < divTopOffset) {
                $(this).addClass(cssName);
                $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            }
        });
    }
}

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
	body.style.backgroundColor = themeColor;
}

$(function () {
	scrollDo();
	handleHeaderLight();

	$('.reback').on('click', function() {
		$('html,body').animate({
			scrollTop: 0
		}, 500);
	});
	
	$('.contact-us-button-social .main').on('click', function() {
		console.log('contact');
		$('.contact-us-button-social').toggleClass('active');
	});

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
});

$(window).on('scroll', function () {
    scrollDo();
	handleHeaderLight();
});

// 驗證
const constraints = {
	name: {
		presence: {
			message: "請輸入姓名"
		},
	},
	gender: {
		presence: {
			message: "請選擇稱謂"
		},
	},
	store: {
		presence: {
			message: "請輸入公司／商店名稱"
		},
	},
	phone: {
		presence: {
			message: "請輸入聯絡電話"
		},
		format: {
			pattern: /^(0)[0-9]{9}$/,
            message: "請輸入正確的電話號碼"
		}
	},
	time: {
		presence: {
			message: "請輸入方便聯絡的時間"
		},
	},
	email: {
		presence: {
			message: "請輸入聯絡信箱"
		},
		email: {
			message: "請輸入正確的信箱格式"
		}
	},
	line: {
		presence: {
			message: "請輸入 LINE ID"
		},
	},
}
const consultForm = document.querySelector('#consult-form');
const consultInputs = consultForm.querySelectorAll('input');
const consultData = {};
consultInputs.forEach((input) => {
	input.addEventListener('input', () =>  validateInput(input))
})

consultForm.addEventListener('submit', (e) => {
	e.preventDefault();
	consultInputs.forEach((input) => validateInput(input));
	const errors = validate(consultForm, constraints, {fullMessages: false});
	if(!errors) {
		if (typeof dataLayer !== 'undefined') dataLayer.push({'event':'contactUsSend'});
		$.ajax({
			type: 'POST',
			url: "/contactus/send",
			data: consultData,
			success: function(respones) {
				if (typeof dataLayer !== 'undefined') dataLayer.push({'event':'contactUsSuccess'});
				$('#consultModal').modal('hide');
				$('#successModal').modal('show');
				consultForm.reset();
			},
			error: function() {
				alert('發送失敗，請重新再試一次');
			},
		});

	}
})

function validateInput(input) {
	const errorElement = input.closest('.form-item').querySelector('.messages');
	errorElement.textContent = '';
	const errors = validate(consultForm, constraints, {fullMessages: false});
	if (errors && errors[input.name]) {
		errorElement.textContent = errors[input.name];
		input.classList.add('error');
	} else {
		input.classList.remove('error');
		consultData[input.name] = input.value;
	}
}

$('#consultModal').on('show.bs.modal', function() {
	if (typeof dataLayer !== 'undefined') dataLayer.push({'event':'contactUsOpen'});
});