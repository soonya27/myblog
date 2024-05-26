
# AuthContext 예시


### 📁src > AuthContext.jsx   (Context 정의)

```jsx
  import { createContext, useContext, useEffect, useState } from 'react';
  import { logout, onUserStateChange, login } from '../api/firebase';

  const AuthContext = createContext();

  export function AuthContextProvider({ children }) {
      const [user, setUser] = useState();

      useEffect(() => {
          onUserStateChange((user) => {
              setUser(user);
          });
      }, []);

      return <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout }}>
          {children}
      </AuthContext.Provider>
  }

  export function useAuthContent() {
      return useContext(AuthContext);
  }
```


### 📁src > App.js   (Context 감싸주는 곳)
```js
  function App() {
    return (
      <AuthContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </AuthContextProvider>
    );
  }
```



### 📁src > 컴포넌트.jsx   (Context 사용하는 곳)
```jsx
     const { user, uid, login, logout } = useAuthContent();
```

