import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import Center from "@/components/Center";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedModel";

export default function HomePage({ featuredProduct, wishedNewProducts }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Yükleniyor durumunu takip etmek için bir state ekledik
  useEffect(() => {
    axios.get('/api/products').then((response) => {
      if (response.data.length > 12) {
        // Eğer API 12'den fazla ürün döndürdüyse, sadece ilk 12 ürünü alın
        setProducts(response.data.slice(0, 12));
      } else {
        // 12 veya daha az ürün varsa, tümünü kullanın
        setProducts(response.data);
      }
      setTimeout(() => {
        setIsLoading(false);
      });
    });
  }, []);
  return (
    <div>
      {isLoading ? (
        <div style={{ backgroundColor: '#222', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ReactLoading type="bubbles" color="#007bff" height={100} width={100} />
        </div>
      ) : (
        <>
          <Header />
          <Featured product={featuredProduct} />
          <NewProducts products={products} wishedProducts={wishedNewProducts} />
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const featuredProductId = '64e736584759f3cd328e5592';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
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
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      wishedNewProducts: wishedNewProducts,
    },
  };
}
