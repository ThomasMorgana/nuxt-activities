<template>
  <NuxtLayout>
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-bold text-green-600">
          {{ error.statusCode }}
        </p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {{ getErrorMessage() }}
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          {{ error.message }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            class="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            @click="clearErrorAndRedirect()"
          >
            Go back to the activities</a>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup>
// Custom error page, because why not ?
const error = useError()

function clearErrorAndRedirect() {
  clearError({
    redirect: '/',
  })
}

function getErrorMessage() {
  switch (this.error.statusCode) {
    case 404: return 'Sorry, we couldn’t find the page you’re looking for.'
    case 500: return 'Sorry, we broke something'
    default: return 'Sorry, an unknown error occured'
  }
}
</script>
