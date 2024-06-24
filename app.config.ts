
export default defineAppConfig({
  ui: {
    primary: 'pink',
    accordion: {
      wrapper: 'w-full flex flex-col mt-10',
      container: 'w-full flex flex-col border rounded-lg mb-2 p-3',
      item: {
        base: '',
        size: 'text-sm',
        color: 'text-gray-500',
        padding: 'pt-1.5 pl-3',
        icon: 'ms-auto transform transition-transform duration-200',
      },
      transition: {
        enterActiveClass: 'overflow-hidden transition-[height] duration-200 ease-out',
        leaveActiveClass: 'overflow-hidden transition-[height] duration-200 ease-out',
      },
      default: {
        openIcon: 'i-heroicons-chevron-down-20-solid',
        closeIcon: '',
        class: 'mb-1.5 w-full',
        variant: 'ghost',
      },
    },
    icons: {
      dynamic: true
    },
    variables: {
      light: {
        background: 'var(--color-gray-50)'
      },
      dark: {
        background: 'var(--color-gray-950)'
      }
    },
    button: {
      rounded: 'rounded-full',
      default: {
        size: 'md',
        color: 'blue'
      }
    },
    input: {
      rounded: 'rounded',
    },
  }
})
