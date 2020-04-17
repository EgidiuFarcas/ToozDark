// Select the node that will be observed for mutations
const targetNode = document.getElementsByTagName("BODY")[0];

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    darken(bgColor, txtColor, showBG);
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

let bgColor, txtColor, showBG;

chrome.storage.sync.get(['backgroundColor','textColor','showBackgrounds'], function (result) {
	bgColor = result.backgroundColor;
	txtColor = result.textColor;
	showBG = result.showBackgrounds;

	if(bgColor == null) bgColor = "#1c1c1c";
	if(txtColor == null) txtColor = "#fff";
	if(showBG == null) showBG = true;

	darken(bgColor, txtColor, showBG);

});


function darken(background, text, showBackgrounds){
	DarkenById('main-content', background);
	DarkenById('shopify-section-footer', "#ff467f linear-gradient(90deg,#ff467f 0%,#ff4669 94%)");
	DarkenById('shopify-section-cart-bar', "#ff467f linear-gradient(90deg,#ff467f 0%,#ff4669 94%)");

	if(!showBackgrounds) DarkenByClass('ProductCard_media_inner', background);
	DarkenByClass('Cart-product-inner', background);
	DarkenByClassWebkit('form_field', null, background);
    DarkenByClass('sticky-bottom', "rgba(0,0,0,0)");
	DarkenByClass('SocialCards', background);
	DarkenByClassWebkit('PromoPage_content_inner', background, text);
	DarkenByClass('Cart-modal', background);
	DarkenByClass('ProductGallery', background);
	DarkenByClass('ProductModal_content', background);
	DarkenByClass('Pagination_item_link', background);
	DarkenByClass('Cart-product-inner', background);
	DarkenByClass('Header', background);
	DarkenByClassWebkit('Article_title', null, text, true);
	DarkenByClassWebkit('Cart-product_meta_info_name', null, text);
	DarkenByClass('Cart-product_meta_info_name', null, text);
	DarkenByClass('Cart-price_current', null, text);
	DarkenByClassWebkit('TrackingStatus_products_item_name', null, text);
	DarkenByClass('Article_subtitle', null, text);
	DarkenByClass('ArthurLP_main_copy', null, text);
	DarkenByClass('Cart-product_delete', null, text);
	DarkenByClass('Cart-heading', null, text);
	DarkenByClass('QuantitySelect_input', null, text);
	DarkenByClass('Cart-total-text', null, text);
	DarkenByClass('Cart-footer-note-field', null, text);
	DarkenByClass('ProductCard_price', null, text);
	DarkenByClass('Article_title', null, text);
	DarkenByClassWebkit('Article_title', null, text);
	DarkenByClassWithChildren('Product-description', null, text);
	DarkenByClass('Product-detail-line_value', null, text);
	DarkenByClass('QuantitySelect_input', null, text);
	DarkenByClass('QuantitySelect_value', null, text);
	DarkenByClass('Product-wait_for_it', null, text);
	DarkenByClass('Product-price_compare', null, text);
	DarkenByClass('ModalWrapper_box_close', null, text);
	DarkenByClass('Article_description', null, text);
	DarkenByClass('Product-price_current', null, text);
}


function DarkenById(id, background = null, text = null){
	let element = document.getElementById(id);
	if(!element) return;
	if(background != null) element.style.background = background;
	if(text != null) element.style.color = text;
}

function DarkenByClass(id, background = null, text = null, skipFirst = false){
	let elements = document.getElementsByClassName(id);
	if(!elements) return;
	Array.from(elements).forEach((element, i) => {
		if(i == 0){
			if(!skipFirst){
				if(background != null) element.style.background = background;
				if(text != null) element.style.color = text;
			}
		}else{
			if(background != null) element.style.background = background;
			if(text != null) element.style.color = text;
		}
	});
}

function DarkenByClassWithChildren(id, background = null, text = null){
	let elements = document.getElementsByClassName(id);
	if(!elements) return;
	Array.from(elements).forEach((element) => {
		Array.from(element.children).forEach((child) => {
			let tag = child.tagName;
			if(tag == "H3" || tag == "H2" || tag == "P"){
				if(background != null) child.style.background = background;
				if(text != null) child.style.webkitTextFillColor = text;
			}
		});
	});
}

function DarkenByClassWebkit(id, background = null, text = null, skipFirst = false){
	let elements = document.getElementsByClassName(id);
	if(!elements) return;
	Array.from(elements).forEach((element, i) => {
		if(i == 0){
			if(!skipFirst){
				if(background != null) element.style.background = background;
				if(text != null) element.style.webkitTextFillColor = text;
			}
		}else{
			if(background != null) element.style.background = background;
			if(text != null) element.style.webkitTextFillColor = text;
		}
	});
}
