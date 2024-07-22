export default defineAppConfig({
  ui: {
    primary: 'blue',
    accordion: {
      wrapper: 'w-full flex flex-col mt-10',
      container: 'w-full flex flex-col border rounded-lg mb-2 p-3',
      item: {
        base: 'text-red-950',
        size: 'text-sm',
        color: 'text-red-500',
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
        color: 'blue',
        variant: 'solid'
      },
      color: {
        blue: {
          solid: 'bg-blue-950 text-white',
          outline: 'bg-gray-100 text-blue-950 font-bold'
        }
      }
    },
    input: {
      rounded: 'rounded-lg',
      color: {
        blue: {
          outline: 'text-blue-950 text-sm font-normal border border-solid border-gray-100 focus:border-transparent focus:ring-blue-950'
        }
      },
      default: {
        color: 'blue',
        variant: 'outline'
      },
    },
  }
})
