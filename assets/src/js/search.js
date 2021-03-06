import { fetchResponse } from './helper-functions';

/*----------  Toggle Search Modal  ----------*/
var searchButton = document.querySelector('.site-header-search__button');

searchButton.addEventListener('click', function (e) {
	e.preventDefault();

	var _this = this;
	var isNotExpanded = _this.getAttribute('aria-expanded') === 'false';

	if (isNotExpanded) {
		_this.setAttribute('aria-expanded', 'false');
		document.querySelector('body').classList.remove('noScroll');
	} else {
		_this.setAttribute('aria-expanded', 'true');
		document.querySelector('.site-header-search__term').focus();
		document.querySelector('body').classList.add('noScroll');
	}
});


/*----------  Close Search Modal  ----------*/
var closeSearchModal = document.querySelector('.site-header-search__close');

closeSearchModal.addEventListener('click', function (e) {
	document.querySelector('.site-header-search__button').setAttribute('aria-expanded', 'false');
});


/*----------  AJAX Search  ----------*/
var searchTerm = document.querySelector('.site-header-search__term');
var searchTimer;
var searchCompletedTimeout = 500;

// If value exsists in search field, show results
if (searchTerm.value != '') {
	fetchResponse(searchTerm.value);
}

// If user has typed in field, show results
searchTerm.addEventListener('keyup', function () {
	clearTimeout(searchTimer);
	searchTimer = setTimeout(processSearch, searchCompletedTimeout);
});

searchTerm.addEventListener('keydown', function () {
	clearTimeout(searchTimer);
});

function processSearch() {
	fetchResponse(searchTerm.value);
}
