import { getRelativeLocaleUrl } from 'astro:i18n';
import { ui, defaultLang, routes } from './ui';

const { VITE_TARGET } = import.meta.env

const hasDynamicPath = path => path.split('/').some(el => el.startsWith('['))

export function useTranslations(lang: any) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key] || key;
  }
}

export function getLocaleRoute(lang: string, routeName : string = '', params = {}) {

  if(!hasDynamicPath(routeName)){
    const _lang = VITE_TARGET == 'preview' ? 'en' : lang
    return routes[routeName] && routes[routeName][lang] ? getRelativeLocaleUrl(lang, routes[routeName][_lang]) : ''
  } else {
    const map = {}
    routeName.split('/').filter(part => part.startsWith('[')).map(part => { map[part] = '' })
    for (const key of Object.keys(params)) {
      if (map.hasOwnProperty(`[${key}]`)) {
        map[`[${key}]`] = params[key]
      }
    }
    
    const translatedPath = routes[routeName][lang].split('/').map(part => {
      if(part.startsWith('[')) {
        part = map[part]
      }
      return part
    }).join('/')
    // const r = routes[routeName] && routes[routeName][lang] ? getRelativeLocaleUrl(lang, translatedPath) : ''
    return routes[routeName] && routes[routeName][lang] ? getRelativeLocaleUrl(lang, translatedPath) : ''
  }
}