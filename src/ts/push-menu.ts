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

const CLASS_NAME_SIDEBAR = 'sidebar'
const CLASS_NAME_SIDEBAR_MINI_HOVER = 'sidebar-is-hover'

const SELECTOR_SIDEBAR = '.sidebar'
const SELECTOR_SIDEBAR_CONTENT = '.sidebar-content'
const SELECTOR_FULL_TOGGLE = '[data-lte-toggle="sidebar-full"]'
const SELECTOR_MINI_TOGGLE = '[data-lte-toggle="sidebar-mini"]'

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {

  configreFullButtonEvents(): void {
    const sideBar = document.getElementsByClassName(CLASS_NAME_SIDEBAR)[0]
    const fullBtn = document.querySelector(SELECTOR_FULL_TOGGLE)

    if (sideBar && fullBtn) {
      fullBtn.addEventListener("click", event => {
        event.preventDefault()
        sideBar.classList.toggle("collapsed")

        sideBar.addEventListener("transitionend", () => {
          window.dispatchEvent(new Event("resize"))
        })
      })
    }
  }

  configureMiniButtonEvents(): void {
    const sideBar = document.getElementsByClassName(CLASS_NAME_SIDEBAR)[0]
    const miniBtn = document.querySelector(SELECTOR_MINI_TOGGLE)
    //const sideBarMini = document.getElementsByClassName(CLASS_NAME_SIDEBAR_MINI)[0];

    if (sideBar && miniBtn) {
      miniBtn?.addEventListener("click", event => {
        event.preventDefault()
        sideBar.classList.toggle("mini-collapsed")

        sideBar.addEventListener("transitionend", () => {
          window.dispatchEvent(new Event("resize"))
        })
      })
    }
  }

  sidebarHover(): void {
    const sideBar = document.querySelector(SELECTOR_SIDEBAR)
    const sideBarContent = document.querySelector(SELECTOR_SIDEBAR_CONTENT)

    if (sideBar && sideBarContent) {
      sideBarContent.addEventListener('mouseover', () => {
        sideBar.classList.add(CLASS_NAME_SIDEBAR_MINI_HOVER)
      })

      sideBarContent.addEventListener('mouseout', () => {
        sideBar.classList.remove(CLASS_NAME_SIDEBAR_MINI_HOVER)
      })
    }
  }

  init() {
    this.configreFullButtonEvents()
    this.configureMiniButtonEvents()
    this.sidebarHover()
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

domReady(() => {
  const data = new PushMenu()
  data.init()
})

export default PushMenu