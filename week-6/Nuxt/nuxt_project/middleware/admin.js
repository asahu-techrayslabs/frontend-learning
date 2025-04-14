export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie('user')

  if (user.value.role !== 'admin') {
    // alert('you are not authorized to access this page')
    // return navigateTo('/')
   //show error
     throw showError({
      // 403 forbidden code
      statusCode:403,
      statusMessage:'You are not allowed to view this page !'
     })
  }
})
