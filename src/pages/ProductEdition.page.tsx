import { useLocation } from "react-router-dom"
import { ProductForm } from "../components/ProductForm.component";


export const ProductEdition = () => {

  const id = useLocation().pathname.split("/")[3];

  return(
    <ProductForm productId={id}/>
  )
}