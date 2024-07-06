# Marinabot

WhatsApp Chatbot for E-commerce

This is a WhatsApp chatbot project that helps customers with their purchases on an e-commerce store. The chatbot uses a workflow gerated by a flow chart creator per connection. It integrates with the e-commerce store's API to provide a seamless customer experience.


![[marinabot]()](https://i.imgur.com/FgPbPGA.png)
    
  
 
## Features

    Responds to customer inquiries about products
    Recommends products based on customer preferences
    Provides product information and pricing
    Allows customers to make purchases directly from the chatbot
    Integrates with e-commerce store's API for seamless checkout
    
  
 
## Technologies Used

    Javascript
    Typescript
    Nuxt 3
    Nuxt UI PRO
    Supabase
    Eslint
    Pinia Store
    Iconify Library
    Zod Validation
    Laravel Reverb websocket
    NVM(Node Version Module)
      
 
## How it Works

    Customer initiates conversation with the chatbot on WhatsApp
    chatbot responds to customer inquiries using EVOLUTION API
    chatbot recommends products based on customer preferences by connection
    Customer selects product and marinabot flow that`s provides a product url link.
    soon Customer makes purchase directly from the chatbot
    chatbot integrates with e-commerce store's API for seamless checkout
    
  
 
## Setup

Step to setup project in your machine.
    
### node setup

Welcome to marinaBot, create a new branch and starting coding with us.

Skip this step if you already use node 21.
Install NVM by downloading the install script from their GitHub page. You can use curl or wget:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

#or

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Now, you can install a specific version of Node.js using NVM. For example, to install Node.js 21, you would use:

```bash
nvm install 21
```

You can switch between installed Node versions with:

```bash
nvm use <version>
```

### project setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Check out the [nuxt 3 documentation](https://nuxt.com/docs) and [nuxt UI](https://ui.nuxt.com/getting-started/) for more information.

## Utils Links

[iconify icons](https://icon-sets.iconify.design/)
[Tailwind css](https://tailwindcss.com/docs/)
[Animate Style css](https://animate.style/)

## Licence

[MIT](./LICENSE)
