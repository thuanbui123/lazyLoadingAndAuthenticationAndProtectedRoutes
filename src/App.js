import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import Products from './components/Products';
import { Navbar } from './components/Navbar';
// import About from './components/About';
import FeaturedProducts from './components/FeaturedProducts';
// import { NewProducts } from './components/NewProducts';
import { NoMatch } from './components/NoMatch';
import { OrderSummary } from './components/OrderSummary';
import Profile from './components/Profile';
import { AuthProvider } from './components/auth';
import { Login } from './components/Login';
import { RequireAuth } from './components/RequireAuth';

const LazyAbout = React.lazy(() => import('./components/About'));
const LazyNewProducts = React.lazy(() => import('./components/NewProducts'));

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="order-summary" element={<OrderSummary />} />
                <Route path="products" element={<Products />}>
                    {/* Mặc định hiển thị trang featuredProducts khi truy cập vào route /products */}
                    <Route index element={<FeaturedProducts />} />
                    <Route path="featured" element={<FeaturedProducts />} />
                    <Route
                        path="new"
                        element={
                            <React.Suspense fallback="loading...">
                                <LazyNewProducts />
                            </React.Suspense>
                        }
                    />
                </Route>
                {/* <Route path="/about" element={<About />}></Route> */}
                <Route
                    path="about"
                    element={
                        <React.Suspense fallback="loading...">
                            <LazyAbout />
                        </React.Suspense>
                    }
                ></Route>
                <Route
                    path="profile"
                    element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    }
                />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
