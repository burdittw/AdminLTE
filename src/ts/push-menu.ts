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

const STORAGE_KEY_SIDEBAR_STATE = "lte.sidebar.state"

const CLASS_NAME_SIDEBAR = 'sidebar'
const CLASS_NAME_COLLAPSED = 'collapsed'
const CLASS_NAME_MINI_SIDEBAR = 'mini-sidebar'
const CLASS_NAME_SIDEBAR_MINI_HOVER = 'sidebar-is-hover'

const EVENT_NAME_CLICK = 'click'
const EVENT_NAME_TRANSITIONED = 'transitionend'

const SELECTOR_SIDEBAR = '.sidebar'
const SELECTOR_SIDEBAR_CONTENT = '.sidebar-content'
const SELECTOR_FULL_TOGGLE = '[data-lte-toggle="sidebar-full"]'
const SELECTOR_MINI_TOGGLE = '[data-lte-toggle="sidebar-mini"]'

enum RememberState {
  Open = 'Open',
  Collapsed = 'Collapsed',
  Mini = 'Mini'
}

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {

  configreFullButtonEvents(): void {
    const sideBar = document.getElementsByClassName(CLASS_NAME_SIDEBAR)[0]
    const fullBtn = document.querySelector(SELECTOR_FULL_TOGGLE)

    if (sideBar && fullBtn) {
      fullBtn.addEventListener(EVENT_NAME_CLICK, event => {
        event.preventDefault()
        sideBar.classList.toggle(CLASS_NAME_COLLAPSED)
        this.sidebarSaveState()

        sideBar.addEventListener(EVENT_NAME_TRANSITIONED, () => {
          window.dispatchEvent(new Event("resize"))
          this.sidebarSaveState();
        })
      })
    }
  }

  configureMiniButtonEvents(): void {
    const sideBar = document.getElementsByClassName(CLASS_NAME_SIDEBAR)[0]
    const miniBtn = document.querySelector(SELECTOR_MINI_TOGGLE)
    
    if (sideBar && miniBtn) {
      miniBtn?.addEventListener(EVENT_NAME_CLICK, event => {
        event.preventDefault()
        sideBar.classList.toggle(CLASS_NAME_MINI_SIDEBAR)
        this.sidebarSaveState()

        sideBar.addEventListener(EVENT_NAME_TRANSITIONED, () => {
          window.dispatchEvent(new Event("resize"))
          this.sidebarSaveState()
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

  sidebarSaveState(): void {
    const sideBar = document.querySelector(SELECTOR_SIDEBAR)
    
    if(sideBar?.classList.contains(CLASS_NAME_COLLAPSED))
    {
      localStorage.setItem(STORAGE_KEY_SIDEBAR_STATE, RememberState.Collapsed)
    }
    else if (sideBar?.classList.contains(CLASS_NAME_MINI_SIDEBAR) && !sideBar.classList.contains(CLASS_NAME_COLLAPSED))
    {
      localStorage.setItem(STORAGE_KEY_SIDEBAR_STATE, RememberState.Mini)
    }        
    else 
    {
      localStorage.setItem(STORAGE_KEY_SIDEBAR_STATE, RememberState.Open)
    }
  }

  sidebarLoadSavedState(): void {
    const storedSidebarState = localStorage.getItem(STORAGE_KEY_SIDEBAR_STATE)
    const sideBar = document.querySelector(SELECTOR_SIDEBAR)

    const getSavedState = () => {
      if (storedSidebarState) {
        return storedSidebarState
      }
      return RememberState.Open
    }

    const setSidebarState = function (sidebarState: any) {
      switch(sidebarState) {
        case RememberState.Collapsed:
          sideBar?.classList.add(CLASS_NAME_COLLAPSED)
          break
        case RememberState.Mini:
          sideBar?.classList.add(CLASS_NAME_MINI_SIDEBAR)
      }      
    }
    
    setSidebarState(getSavedState())
  }

  init() {
    this.configreFullButtonEvents()
    this.configureMiniButtonEvents()
    this.sidebarHover()
    this.sidebarLoadSavedState()
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