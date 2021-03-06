
/*=============================================
=            Helper Functions :)             =
=============================================*/

/**
 *
 * Collapse & Expand Section is based on documentation outlined here:
 * https://css-tricks.com/using-css-transitions-auto-dimensions/
 *
 */

/*----------  Collapse Section  ----------*/
export function collapseSection(element) {
	// get the height of the element's inner content, regardless of its actual size
	var sectionHeight = element.scrollHeight;

	// on the next frame (as soon as the previous style change has taken effect),
	// explicitly set the element's height to its current pixel height, so we
	// aren't transitioning out of 'auto'
	window.requestAnimationFrame(function () {
		element.style.height = sectionHeight + 'px';

		// on the next frame (as soon as the previous style change has taken effect),
		// have the element transition to height: 0
		window.requestAnimationFrame(function () {
			element.style.height = 0 + 'px';
		});
	});

	element.setAttribute('aria-expanded', 'false');
}

/*----------  Expand Section  ----------*/
export function expandSection(element) {
	// get the height of the element's inner content, regardless of its actual size
	var sectionHeight = element.scrollHeight;

	// have the element transition to the height of its inner content
	element.style.height = sectionHeight + 'px';

	// when the next css transition finishes (which should be the one we just triggered)
	element.addEventListener('transitionend', function (e) {
		// remove this event listener so it only gets triggered once
		element.removeEventListener('transitionend', e.callee);

		// remove "height" from the element's inline styles, so it can return to its initial value
		element.style.height = null;

	});

	element.setAttribute('aria-expanded', 'true');
}


/*----------  Get Position of Element  ----------*/
export function getPosition(element) {
	var xPosition = 0;
	var yPosition = 0;

	while (element) {
		xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
		yPosition += element.offsetTop - element.scrollTop + element.clientTop;
		element = element.offsetParent;
	}

	return { x: xPosition, y: yPosition };
}

/*----------  Check if screen size is medium  ----------*/
export function isScreenSizeMedium() {
	// Set Pixel Width for Breakpoint
	var thisIsMedium = 1024;
	var windowWidth = window.innerWidth;

	if (windowWidth >= thisIsMedium) {
		return true;
	} else {
		return false;
	}
}

/*----------  Show Collapsed Menu Items  ----------*/
export function showCollapsedMenuItems() {
	var menuItemAnchors = document.querySelectorAll('.menu-item > [aria-expanded="false"]');

	menuItemAnchors.forEach(element => {
		element.setAttribute('aria-expanded', 'true');
	});
}

/*----------  Hide Collapsed Menu Items  ----------*/
export function hideCollapsedMenuItems() {
	var menuItemAnchors = document.querySelectorAll('.menu-item > [aria-expanded="true"]');

	menuItemAnchors.forEach(element => {
		element.setAttribute('aria-expanded', 'false');
	});
}


/*----------  Fetch AJAX Response  ----------*/
export function fetchResponse(inputValue) {

	jQuery('#datafetch').html('<div class="u-loading"></div>');

	jQuery.ajax({
		url: 'http://ascent-aero.wordpress.test/wp-admin/admin-ajax.php',
		type: 'post',
		data: { action: 'fetch_search_results', keyword: inputValue },
		success: function (data) {
			jQuery('#datafetch').html(data);
		}
	});
}


/*=====  End of Helper Functions :)   ======*/
