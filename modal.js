function ModalX(el, opts) {
	//classes
	const classOpen = `modal--open`
	const classMain = 'modal--content'
	const classActive = "active"
	const ElNotPoint = el.replace(".", "")
	const deep = document.createElement('div')

	const options = {
		...opts
		//deep: true,
		// zIndex: 300000,
		// zIndexDeep:900
		// closeOnSwipe: true,
		// observer: true,
		// bgMOdal : white
	}

	//els
	const body = document.body
	const elModal = document.querySelector(el);
	const items = elModal.querySelectorAll(`.${classMain}`)

	const state = { //STATE
		open: false,
		id_active: ""
	}

	const changeIDActive = (id) => {
		state.id_active = id

	}

	function createElementAndAppend(el, src, type = "text/javascript",) {  // UTILITY
		const script = document.createElement(el)
		script.type = type
		script.src = src
		document.body.appendChild(script)
	}


	function createDeep() { // FUNDO
		if (options.deep) {
			document.body.appendChild(deep)
			deep.classList.add(`${ElNotPoint}--deep`)
			deep.addEventListener('click', closeModal)
			return this
		}

	}


	function openModal(item) { //OPEN
		const elemento = typeof item === "object"
		const id = elemento ? item.dataset.id : item
		changeIDActive(id)

		const actualSectionActive = elModal.querySelector(`section[data-id="${state.id_active}"]`)

		elModal.classList.add(classActive)
		deep.classList.add(classActive)
		body.classList.add(`${classOpen}-${ElNotPoint}`)

		items && items.forEach(i => i.classList.remove(classActive))
		actualSectionActive && actualSectionActive.classList.add(classActive)
		state.id_active = id
		elModal.dataset.active = state.id_active
		state.open = true

		return this
	}



	function closeModal() { // CLOSE
		changeIDActive("")

		body.classList.remove(`${classOpen}-${ElNotPoint}`)

		items && items.forEach(i => i.classList.remove(classActive))
		elModal.classList.remove(classActive)
		deep.classList.remove(classActive)

		state.id_active = ''
		elModal.dataset.active = state.id_active
		state.open = false
		
		return this
	}


	function toggleModal(target) { // TOGGLE
		state.open ? closeModal() : openModal(target)
		return this
	}

	function dataOpenEClose() { //DATA-ATRIBUTE
		const dataOpen = document.querySelectorAll(`[data-xopen="${ElNotPoint}"]`)
		const dataClose = document.querySelectorAll(`[data-xclose="${ElNotPoint}"]`)
		const dataToggle = document.querySelectorAll(`[data-xtoggle="${ElNotPoint}"]`)

		dataOpen.forEach(i => i.addEventListener('click', () => openModal(i)))
		dataClose.forEach(i => i.addEventListener('click', () => closeModal()))
		dataToggle.forEach(i => i.addEventListener('click', () => toggleModal(i)))
	}

	async function hammerFeature() { // HAMMER
		if (options.closeOnSwipe) {

			const hammerLink = "https://hammerjs.github.io/dist/hammer.min.js"
			const temHammer = Array.from(document.scripts).filter(e => e.src === hammerLink).length === 1
			if (temHammer) { return }

			// if (Hammer) return
			const lado = () => {
				const l = elModal.dataset.position
				if (l === "bottom")
					return "down"
				else if (l === "top")
					return "up"
				else
					return l
			}


			createElementAndAppend("script", hammerLink)

			await new Promise(resolve => {
				const interval = setInterval(() => {
					if (!window.Hammer) { return }
					else {
						clearInterval(interval)
						resolve()
					}

				}, 50);

			})

			const hammerEl = await new Hammer(elModal)

			hammerEl.on(`swipe${lado()}`, () => closeModal())
		}


	}

	function addStyles() { //STYLES
		options.zIndex ? elModal.style.setProperty('--zindex-modal', options.zIndex) : ""
		options.bgModal ? elModal.style.setProperty('--bg-modal', options.bgModal) : ""
		options.zIndexDeep ? deep.style.setProperty('--zindex-deep', options.zIndexDeep) : ""
	}

	function ObserverModal() { // OBSERVER
		if (options.observer) {
			const observer = new MutationObserver(mutations => {
				console.log(mutations)
				mutations.forEach(mutation => {
					if (mutation.type == "attributes") {
						// if (mutation.target.dataset.active) { }
					}

				})
			})

			observer.observe(elModal, {
				attributes: true,
				// attributeFilter: ['data-active']
			})
		}
	}


	function init() {
		dataOpenEClose()
		createDeep()
		hammerFeature()
		addStyles()
		ObserverModal()
		return this
	}

	return {
		elModal,
		state,
		openModal,
		closeModal,
		toggleModal,
		init
	}


}

