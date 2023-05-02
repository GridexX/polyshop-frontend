import React from "react";
import ApplicationBar from "./components/ApplicationBar.component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CatalogPage } from "./pages/Catalog.page";
import { ShoppingCartPage } from "./pages/ShoppingCart.page";
import { ProductDetailPage } from "./pages/ProductDetail.page";
import { OrdersPage } from "./pages/Orders.page";
import { Box } from "@mui/material";
import './App.css';
import { ProductEdition } from "./pages/ProductEdition.page";

function App() {
    return (
        <BrowserRouter>
            <ApplicationBar />
            <Box sx={{m:8}}>

            <Routes>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                {/* <Route path="/product/*" element={<ProductDetailPage />} /> */}
                <Route path="/cart" element={<ShoppingCartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/product/create" element={<ProductEdition />} />
                <Route path="/product/edit/:id" element={<ProductEdition />} />
            </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;
