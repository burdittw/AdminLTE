/**
 * --------------------------------------------
 * AdminLTE main-header.ts
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

const DATA_SIDEBAR_POSITION = '[data-sidebar-position]'

const CLASS_NAME_HEADER_USER_MENU = 'user-menu'

class MainHeader {

    init() {
        const sidebarDataAttribute = document.querySelector(DATA_SIDEBAR_POSITION) as HTMLElement
        const sidebarPosition = sidebarDataAttribute.dataset.dataSidebarPosition
        const headerUserMenu = document.getElementsByClassName(CLASS_NAME_HEADER_USER_MENU)[0]

        if (sidebarPosition === 'right') {
            headerUserMenu.classList.add('dropdown-menu-right')
        }
    }
}

/**
* ------------------------------------------------------------------------
* Data Api implementation
* ------------------------------------------------------------------------
*/

domReady(() => {
    const data = new MainHeader()
    data.init()
})

export default MainHeader