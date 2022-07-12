/**
 * --------------------------------------------
 * AdminLTE theme-toggle.ts
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

  const SELECTOR_DARK_TOGGLE = 'dark'
  const SELECTOR_LIGHT_TOGGLE = 'light'
  //const SELECTOR_AUTO_TOGGLE = 'auto'
  const SELECTOR_THEME_SWITCH = "toggleNightMode"

  const STORAGE_KEY_THEME = 'theme'
  const ARRAY_BROWSER_THEMES = ['light', 'dark']

  /**
 * Class Definition
 * ====================================================
 */

class ThemeToggle {

    init() {
        const storedTheme = localStorage.getItem(STORAGE_KEY_THEME)
        const switchTheme: any = document.getElementById(SELECTOR_THEME_SWITCH)
  
        const getPreferredTheme = () => {
          if (storedTheme) {
            return storedTheme
          }
      
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? SELECTOR_DARK_TOGGLE : SELECTOR_LIGHT_TOGGLE
        }
      
        const setTheme = function (theme: any) {
          if (theme === window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', SELECTOR_DARK_TOGGLE)
          } else {
            document.documentElement.setAttribute('data-theme', theme)
          }
          if(theme === SELECTOR_DARK_TOGGLE) {
            switchTheme.checked = true
            //switchTheme.ariaChecked = 'true'
          } else {
            switchTheme.checked = false
            //switchTheme.ariaChecked = 'false'
          }
        }
      
        setTheme(getPreferredTheme())
      
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          if (!ARRAY_BROWSER_THEMES.includes(storedTheme!)) {
            setTheme(getPreferredTheme())
          }
        })      
          
        if (switchTheme) {
            switchTheme.addEventListener('change', function() {
                if (switchTheme.checked) {
                    localStorage.setItem('theme', SELECTOR_DARK_TOGGLE)
                    setTheme(SELECTOR_DARK_TOGGLE)
                } else {
                    localStorage.setItem('theme', SELECTOR_LIGHT_TOGGLE)
                    setTheme(SELECTOR_LIGHT_TOGGLE)
                }
            })
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
    const data = new ThemeToggle()
    data.init()
  })
  
export default ThemeToggle
