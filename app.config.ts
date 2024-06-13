export default defineAppConfig({
  ui: {
    primary: 'pink',
    gray: 'gray',
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
