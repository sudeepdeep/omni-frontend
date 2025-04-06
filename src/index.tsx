import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import Helmet from "./components/Helmet";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <ToastContainer />
    <Helmet
      appTitle="HOME | CIVIC REPORTS"
      favicon={
        "https://firebasestorage.googleapis.com/v0/b/woid-582b2.appspot.com/o/CIVIC.png?alt=media&token=3d887a22-c033-4ecb-8fc3-768fdac4f307"
      }
      description="Civic Reports is a dynamic news platform where users can log in, create, and share news stories across various categories, including Local, State, National, World, Business, Stocks, and Politics. Whether you're reporting breaking news, sharing insights, or keeping up with global trends, our platform empowers you to be part of the conversation. With seamless news posting, bookmarking features, and an interactive community, Civic Reports ensures that news is not just consumed but also contributed by the people. Stay informed, share your perspective, and engage with news that matters to you!"
    />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </>
);
