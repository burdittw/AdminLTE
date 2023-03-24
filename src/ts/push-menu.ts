/**
 * --------------------------------------------
 * AdminLTE push-menu.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const DATA_KEY = 'lte.push-menu'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_OPEN = `open${EVENT_KEY}`
const EVENT_COLLAPSE = `collapse${EVENT_KEY}`

const CLASS_NAME_SIDEBAR_MINI = 'sidebar-mini'
const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse'
const CLASS_NAME_SIDEBAR_OPEN = 'sidebar-open'
const CLASS_NAME_SIDEBAR_IS_HOVER = 'sidebar-is-hover'
const CLASS_NAME_SIDEBAR_EXPAND = 'sidebar-expand'
const CLASS_NAME_SIDEBAR_OVERLAY = 'sidebar-overlay'
const CLASS_NAME_MENU_OPEN = 'menu-open'

const SELECTOR_SIDEBAR_WRAPPER = '.sidebar-wrapper'
const SELECTOR_SIDEBAR_MENU = '.sidebar-menu'
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_NAV_TREEVIEW = '.nav-treeview'
const SELECTOR_APP_WRAPPER = '.app-wrapper'
const SELECTOR_SIDEBAR_EXPAND = `[class*="${CLASS_NAME_SIDEBAR_EXPAND}"]`
const SELECTOR_SIDEBAR_TOGGLE = '[data-lte-toggle="sidebar"]'

const STORAGE_KEY_SIDEBAR_STATE = 'lte.sidebar.state'

type Config = {
  sidebarBreakpoint: number;
}

const Defaults = {
  sidebarBreakpoint: 992
}

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  _element: HTMLElement
  _config: Config

  constructor(element: HTMLElement, config: Config) {
    this._element = element
    this._config = { ...Defaults, ...config }
  }

  // TODO
  menusClose() {
    const navTreeview = document.querySelectorAll<HTMLElement>(SELECTOR_NAV_TREEVIEW)

    for (const navTree of navTreeview) {
      navTree.style.removeProperty('display')
      navTree.style.removeProperty('height')
    }

    const navSidebar = document.querySelector(SELECTOR_SIDEBAR_MENU)
    const navItem = navSidebar?.querySelectorAll(SELECTOR_NAV_ITEM)

    if (navItem) {
      for (const navI of navItem) {
        navI.classList.remove(CLASS_NAME_MENU_OPEN)
      }
    }
  }

  expand() {
    const event = new Event(EVENT_OPEN)

    document.body.classList.remove(CLASS_NAME_SIDEBAR_COLLAPSE)
    document.body.classList.add(CLASS_NAME_SIDEBAR_OPEN)

    this._element.dispatchEvent(event)
  }

  collapse() {
    const event = new Event(EVENT_COLLAPSE)

    document.body.classList.remove(CLASS_NAME_SIDEBAR_OPEN)
    document.body.classList.add(CLASS_NAME_SIDEBAR_COLLAPSE)

    this._element.dispatchEvent(event)
  }

  sidebarHover() {
    const selSidebar = document.querySelector(SELECTOR_SIDEBAR_WRAPPER)

    if (selSidebar) {
      selSidebar.addEventListener('mouseover', () => {
        document.body.classList.add(CLASS_NAME_SIDEBAR_IS_HOVER)
      })

      selSidebar.addEventListener('mouseout', () => {
        document.body.classList.remove(CLASS_NAME_SIDEBAR_IS_HOVER)
      })
    }
  }

  addSidebarBreakPoint() {
    const sidebarExpandList = document.querySelector(SELECTOR_SIDEBAR_EXPAND)?.classList ?? []
    const sidebarExpand = [...sidebarExpandList].find(className => className.startsWith(CLASS_NAME_SIDEBAR_EXPAND)) ?? ''
    const sidebar = document.getElementsByClassName(sidebarExpand)[0]
    const sidebarContent = window.getComputedStyle(sidebar, '::before').getPropertyValue('content')
    this._config = { ...this._config, sidebarBreakpoint: Number(sidebarContent.replace(/[^\d.-]/g, '')) }

    if (window.innerWidth <= this._config.sidebarBreakpoint) {
      this.collapse()
    } else {
      if (!document.body.classList.contains(CLASS_NAME_SIDEBAR_MINI)) {
        this.expand()
      }

      if (document.body.classList.contains(CLASS_NAME_SIDEBAR_MINI)) {
        this.collapse()
      }
    }
  }

  saveSidebarState() {
    if (document.body.classList.contains(CLASS_NAME_SIDEBAR_OPEN)) {
      localStorage.setItem(STORAGE_KEY_SIDEBAR_STATE, CLASS_NAME_SIDEBAR_OPEN)
    } else {
      localStorage.setItem(STORAGE_KEY_SIDEBAR_STATE, CLASS_NAME_SIDEBAR_COLLAPSE)
    }
  }

  loadSidebarState() {
    let storedSidebarState = localStorage.getItem(STORAGE_KEY_SIDEBAR_STATE)

    if (storedSidebarState === null) {
      storedSidebarState = CLASS_NAME_SIDEBAR_OPEN
    }

    if (storedSidebarState === CLASS_NAME_SIDEBAR_COLLAPSE) {
      this.collapse()
    } else {
      this.expand()
    }
  }

  toggle() {
    if (document.body.classList.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
      this.expand()
      this.saveSidebarState()
    } else {
      this.collapse()
      this.saveSidebarState()
    }
  }

  init() {
    this.addSidebarBreakPoint()
    this.sidebarHover()
    this.loadSidebarState()
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

domReady(() => {
  const data = new PushMenu(document.body, Defaults)
  data.init()

  window.addEventListener('resize', () => {
    data.init()
  })

  const sidebarOverlay = document.createElement('div')
  sidebarOverlay.className = CLASS_NAME_SIDEBAR_OVERLAY
  document.querySelector(SELECTOR_APP_WRAPPER)?.append(sidebarOverlay)

  sidebarOverlay.addEventListener('touchstart', event => {
    event.preventDefault()
    const target = event.currentTarget as HTMLElement
    const data = new PushMenu(target, Defaults)
    data.collapse()
  })
  sidebarOverlay.addEventListener('click', event => {
    event.preventDefault()
    const target = event.currentTarget as HTMLElement
    const data = new PushMenu(target, Defaults)
    data.collapse()
  })

  const fullBtn = document.querySelectorAll(SELECTOR_SIDEBAR_TOGGLE)

  for (const btn of fullBtn) {
    btn.addEventListener('click', event => {
      event.preventDefault()

      let button = event.currentTarget as HTMLElement | undefined

      if (button?.dataset.lteToggle !== 'sidebar') {
        button = button?.closest(SELECTOR_SIDEBAR_TOGGLE) as HTMLElement | undefined
      }

      if (button) {
        event?.preventDefault()
        const data = new PushMenu(button, Defaults)
        data.toggle()
      }
    })
  }
})

export default PushMenu

