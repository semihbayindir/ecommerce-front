import Header from "@/components/Header";
import Title from "@/components/Title";
import Center from "@/components/Center";
import {signIn, signOut, useSession} from "next-auth/react";
import Button from "@/components/Button";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import {RevealWrapper} from "next-reveal";
import Input from "@/components/Input";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import ReactLoading from 'react-loading';
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";

const ColsWrapper = styled.div`
  display:grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin: 40px 0;
  p{
    margin:5px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export default function AccountPage() {
  const {data:session} = useSession();
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [streetAddress,setStreetAddress] = useState('');
  const [country,setCountry] = useState('');
  const [addressLoaded,setAddressLoaded] = useState(true);
  const [wishlistLoaded,setWishlistLoaded] = useState(true);
  const [orderLoaded,setOrderLoaded] = useState(true);
  const [wishedProducts,setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]);

    async function logout() {
     await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn('google');
  }
  function saveAddress() {
    const data = {name,email,city,streetAddress,postalCode,country};
    axios.put('/api/address', data);
  }
  useEffect(() => {
//     if (!session) {
//       return;
//     }
//     setAddressLoaded(false);
//     setWishlistLoaded(false);
//     setOrderLoaded(false);
    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
      setAddressLoaded(true);
    });
    // axios.get('/api/wishlist').then(response => {
    //   setWishedProducts(response.data.map(wp => wp.product));
    //   setWishlistLoaded(true);
    // });
    // axios.get('/api/orders').then(response => {
    //   setOrders(response.data);
    //   setOrderLoaded(true);
    // });
  }, [session]);
  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts(products => {
      return [...products.filter(p => p._id.toString() !== idToRemove)];
    });
  }
  if (!session) {
    return  <div style={{ backgroundColor: '#222', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ReactLoading type="bubbles" color="#007bff" height={100} width={100} />
  </div>;
    // Ürün yüklenene kadar bekleme ekranı göster
  }
  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
        <div>
        <RevealWrapper delay={0}>
                <WhiteBox>
                    <h2>Wishlist</h2>
                </WhiteBox>
            </RevealWrapper>
        </div>
        <div>
            <RevealWrapper delay={100}>
                <WhiteBox>
                    <h2>Account Details</h2>
                    {!addressLoaded && (
                    <Spinner fullWidth={true}/>
                    )}
                    {addressLoaded && (
                      <>
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
                    <Button block black onClick={saveAddress}>Save</Button>
                    <hr/>
                      </>
                    )}  
                    {session && (
            <Button primary onClick={logout}>Logout</Button>
        )}
        {!session && (
            <Button primary onClick={login}>Login</Button>
        )}
                </WhiteBox>
            </RevealWrapper>
        </div>
        </ColsWrapper>
        
      </Center>

    </>
  );
}