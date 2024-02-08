import Center from "@/components/Center";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2){
    text-align: right;
  }
  table tr.subtotal td{
    padding: 15px 0;
  }
  table tbody tr.subtotal td:nth-child(2){
    font-size: 1.4rem;
  }
  tr.total td{
    font-weight: bold;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  button{padding:0 !important;}
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 6px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

export default function CartPage(){
    const {cartProducts,addProduct,removeProduct} = useContext(CartContext);
    const [products,setProducts] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    useEffect(() => {
        if (cartProducts.length > 0){
            axios.post('/api/cart', {ids:cartProducts})
            .then(response => {
                setProducts(response.data);
            })
        }else{
            setProducts([]);
        }
    }, [cartProducts]);
    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }
      if (window?.location.href.includes('success')) {
        setIsSuccess(true);
        clearCart();
      }
      axios.get('/api/address').then(response => {
        setName(response.data.name);
        setEmail(response.data.email);
        setCity(response.data.city);
        setPostalCode(response.data.postalCode);
        setStreetAddress(response.data.streetAddress);
        setCountry(response.data.country);
      });
    }, []);
  

    function moreOfThisProduct(id){
        addProduct(id);
    }
    function lessOfThisProduct(id){
        removeProduct(id);
    }
    let total = 0;
    for (const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0;
        total +=price;
    }
    return(
        <>
        <Header/>
        <Center>
            <ColumnsWrapper>
                <Box>
                    <h2>Cart</h2>
                    {!cartProducts?.length && (
                        <div>Your cart is empty</div>
                    )}
                    {products?.length > 0 && (
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map(product => (
                            <tr>
                                <ProductInfoCell>
                                    <ProductImageBox>
                                        <img src={product.images[0]}/>
                                    </ProductImageBox>
                                    {product.title}</ProductInfoCell>
                                <td><Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                    <QuantityLabel>{cartProducts.filter(id => id ===product._id).length}</QuantityLabel>
                                    <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>    
                                </td>
                                <td> ${cartProducts.filter(id => id ===product._id).length * product.price} </td>
                                </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                            <td>${total}</td>
                        </tr>
                        </tbody>
                    </Table>
                    )}                    
                </Box>
                {!!cartProducts?.length && (
                    <Box>
                    <h2>Order information</h2>
                    <form method="post" action="/api/checkout">
                    <Input type="text" placeholder="Name" name="name" value={name} onChange={ev =>
                    setName(ev.target.value)}/>
                    <Input type="text" placeholder="Email" name="email" value={email} onChange={ev =>
                    setEmail(ev.target.value)}/>
                    <CityHolder>
                    <Input type="text" placeholder="City" name="city" value={city} onChange={ev =>
                    setCity(ev.target.value)}/>
                    <Input type="text" placeholder="Postal Code" name="postalCode" value={postalCode} onChange={ev =>
                    setPostalCode(ev.target.value)}/>
                    </CityHolder>
                    <Input type="text" placeholder="Street Address" name="streetAddress" value={streetAddress} onChange={ev =>
                    setStreetAddress(ev.target.value)}/>
                    <Input type="text" placeholder="Country" name="country" value={country} onChange={ev =>
                    setCountry(ev.target.value)}/>
                    <input type="hidden" name="products" value={cartProducts.join(',')}/>
                    <Button block black type="sumbit">Continue to payment</Button>
                    </form>       
                </Box>
                )}
                
            </ColumnsWrapper>
        </Center>
        </>
    );
}