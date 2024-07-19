import { AppProps } from "next/app";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ToastContainer } from "react-toastify";
import "../shared/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../shared/context/AuthProvider/AuthProvider";
import { AuthStateChange } from "../shared/components/Common";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthStateChange>
        <GoogleAnalytics trackPageViews />
        <Component {...pageProps} />
        <ToastContainer />
      </AuthStateChange>
    </AuthProvider>
  );
}

export default MyApp;
