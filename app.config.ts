export default defineAppConfig({
  ui: {
    primary: 'pink',
    gray: 'gray',
    color: 'gray',
    variant: 'ghost',
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
    buttonGroup: {
      wrapper: {
        horizontal: 'inline-flex -space-x-px',
        vertical: 'inline-flex flex-col -space-y-px',
      },
      rounded: 'rounded-md',
      shadow: 'shadow-sm',
      orientation: {
        'rounded-none': {
          horizontal: {
            start: 'rounded-s-none',
            end: 'rounded-e-none',
          },
          vertical: {
            start: 'rounded-t-none',
            end: 'rounded-b-none',
          },
        },
        'rounded-sm': {
          horizontal: {
            start: 'rounded-s-sm',
            end: 'rounded-e-sm',
          },
          vertical: {
            start: 'rounded-t-sm',
            end: 'rounded-b-sm',
          },
        },
        rounded: {
          horizontal: {
            start: 'rounded-s',
            end: 'rounded-e',
          },
          vertical: {
            start: 'rounded-t',
            end: 'rounded-b',
          },
        },
        'rounded-md': {
          horizontal: {
            start: 'rounded-s-md',
            end: 'rounded-e-md',
          },
          vertical: {
            start: 'rounded-t-md',
            end: 'rounded-b-md',
          },
        },
        'rounded-lg': {
          horizontal: {
            start: 'rounded-s-lg',
            end: 'rounded-e-lg',
          },
          vertical: {
            start: 'rounded-t-lg',
            end: 'rounded-b-lg',
          },
        },
        'rounded-xl': {
          horizontal: {
            start: 'rounded-s-xl',
            end: 'rounded-e-xl',
          },
          vertical: {
            start: 'rounded-t-xl',
            end: 'rounded-b-xl',
          },
        },
        'rounded-2xl': {
          horizontal: {
            start: 'rounded-s-2xl',
            end: 'rounded-e-2xl',
          },
          vertical: {
            start: 'rounded-t-2xl',
            end: 'rounded-b-2xl',
          },
        },
        'rounded-3xl': {
          horizontal: {
            start: 'rounded-s-3xl',
            end: 'rounded-e-3xl',
          },
          vertical: {
            start: 'rounded-t-3xl',
            end: 'rounded-b-3xl',
          },
        },
        'rounded-full': {
          horizontal: {
            start: 'rounded-s-full',
            end: 'rounded-e-full',
          },
          vertical: {
            start: 'rounded-t-full',
            end: 'rounded-b-full',
          },
        },
      },
    },
    input: {
      rounded: 'rounded',
    },
    header: {
      wrapper: 'lg:!border-transparent bg-gray-50 dark:bg-gray-950',
      links: {
        wrapper: 'ring-1 ring-gray-200 dark:ring-gray-800 px-3 gap-x-0 rounded-full',
        base: 'py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-gray-900 dark:after:bg-white after:transition-opacity',
        active: 'text-gray-900 dark:text-white after:opacity-100',
        inactive: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
      }
    },
    footer: {
      top: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
        container: 'py-8 lg:py-16'
      },
      bottom: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    },
    pricing: {
      card: {
        highlight: 'ring-gray-900 dark:ring-white',
        features: {
          item: {
            icon: {
              base: 'text-gray-900 dark:text-white'
            }
          }
        }
      }
    }
  }
})
