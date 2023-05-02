import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { ProductForm } from "../components/ProductForm.component";


export const ProductEdition = () => {

  const id = useLocation().pathname.split("/")[3];
  // const [productId, setProductId] = useState<string|undefined>(undefined);

  // useEffect(() => {
  //   const setProduct = (id: string) => {
  //     setProductId(id);
  //   };
  //   console.log("Path"+path);
  //   if (path && path.length > 0) {
  //     const id = path.split("/")[3];
  //     console.log("Id"+id);
  //     setProduct(id);
  //   }
  // }, [path]);


  return(
    <ProductForm productId={id}/>
  )
}