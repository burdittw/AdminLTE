(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.adminlte = {}));
})(this, (function (exports) { 'use strict';

    const domReady = (callBack) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callBack);
        }
        else {
            callBack();
        }
    };
    /* SLIDE UP */
    const slideUp = (target, duration = 500) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = `${duration}ms`;
        target.style.boxSizing = 'border-box';
        target.style.height = `${target.offsetHeight}px`;
        target.style.overflow = 'hidden';
        window.setTimeout(() => {
            target.style.height = '0';
            target.style.paddingTop = '0';
            target.style.paddingBottom = '0';
            target.style.marginTop = '0';
            target.style.marginBottom = '0';
        }, 1);
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    };
    /* SLIDE DOWN */
    const slideDown = (target, duration = 500) => {
        target.style.removeProperty('display');
        let { display } = window.getComputedStyle(target);
        if (display === 'none') {
            display = 'block';
        }
        target.style.display = display;
        const height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = '0';
        target.style.paddingTop = '0';
        target.style.paddingBottom = '0';
        target.style.marginTop = '0';
        target.style.marginBottom = '0';
        window.setTimeout(() => {
            target.style.boxSizing = 'border-box';
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = `${duration}ms`;
            target.style.height = `${height}px`;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
        }, 1);
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    };

    /**
     * --------------------------------------------
     * AdminLTE theme-toggle.ts
     * License MIT
     * --------------------------------------------
     */
    /**
    * ------------------------------------------------------------------------
    * Constants
    * ------------------------------------------------------------------------
    */
    const SELECTOR_DARK_TOGGLE = 'dark';
    const SELECTOR_LIGHT_TOGGLE = 'light';
    //const SELECTOR_AUTO_TOGGLE = 'auto'
    const SELECTOR_THEME_SWITCH = "toggleNightMode";
    const STORAGE_KEY_THEME = 'theme';
    const ARRAY_BROWSER_THEMES = ['light', 'dark'];
    /**
    * Class Definition
    * ====================================================
    */
    class ThemeToggle {
        init() {
            const storedTheme = localStorage.getItem(STORAGE_KEY_THEME);
            const switchTheme = document.getElementById(SELECTOR_THEME_SWITCH);
            const getPreferredTheme = () => {
                if (storedTheme) {
                    return storedTheme;
                }
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? SELECTOR_DARK_TOGGLE : SELECTOR_LIGHT_TOGGLE;
            };
            const setTheme = function (theme) {
                if (theme === window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', SELECTOR_DARK_TOGGLE);
                }
                else {
                    document.documentElement.setAttribute('data-theme', theme);
                }
                if (theme === SELECTOR_DARK_TOGGLE) {
                    switchTheme.checked = true;
                    //switchTheme.ariaChecked = 'true'
                }
                else {
                    switchTheme.checked = false;
                    //switchTheme.ariaChecked = 'false'
                }
            };
            setTheme(getPreferredTheme());
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (!ARRAY_BROWSER_THEMES.includes(storedTheme)) {
                    setTheme(getPreferredTheme());
                }
            });
            if (switchTheme) {
                switchTheme.addEventListener('change', function () {
                    if (switchTheme.checked) {
                        localStorage.setItem('theme', SELECTOR_DARK_TOGGLE);
                        setTheme(SELECTOR_DARK_TOGGLE);
                    }
                    else {
                        localStorage.setItem('theme', SELECTOR_LIGHT_TOGGLE);
                        setTheme(SELECTOR_LIGHT_TOGGLE);
                    }
                });
            }
            //showActiveTheme(theme)
        }
    }
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    domReady(() => {
        const data = new ThemeToggle();
        data.init();
    });

    /**
     * --------------------------------------------
     * AdminLTE push-menu.ts
     * License MIT
     * --------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    const CLASS_NAME_SIDEBAR = 'sidebar';
    const CLASS_NAME_SIDEBAR_MINI_HOVER = 'sidebar-is-hover';
    const SELECTOR_SIDEBAR = '.sidebar';
    const SELECTOR_SIDEBAR_CONTENT = '.sidebar-content';
    const SELECTOR_FULL_TOGGLE = '[data-lte-toggle="sidebar-full"]';
    const SELECTOR_MINI_TOGGLE = '[data-lte-toggle="sidebar-mini"]';
    /**
     * Class Definition
     * ====================================================
     */
    class PushMenu {
        configreFullButtonEvents() {
            const sideBar = document.getElementsByClassName(CLASS_NAME_SIDEBAR)[0];
            const fullBtn = document.querySelector(SELECTOR_FULL_TOGGLE);
            if (sideBar && fullBtn) {
                fullBtn.addEventListener("click", event => {
                    event.preventDefault();
                    sideBar.classList.toggle("collapsed");
                    sideBar.addEventListener("transitionend", () => {
                        window.dispatchEvent(new Event("resize"));
                    });
                });
            }
        }
        configureMiniButtonEvents() {
            const sideBar = document.getElementsByClassName(CLASS_NAME_SIDEBAR)[0];
            const miniBtn = document.querySelector(SELECTOR_MINI_TOGGLE);
            //const sideBarMini = document.getElementsByClassName(CLASS_NAME_SIDEBAR_MINI)[0];
            if (sideBar && miniBtn) {
                miniBtn === null || miniBtn === void 0 ? void 0 : miniBtn.addEventListener("click", event => {
                    event.preventDefault();
                    sideBar.classList.toggle("mini-collapsed");
                    sideBar.addEventListener("transitionend", () => {
                        window.dispatchEvent(new Event("resize"));
                    });
                });
            }
        }
        sidebarHover() {
            const sideBar = document.querySelector(SELECTOR_SIDEBAR);
            const sideBarContent = document.querySelector(SELECTOR_SIDEBAR_CONTENT);
            if (sideBar && sideBarContent) {
                sideBarContent.addEventListener('mouseover', () => {
                    sideBar.classList.add(CLASS_NAME_SIDEBAR_MINI_HOVER);
                });
                sideBarContent.addEventListener('mouseout', () => {
                    sideBar.classList.remove(CLASS_NAME_SIDEBAR_MINI_HOVER);
                });
            }
        }
        init() {
            this.configreFullButtonEvents();
            this.configureMiniButtonEvents();
            this.sidebarHover();
        }
    }
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    domReady(() => {
        const data = new PushMenu();
        data.init();
    });

    /**
     * --------------------------------------------
     * AdminLTE treeview.ts
     * License MIT
     * --------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    // const NAME = 'Treeview'
    const DATA_KEY = 'lte.treeview';
    const EVENT_KEY = `.${DATA_KEY}`;
    const EVENT_EXPANDED = `expanded${EVENT_KEY}`;
    const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`;
    // const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`
    const CLASS_NAME_MENU_OPEN = 'menu-open';
    const CLASS_NAME_MENU_IS_OPEN = 'menu-is-open';
    const SELECTOR_NAV_ITEM = '.nav-item';
    const SELECTOR_TREEVIEW_MENU = '.nav-treeview';
    const SELECTOR_DATA_TOGGLE$1 = '[data-lte-toggle="treeview"]';
    const Default$1 = {
        animationSpeed: 300
    };
    /**
     * Class Definition
     * ====================================================
     */
    class Treeview {
        constructor(element, config) {
            var _a, _b;
            this._element = element;
            this._config = { ...Default$1, ...config };
            this._navItem = (_a = this._element) === null || _a === void 0 ? void 0 : _a.closest(SELECTOR_NAV_ITEM);
            this._childNavItem = (_b = this._navItem) === null || _b === void 0 ? void 0 : _b.querySelector(SELECTOR_TREEVIEW_MENU);
        }
        open() {
            const event = new CustomEvent(EVENT_EXPANDED);
            if (this._navItem) {
                this._navItem.classList.add(CLASS_NAME_MENU_OPEN);
                this._navItem.classList.add(CLASS_NAME_MENU_IS_OPEN);
            }
            if (this._childNavItem) {
                slideDown(this._childNavItem, this._config.animationSpeed);
                this._element.dispatchEvent(event);
            }
        }
        close() {
            const event = new CustomEvent(EVENT_COLLAPSED);
            if (this._navItem) {
                this._navItem.classList.remove(CLASS_NAME_MENU_IS_OPEN);
                this._navItem.classList.remove(CLASS_NAME_MENU_OPEN);
            }
            if (this._childNavItem) {
                slideUp(this._childNavItem, this._config.animationSpeed);
                this._element.dispatchEvent(event);
            }
        }
        toggle() {
            var _a;
            if ((_a = this._navItem) === null || _a === void 0 ? void 0 : _a.classList.contains(CLASS_NAME_MENU_OPEN)) {
                this.close();
            }
            else {
                this.open();
            }
        }
    }
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    domReady(() => {
        const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE$1);
        for (const btn of button) {
            btn.addEventListener('click', event => {
                // event.preventDefault()
                const treeviewMenu = event.target;
                const data = new Treeview(treeviewMenu, Default$1);
                data.toggle();
            });
        }
    });

    /**
     * --------------------------------------------
     * AdminLTE direct-chat.ts
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const SELECTOR_DATA_TOGGLE = '[data-lte-toggle="chat-pane"]';
    const SELECTOR_DIRECT_CHAT = '.direct-chat';
    const CLASS_NAME_DIRECT_CHAT_OPEN = 'direct-chat-contacts-open';
    /**
     * Class Definition
     * ====================================================
     */
    class DirectChat {
        toggle(chatPane) {
            var _a;
            // chatPane
            (_a = chatPane.closest(SELECTOR_DIRECT_CHAT)) === null || _a === void 0 ? void 0 : _a.classList.toggle(CLASS_NAME_DIRECT_CHAT_OPEN);
        }
    }
    /**
     *
     * Data Api implementation
     * ====================================================
     */
    domReady(() => {
        const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE);
        for (const btn of button) {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const chatPane = event.target;
                const data = new DirectChat();
                data.toggle(chatPane);
            });
        }
    });

    /**
     * --------------------------------------------
     * AdminLTE card-widget.ts
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const CLASS_NAME_CARD = 'card';
    const CLASS_NAME_COLLAPSED = 'collapsed-card';
    const CLASS_NAME_COLLAPSING = 'collapsing-card';
    const CLASS_NAME_EXPANDING = 'expanding-card';
    const CLASS_NAME_WAS_COLLAPSED = 'was-collapsed';
    const CLASS_NAME_MAXIMIZED = 'maximized-card';
    const SELECTOR_DATA_REMOVE = '[data-lte-dismiss="card-remove"]';
    const SELECTOR_DATA_COLLAPSE = '[data-lte-toggle="card-collapse"]';
    const SELECTOR_DATA_MAXIMIZE = '[data-lte-toggle="card-maximize"]';
    const SELECTOR_CARD = `.${CLASS_NAME_CARD}`;
    const SELECTOR_CARD_HEADER = '.card-header';
    const SELECTOR_CARD_BODY = '.card-body';
    const SELECTOR_CARD_FOOTER = '.card-footer';
    const Default = {
        animationSpeed: 500,
        collapseTrigger: SELECTOR_DATA_COLLAPSE,
        removeTrigger: SELECTOR_DATA_REMOVE,
        maximizeTrigger: SELECTOR_DATA_MAXIMIZE,
        collapseIcon: 'fa-minus',
        expandIcon: 'fa-plus',
        maximizeIcon: 'fa-expand',
        minimizeIcon: 'fa-compress'
    };
    class CardWidget {
        constructor(element, config) {
            this._element = element;
            this._parent = element.closest(SELECTOR_CARD);
            if (element.classList.contains(CLASS_NAME_CARD)) {
                this._parent = element;
            }
            this._config = { ...Default, ...config };
        }
        collapse() {
            var _a, _b;
            if (this._parent) {
                this._parent.classList.add(CLASS_NAME_COLLAPSING);
                const elm = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`${SELECTOR_CARD_BODY}, ${SELECTOR_CARD_FOOTER}`);
                if (elm !== undefined) {
                    for (const el of elm) {
                        if (el instanceof HTMLElement) {
                            slideUp(el, this._config.animationSpeed);
                        }
                    }
                }
                setTimeout(() => {
                    if (this._parent) {
                        this._parent.classList.add(CLASS_NAME_COLLAPSED);
                        this._parent.classList.remove(CLASS_NAME_COLLAPSING);
                    }
                }, this._config.animationSpeed);
            }
            const icon = (_b = this._parent) === null || _b === void 0 ? void 0 : _b.querySelector(`${SELECTOR_CARD_HEADER} ${this._config.collapseTrigger} .${this._config.collapseIcon}`);
            if (icon) {
                icon.classList.remove(this._config.collapseIcon);
                icon.classList.add(this._config.expandIcon);
            }
        }
        expand() {
            var _a, _b;
            if (this._parent) {
                this._parent.classList.add(CLASS_NAME_EXPANDING);
                const elm = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`${SELECTOR_CARD_BODY}, ${SELECTOR_CARD_FOOTER}`);
                if (elm !== undefined) {
                    for (const el of elm) {
                        if (el instanceof HTMLElement) {
                            slideDown(el, this._config.animationSpeed);
                        }
                    }
                }
                setTimeout(() => {
                    if (this._parent) {
                        this._parent.classList.remove(CLASS_NAME_COLLAPSED);
                        this._parent.classList.remove(CLASS_NAME_EXPANDING);
                    }
                }, this._config.animationSpeed);
            }
            const icon = (_b = this._parent) === null || _b === void 0 ? void 0 : _b.querySelector(`${SELECTOR_CARD_HEADER} ${this._config.collapseTrigger} .${this._config.expandIcon}`);
            if (icon) {
                icon.classList.add(this._config.collapseIcon);
                icon.classList.remove(this._config.expandIcon);
            }
        }
        remove() {
            if (this._parent) {
                slideUp(this._parent, this._config.animationSpeed);
            }
        }
        toggle() {
            var _a;
            if ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.classList.contains(CLASS_NAME_COLLAPSED)) {
                this.expand();
                return;
            }
            this.collapse();
        }
        maximize() {
            if (this._parent) {
                const maxElm = this._parent.querySelector(`${this._config.maximizeTrigger} .${this._config.maximizeIcon}`);
                if (maxElm) {
                    maxElm.classList.add(this._config.minimizeIcon);
                    maxElm.classList.remove(this._config.maximizeIcon);
                }
                this._parent.style.height = `${this._parent.scrollHeight}px`;
                this._parent.style.width = `${this._parent.scrollWidth}px`;
                this._parent.style.transition = 'all .15s';
                setTimeout(() => {
                    const htmlTag = document.querySelector('html');
                    if (htmlTag) {
                        htmlTag.classList.add(CLASS_NAME_MAXIMIZED);
                    }
                    if (this._parent) {
                        this._parent.classList.add(CLASS_NAME_MAXIMIZED);
                        if (this._parent.classList.contains(CLASS_NAME_COLLAPSED)) {
                            this._parent.classList.add(CLASS_NAME_WAS_COLLAPSED);
                        }
                    }
                }, 150);
            }
        }
        minimize() {
            if (this._parent) {
                const minElm = this._parent.querySelector(`${this._config.maximizeTrigger} .${this._config.minimizeIcon}`);
                if (minElm) {
                    minElm.classList.add(this._config.maximizeIcon);
                    minElm.classList.remove(this._config.minimizeIcon);
                }
                this._parent.style.cssText = `height: ${this._parent.style.height} !important; width: ${this._parent.style.width} !important; transition: all .15s;`;
                setTimeout(() => {
                    var _a;
                    const htmlTag = document.querySelector('html');
                    if (htmlTag) {
                        htmlTag.classList.remove(CLASS_NAME_MAXIMIZED);
                    }
                    if (this._parent) {
                        this._parent.classList.remove(CLASS_NAME_MAXIMIZED);
                        if ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.classList.contains(CLASS_NAME_WAS_COLLAPSED)) {
                            this._parent.classList.remove(CLASS_NAME_WAS_COLLAPSED);
                        }
                    }
                }, 10);
            }
        }
        toggleMaximize() {
            var _a;
            if ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.classList.contains(CLASS_NAME_MAXIMIZED)) {
                this.minimize();
                return;
            }
            this.maximize();
        }
    }
    /**
     *
     * Data Api implementation
     * ====================================================
     */
    domReady(() => {
        const collapseBtn = document.querySelectorAll(SELECTOR_DATA_COLLAPSE);
        for (const btn of collapseBtn) {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const data = new CardWidget(target, Default);
                data.toggle();
            });
        }
        const removeBtn = document.querySelectorAll(SELECTOR_DATA_REMOVE);
        for (const btn of removeBtn) {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const data = new CardWidget(target, Default);
                data.remove();
            });
        }
        const maxBtn = document.querySelectorAll(SELECTOR_DATA_MAXIMIZE);
        for (const btn of maxBtn) {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const data = new CardWidget(target, Default);
                data.toggleMaximize();
            });
        }
    });

    exports.CardWidget = CardWidget;
    exports.DirectChat = DirectChat;
    exports.PushMenu = PushMenu;
    exports.ThemeToggle = ThemeToggle;
    exports.Treeview = Treeview;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=adminlte.js.map
