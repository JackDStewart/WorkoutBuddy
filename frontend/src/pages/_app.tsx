// pages/_app.tsx
import { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

function MyApp({ Component, pageProps }: AppProps) {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string;

  return (
    <UserProvider>
      {/* <Auth0Provider domain={domain} clientId={clientId}> */}
      <Component {...pageProps} />
      {/* </Auth0Provider> */}
    </UserProvider>
  );
}

export default MyApp;
