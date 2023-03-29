/**
 * --------------------------------------------
 * AdminLTE treeview.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady,
  slideDown,
  slideUp
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

// const NAME = 'Treeview'
const DATA_KEY = 'lte.treeview'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`
// const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`

const CLASS_NAME_MENU_OPEN = 'menu-open'
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_TREEVIEW_MENU = '.nav-treeview'
const SELECTOR_DATA_TOGGLE = '[data-lte-toggle="treeview"]'
const SELECTOR_MENU_NAV_ITEM = '[data-lte-toggle="treeview"] li.nav-item'

const STORAGE_KEY_SIDEBAR_MENUITEM_STATE = 'lte.sidebar.menuitem.state'

const Default = {
  animationSpeed: 300
}

type Config = {
  animationSpeed: number;
}

/**
 * Class Definition
 * ====================================================
 */

class Treeview {
  static saveMenuItemState(): void {
    const menuItems = Array.from(document.querySelectorAll(SELECTOR_MENU_NAV_ITEM))
    const menuItemState = new Map<number, string>()

    for (const [idx, item] of menuItems.entries()) {
      const menuItem = item as HTMLElement
      let menuState = 'menu-closed'

      if (menuItem.classList.contains(CLASS_NAME_MENU_OPEN)) {
        menuState = CLASS_NAME_MENU_OPEN
      }

      menuItemState.set(idx, menuState)
    }

    const jsonMenuItemState = JSON.stringify(Array.from(menuItemState))
    localStorage.setItem(STORAGE_KEY_SIDEBAR_MENUITEM_STATE, jsonMenuItemState)
  }

  static loadMenuItemState(): void {
    const openMenuItems = Array.from(document.querySelectorAll(SELECTOR_MENU_NAV_ITEM))
    let menuItemState = new Map<number, string>()

    const storedMenuItemState = localStorage.getItem(STORAGE_KEY_SIDEBAR_MENUITEM_STATE)
    if (storedMenuItemState) {
      menuItemState = new Map(JSON.parse(storedMenuItemState) as Map<number, string>)
    } else {
      Treeview.saveMenuItemState()
    }

    if (openMenuItems.length === menuItemState.size) {
      for (const [idx, item] of openMenuItems.entries()) {
        const menuItem = item as HTMLElement
        const menuState = menuItemState.get(idx)

        if (menuState === CLASS_NAME_MENU_OPEN) {
          menuItem.classList.add(CLASS_NAME_MENU_OPEN)

          const navTreeview = menuItem.querySelector(SELECTOR_TREEVIEW_MENU)!
          if (navTreeview instanceof HTMLElement) {
            navTreeview.style.display = 'block'
            navTreeview.style.boxSizing = 'border-box'
          }
        }
      }
    } else {
      localStorage.removeItem(STORAGE_KEY_SIDEBAR_MENUITEM_STATE)
    }
  }

  _element: HTMLElement
  _config: Config
  _childNavItem: HTMLElement | undefined

  constructor(element: HTMLElement, config: Config) {
    this._element = element
    this._config = { ...Default, ...config }
    this._childNavItem = this._element.querySelector(SELECTOR_TREEVIEW_MENU) as HTMLElement | undefined
  }

  open(): void {
    const event = new Event(EVENT_EXPANDED)

    this._element.classList.add(CLASS_NAME_MENU_OPEN)

    if (this._childNavItem) {
      slideDown(this._childNavItem, this._config.animationSpeed)
    }

    this._element.dispatchEvent(event)
  }

  close(): void {
    const event = new Event(EVENT_COLLAPSED)

    this._element.classList.remove(CLASS_NAME_MENU_OPEN)

    if (this._childNavItem) {
      slideUp(this._childNavItem, this._config.animationSpeed)
    }

    this._element.dispatchEvent(event)
  }

  toggle(): void {
    if (this._element.classList.contains(CLASS_NAME_MENU_OPEN)) {
      this.close()
      Treeview.saveMenuItemState()
    } else {
      this.open()
      Treeview.saveMenuItemState()
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

domReady(() => {
  // Load the saved state and apply to the treeview when the document is ready
  Treeview.loadMenuItemState()

  const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE)

  button.forEach(btn => {
    btn.addEventListener('click', event => {
      const target = event.target as HTMLElement
      const targetItem = target.closest(SELECTOR_NAV_ITEM) as HTMLElement | undefined

      if (targetItem) {
        const data = new Treeview(targetItem, Default)
        data.toggle()
      }
    })
  })
})

export default Treeview
