import { styled } from "styled-components"
import Center from "./Center";
import ProductBox from "./ProductBox";
import ProductsGrid from "./ProductsGrid";

// const ProductsGrid = styled.div`
//     display:grid;
//     grid-template-columns: 1fr 1fr;
//     gap:20px;
//     @media screen and (min-width:768px){
//         grid-template-columns: 1fr 1fr 1fr 1fr;
//     }
// `;
const Title = styled.h2`
    margin:30px 0 20px;
    font-weight:normal;
    font-size:2rem;
`;
export default function AllProducts({products,wishedProducts}){
    return(
        <Center>
            <Title>All Products</Title>
            <ProductsGrid products={products} wishedProducts={wishedProducts}>
            {products?.length > 0 && products.map(product => (
                <ProductBox key={product._id} {...product}/>
            ))}
            </ProductsGrid>
        </Center>
    );
}