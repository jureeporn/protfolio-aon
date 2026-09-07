export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el) {
      // Set initial state
      el.style.opacity = '0'
      el.style.transform = 'translateY(40px)'
      el.style.transition = 'all 0.8s cubic-bezier(0.5, 0, 0, 1)'

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            observer.unobserve(el) // Only animate once
          }
        })
      }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Slightly earlier trigger
      })

      observer.observe(el)
    }
  })
})
