const getGTMProductData = (product) => {
  if(product?.ga4) {
    return Object.keys(product.ga4).length
      ? {
        'item_name': product?.ga4?.name,
        'item_category': product?.ga4?.category,
        'item_category2': product?.ga4?.category2,
        'item_category3': product?.ga4?.category3
      }
      : {}
  } else {
    const productPayload = {
      item_name: product.title
    }

    if (product?.areas?.nodes?.length) {
      product.areas.nodes.map((item) => {
        productPayload["item_category"] =
          `${item.slug.charAt(0).toUpperCase()}${item.slug.slice(1).replaceAll("-", " ")}`;
      });
    }
    
    if (product?.categories?.nodes?.length) {
      product.categories.nodes.map((item, index) => {
        productPayload[`item_category${index + 2}`] = item.name;
      });
    }
    
    return productPayload
  }
}

const getFileNameFromPath = (file) => {
  return file.split('\\').pop().split('/').pop()
}

const getFileExtension = (file) => {
  return file.split('.').pop()
}

const triggerEvent = (event = null) => {
  if(typeof window !== 'undefined' && window?.dataLayer && event) {
    window.dataLayer.push(event)
    //console.log('dataLayer push:', event)
  }
}

const attachEventListeners = () => {
  // Download
  const downloadEventTriggers = document.querySelectorAll('[gtm-event-download]')
  if(downloadEventTriggers.length) {
    downloadEventTriggers.forEach(element => {
      element.addEventListener('click', function() {
        let payload = element.getAttribute('gtm-event-download')
        if(payload) {
          triggerEvent(JSON.parse(payload))
        }
      })
    })
  }

  // Find reseller on product page
  const findResellerProductEventTriggers = document.querySelectorAll('[gtm-event-click-find-reseller]')
  if(findResellerProductEventTriggers.length) {
    findResellerProductEventTriggers.forEach(element => {
      element.addEventListener('click', function() {
        let payload = element.getAttribute('gtm-event-click-find-reseller')
        if(payload) {
          triggerEvent(JSON.parse(payload))
        }
      })
    })
  }

  // Configure product on product page
  const configureProductEventTriggers = document.querySelectorAll('[gtm-event-click-configuration]')
  if(configureProductEventTriggers.length) {
    configureProductEventTriggers.forEach(element => {
      element.addEventListener('click', function() {
        let payload = element.getAttribute('gtm-event-click-configuration')
        if(payload) {
          triggerEvent(JSON.parse(payload))
        }
      })
    })
  }

  // Product request info on product page
  const requestProductInfoEventTriggers = document.querySelectorAll('[gtm-event-request-info]')
  if(requestProductInfoEventTriggers.length) {
    requestProductInfoEventTriggers.forEach(element => {
      element.addEventListener('click', function() {
        let payload = element.getAttribute('gtm-event-request-info')
        if(payload) {
          triggerEvent(JSON.parse(payload))
        }
      })
    })
  }

  // Click email
  const clickEmailEventTriggers = document.querySelectorAll('[gtm-event-click-email]')
  if(clickEmailEventTriggers.length) {
    clickEmailEventTriggers.forEach(element => {
      element.addEventListener('click', function() {
        let payload = element.getAttribute('gtm-event-click-email')
        let href = element.getAttribute('href')
        let parsedPayload = JSON.parse(payload)
        parsedPayload.link_url = href.split(':').length ? href.split(':')[1] : href
        console.log(href, parsedPayload)
        if(parsedPayload) {
          triggerEvent(parsedPayload)
        }
      })
    })
  }

  // Click phone
  const clickPhoneEventTriggers = document.querySelectorAll('[gtm-event-click-phone]')
  if(clickPhoneEventTriggers.length) {
    clickPhoneEventTriggers.forEach(element => {
      element.addEventListener('click', function() {
        let payload = element.getAttribute('gtm-event-click-phone')
        let href = element.getAttribute('href')
        let parsedPayload = JSON.parse(payload)
        parsedPayload.link_url = href.split(':').length ? href.split(':')[1] : href
        console.log(href, parsedPayload)
        if(parsedPayload) {
          triggerEvent(parsedPayload)
        }
      })
    })
  }
}

export { getGTMProductData, getFileNameFromPath, getFileExtension, triggerEvent, attachEventListeners }