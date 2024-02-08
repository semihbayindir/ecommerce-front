import { styled } from "styled-components"
import Center from "./Center";
import ProductBox from "./ProductBox";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
    margin:30px 0 20px;
    font-weight:normal;
    font-size:2rem;
`;
export default function NewProducts({products,wishedProducts}){
    return(
            <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid products={products} wishedProducts={wishedProducts}/>
            </Center>
    );
}