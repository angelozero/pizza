## feature 01
- if you are getting this error `cb.apply is not a function` when you are trying to create a project using the command `npx create-next-app client-nextjs`, try this [solution](https://stackoverflow.com/questions/67315860/npm-err-cb-apply-is-not-a-function-elementary-os)
    - run the command in the terminal on root folder type
    ```
    npm install --global npm
    ```

- initial config

## feature 02
- add css SASS

## feature 03 
- context api ( armazenando o token do usuario na aplicacao )
- AuthContext
- 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

## feature 04 
- login / auth / cookie config

## feature 05
- create user registration + alerts ( react toastify )