# JWT Based Authentication | Next.JS Example

## **⚠️!!Warning!!⚠️**

This project is my first attempt to create an Authentication system from scratch. And it may contain security vulnerabilities. Please use it for educational purposes only. Do not use it in production. If you find any security vulnerabilities and you know how to fix them, please create a pull request. I'll be happy to learn from you.

## Introduction

This example shows how to use JWT based authentication in Next.js. The whole system is made from scratch, including the backend and frontend. Here is the list of technologies used in this example:

-   [Next.js](https://nextjs.org/) - A Modern React Framework for building websites.
-   [Supabase Postgres](https://supabase.com/) - The open source Firebase alternative. Used for storing user data.
-   [Drizzle ORM](https://orm.drizzle.team/) - A simple, type-safe and lightweight ORM for SQL databases.
-   [T3 ENV](https://env.t3.gg/) - A simple and secure way to manage environment variables in Next.js.
-   [ShadCN UI](https://ui.shadcn.com/) - A simple and beautiful UI library for React.
-   [jose](https://github.com/panva/jose) - A JavaScript implementation of the JSON Object Signing and Encryption (JOSE) for JWTs.
-   [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Optimized bcrypt in plain JavaScript with zero dependencies.
-   [Upstash Redis](https://upstash.com/) - A simple and fast Redis as a service.

## Features

-   **Authentication** - JWT based authentication system.
-   **Authorization** - Protect routes from unauthorized access.
-   **User Management** - Register, login, logout, and authorization based actions.
-   **Environment Variables** - Securely manage environment variables.

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/itsdrvgo/nextjs-jwt-auth-example.git
```

Then, install the dependencies:

```bash
cd nextjs-jwt-example

bun install
# or
npm install
```

After that, create a `.env.local` file in the root directory and copy the content from `.env.example` to it. Fill the environment variables with your own values.

To generate secret keys for JWT, enter REPL mode in Node.js / Bun:

```bash
# For Node.js
node
> require('crypto').randomBytes(64).toString('hex')

# For Bun
bun repl
> require('crypto').randomBytes(64).toString('hex')
```

Copy the generated secret keys to the `.env.local` file. You'll have slots for two secret keys, one for access tokens and one for refresh tokens. It's recommended to use different keys for both.

Now, you can start the development server:

```bash
bun run dev
# or
npm run dev
```

Open [localhost](http://localhost:3000) in your browser to see the application.

## Conclusion

This example is a simple demonstration of how to use JWT based authentication in Next.js. It's not production-ready and may contain security vulnerabilities. Please use it for educational purposes only. If you find any security vulnerabilities and you know how to fix them, please create a pull request. I'll be happy to learn from you.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Feedback

Feel free to send me feedback on [X](https://x.com/itsdrvgo) or file an issue. Feature requests are always welcome. If you wish to contribute, please take a quick look at the [CONTRIBUTING.md](CONTRIBUTING.md) file.

Join our Discord server [here](https://dsc.gg/drvgo)!

## Connect with me

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/itsdrvgo)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/itsdrvgo)
[![Twitch](https://img.shields.io/badge/Twitch-%239146FF.svg?logo=Twitch&logoColor=white)](https://twitch.tv/itsdrvgo)
[![X](https://img.shields.io/badge/X-%23000000.svg?logo=X&logoColor=white)](https://x.com/itsdrvgo)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://youtube.com/@itsdrvgodev)
