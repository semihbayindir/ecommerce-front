import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import ReactLoading from 'react-loading';
import { useSession } from "next-auth/react";
import ProductsGrid from "@/components/ProductsGrid";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedModel";

const Title = styled.h2`
margin:30px 0 20px;
font-weight:normal;
font-size:2rem;
`;

export default function ProductsPage({wishedProducts,wishedNewProducts}){
    const [products,setProducts] = useState([]);
        useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data);
        }); 
    }, []);
    const {data:session} = useSession();
  if (!session) {
    return  <div style={{ backgroundColor: '#222', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ReactLoading type="bubbles" color="#007bff" height={100} width={100} />
  </div>;
    // Ürün yüklenene kadar bekleme ekranı göster
  }
    return(
        <>
            <Header/>
            <Center>
            <Title>All products</Title>
            <ProductsGrid products={products} wishedProducts={wishedNewProducts} />
            </Center>
        </>
    );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  let wishedNewProducts = [];

  if (session?.user) {
    const wishedProducts = await WishedProduct.find({
      userEmail: session.user.email,
    });

    wishedNewProducts = wishedProducts.map((wp) => wp.product.toString());
  }
  return {
    props: {
      wishedNewProducts: wishedNewProducts,
    },
  };
}