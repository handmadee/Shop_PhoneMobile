import { FavoriteProductsProvider } from "./context/context";
import PhoneContextProvider from "./store/phone-context";
import AuthContextProvider from "./store/auth-context";
import Navigation from "./navigation/Navigation";
import { Provider } from 'react-redux'
import { store } from "./store/store";

export default function App() {
  return (
    <Provider store={store}> 
    <AuthContextProvider>
      <PhoneContextProvider>
        <FavoriteProductsProvider>
          <Navigation />
        </FavoriteProductsProvider>
      </PhoneContextProvider>
    </AuthContextProvider>
    </Provider>
  );
}

