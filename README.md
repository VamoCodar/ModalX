# ModalX

Modal reutilizavel criado do zero


## Installation

link modal.js<br>
link modal.css<br>
optional, edit on modal.scss<br>

<hr>

## Structure
```html
<div class="modal" data-position="center">
	
	<section class="modal--content" data-id="1">
		<!-- your content -->
	</section>

    <section class="modal--content" data-id="2">
		<!-- your content -->
	</section>

</div>

```
## Data attribute
```html
<button data-id="1" data-xopen="modal">OPEN MODAL </button>
<button data-id="1" data-xclose="modal">CLOSE MODAL </button>
<button data-id="1" data-xtoggle="modal">TOGGLE MODAL </button>
```


## Setup
```js
ModalX('.modal').init()

// or pass reference 
const modal1 = ModalX('.modal') 

modal1.init()
```
## Options 

```js
// Options  with default
ModalX('.modal', {
    deep: false, 
	zIndex: 10000,
	zIndexDeep:900,
	closeOnSwipe: false, //Hammer.js for enable gestures
	observer: false, //create oberver in modal element
	bgModal : "white"

})
```

## Methods

```js
moddal1.openModal(),
modal1.closeModal(),
modal1.toggleModal(),
modal1.init()
```
## Props

```js
modal1.elModal //return modal element
modal1.state //return modal state
```

#### Thanks.