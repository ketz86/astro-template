<template>
  <div class="">
  <span id="lang-trigger" class="" @click="toggle">{{ currentLocale }}</span>
  <div id="lang-panel" class="" v-show="show" >
      <template v-for="locale of availLangs">
        <div class="mr-4 mb-2" v-if="pathChains[locale].length > 0">
          <a 
            :href="pathChains[locale] != '/' ? 
            getRelativeLocaleUrl(locale, pathChains[locale].join('/')) :
            '/'+ locale"
            :class="[locale == currentLocale ? 'underline' : '']">
            {{languages[locale]}}
          </a> 
        </div>
      </template>
  </div>
</div>
</template>

<script setup>
  import { languages } from '@i18n/ui'
  import { getRelativeLocaleUrl } from 'astro:i18n'
  import { ref } from 'vue';
  const props = defineProps([ 'currentLocale', 'availLangs','pathChains' ])
  const show = ref(false)
  const toggle = () => {
    show.value = !show.value
  }

  const close = () => {
    if (!show.value) return
    show.value = false
  }
</script>