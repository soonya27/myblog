
# React Query 예시


```console
  yarn add @tanstack/react-query

```



### 📁src >App.js   (React Query 감싸주는곳)

```js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <Footer />
        </QueryClientProvider>
  );
}

export default App;
```


### 📁src > 컴포넌트.jsx   (네트워크 통신(사용) 하는곳)
```jsx
    const {
        isLoading,
        error,
        data: products
    } = useQuery({
        queryKey: ['products', uid || ''],  // query key, 두번째 다른 키도 가능,  {type : 'done'}과 같이 두번쨰 배열로 객체값도 가능
        queryFn: async () => getProduct(uid),  //네트워크에서 받아오는 값은 await(async)를 이용해서 값을 바로 받아오던지, promise형태로 값을 return 해야함
        staleTime: 5000  //기본 cache 는 5min but 새로운 데이터는 stale 상태가됨. stale데이터는
        //창이 refocused 되거나, 새로고침, 다시 데이터 연결될떄 refetche됨
    })

    return (
       {products &&
          <ul>
              {products.map(product => (
                  <ProductCard key={product.id} product={product} />
              )
              )}
          </ul>
      }
    )
```

### 📁src > 컴포넌트.jsx   (네트워크 통신(사용) 하는곳)  예시2 - Fetch
```jsx
  const [checked, setChecked] = useState(false);
  const {
      isLoading,
      error,
      data: products
  } = useQuery({
      queryKey: ['products', checked], 
      queryFn: async () => fetch(`data/${checked ? 'sale_' : ''}products.json`)
      .then(res=> res.json())  //checked에 따라 다른 json파일 호출
  });


  return (
      {products &&
        <ul className={styles.productList}>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            )
            )}
        </ul>
    }
  )
```



# React Query Devtools


```console
  yarn add @tanstack/react-query-devtools

```

### 📁src >App.js   (Devtools 감싸주는곳)

```js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();

function App() {
  return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <Footer />
            {/* The rest of your application */}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
  );
}

export default App;
```





# React Query Invalidate (캐시 업데이트)

### 📁src >컴포넌트.jsx  

```jsx
  import { useMutation, useQueryClient } from '@tanstack/react-query';


    //query mutation(업로드후 바로 캐시 업데이트)
    const queryClient = useQueryClient();


    const handleBookmark = () => {
      //해당 키값의 캐시 업데이트  -> reFetching
      queryClient.invalidateQueries(['products']);
    }
```


# React Query mutation (캐시 업데이트)

### [mutation](https://tanstack.com/query/v4/docs/guides/mutations)

```jsx
  //react query mutation(업로드후 바로 캐시 업데이트)
  const queryClient = useQueryClient();
  const addProduct = useMutation(
      {
          mutationFn: ({ form, url }) => addNewProduct(form, { defaultImageUrl: url.defaultImageUrl, hoverImageUrl: url.hoverImageUrl }),  //mutation 함수
          mutationKey: ['products'],
          onSuccess: () => queryClient.invalidateQueries(['products']) //성공했을때
      }
  )


  //mutation 하는곳
  addProduct.mutate({
      form, url: { defaultImageUrl, hoverImageUrl }
  },
      {
          onSuccess: () => {
              console.log('성공적으로 추가');
          }
      })
```
 



# React Query Custom Hooks

### 📁src > hooks > useProducts.js
```jsx
  import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
  import { addBookmarkByUser, addNewProduct, getProduct, removeFromBookmark } from '../api/firebase';


  export default function useProducts(uid) {
      const queryClient = useQueryClient();

      const productQuery = useQuery({
          queryKey: ['products', uid || ''],
          queryFn: async () => getProduct(uid),
      });

      const addProduct = useMutation(
          {
              mutationFn: ({ form, url }) => addNewProduct(form, { defaultImageUrl: url.defaultImageUrl, hoverImageUrl: url.hoverImageUrl }),
              onSuccess: () => queryClient.invalidateQueries(['products', uid])
          }
      );

      const addBookmark = useMutation(
          {
              mutationFn: ({ isBookmark, product }) => {
                  return isBookmark ? removeFromBookmark(uid, product.id)
                      : addBookmarkByUser({ user: uid, product });
              },
              onSuccess: () => queryClient.invalidateQueries(['products', uid])
          }
      );


      return { productQuery, addProduct, addBookmark }
  }
```


### 📁src > 컴포넌트.jsx
```jsx
  import useCarts from '../../hooks/useCarts';


  //데이터 호출
  const { cartQuery: {
      isLoading,
      error,
      data: products
  } } = useCarts(uid);


  //아이템 삭제, 추가 시 invalidate
  const { addOrUpdateToItem, removeItem } = useCarts(uid);

  const handleChange = (e) => {
    addOrUpdateToItem.mutate({
        id, size: e.target.value, itemNum: option.itemNum, user: uid,
        product
    });
  }


 ```

