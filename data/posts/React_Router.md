
# React Router Dom 예시


```console
 yarn add react-router-dom

```



### 📁src > index.js   (Router 정의)

```js
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import './reset.css';
  import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  import { RouterProvider, createBrowserRouter } from 'react-router-dom';
  import Main from './pages/Main/Main';
  import ErrorPage from './pages/ErrorPage/ErrorPage';
  import Products from './pages/Products/Products';
  import ProductDetail from './pages/ProductDetail/ProductDetail';
  import Cart from './pages/Cart/Cart';
  import ProtectedRoute from './pages/ProtectedRoute';
  import AddProduct from './pages/AddProduct/AddProduct';
  import Bookmark from './pages/Bookmark/Bookmark';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [   //outlet 으로 감싸는 부분
        {
          index: true,
          element: <Main />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:productId",
          element: <ProductDetail />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/bookmark",
          element: <ProtectedRoute>
            <Bookmark />
          </ProtectedRoute>,
        },
        {
          path: "/products/new",
          element: <ProtectedRoute requireAdmin>
            <AddProduct />
          </ProtectedRoute>, //redirect를 위해 component를 감싸서 체크해줌
        },
      ],
    }
  ]);


  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();

```


### 📁src > App.js   (감싸주는 곳, outlet)
```js
  function App() {
    return (
        <Header />
        <Outlet />
        <Footer />
    );
  }

  export default App;
```




## Router Hooks
```jsx
  import { useLocation, useNavigate } from 'react-router-dom';


  //param 객체 받기 useLocation
  const { state: { product, product: { category, defaultImageUrl, hoverImageUrl, title, price, id, descripct, options } } } = useLocation();

  //이동용 hooks
  const navigate = useNavigate();


  // url 이동
  const handleClick = (e) => {
      //param으로 객체 전달
      navigate(`/products/${id}`, { state: { product } });
  }
  const handleClick = (e) => {
    navigate(-1);
  }
```


