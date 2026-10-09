import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem, clearCart } from './redux/cartSlice.js'
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

const API_URL = 'https://api-ebac.vercel.app/api/efood/restaurantes'
const CHECKOUT_URL = 'https://api-ebac.vercel.app/api/efood/checkout'
const formatPrice = (value) => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function normalizarRestaurante(item) {
  return {
    id: String(item.id), name: item.titulo, category: item.tipo, rating: Number(item.avaliacao),
    featured: Boolean(item.destacado), image: item.capa, description: item.descricao,
    dishes: (item.cardapio || []).map((dish) => ({
      id: String(dish.id), name: dish.nome, price: Number(dish.preco), image: dish.foto,
      description: dish.descricao, serves: dish.porcao,
    })),
  }
}

async function buscarRestaurantes() {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Não foi possível carregar os restaurantes.')
  const data = await response.json()
  return data.map(normalizarRestaurante)
}

const coral = '#e6676b'
const pale = '#fff0e3'

const Page = styled.div`min-height: 100vh; display: flex; flex-direction: column;`
const HeaderBar = styled.header`
  background: #ffead8;
  min-height: 88px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 20px; padding: 18px max(24px, calc((100% - 1120px) / 2));
  font-size: 14px; font-weight: 700;
`
const Logo = styled(Link)`
  display: inline-flex; align-items: center; gap: 5px;
  border: 3px solid ${coral}; padding: 5px 8px; color: ${coral};
  font-size: 21px; font-weight: 900; letter-spacing: -.8px;
  white-space: nowrap;
  span { font-size: 17px; }
`
const HeaderLink = styled(Link)`font-weight: 700; &:hover { text-decoration: underline; }`
const CartLink = styled.button`
  border: 0; background: transparent; color: ${coral}; font-weight: 700; text-align: right;
`
const Hero = styled.section`
  background: #ffead8; text-align: center; padding: 38px 20px 42px;
  background-image: radial-gradient(#f8d9c7 0.7px, transparent 0.7px);
  background-size: 12px 12px;
  h1 { max-width: 620px; margin: 0 auto; font-size: clamp(25px, 4vw, 38px); line-height: 1.15; }
`
const Main = styled.main`width: min(1120px, calc(100% - 40px)); margin: 38px auto 60px; flex: 1;`
const RestaurantGrid = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 34px;
  @media (max-width: 680px) { grid-template-columns: 1fr; gap: 20px; }
`
const RestaurantCardBox = styled.article`
  background: #fff; border: 1px solid ${coral}; box-shadow: 0 1px 3px #e6676b33;
`
const ImageWrap = styled.div`
  height: 190px; position: relative; overflow: hidden; background: #f4d7c7;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform .25s; }
  ${RestaurantCardBox}:hover & img { transform: scale(1.03); }
`
const Tag = styled.span`
  position: absolute; top: 12px; right: 12px; background: ${coral}; color: white;
  font-size: 12px; font-weight: 700; padding: 6px 9px;
  & + & { right: auto; left: 12px; }
`
const CardContent = styled.div`padding: 14px;`
const CardTitleRow = styled.div`display: flex; justify-content: space-between; gap: 10px; align-items: center; margin-bottom: 10px;`
const CardTitle = styled.h2`font-size: 18px; margin: 0;`
const Rating = styled.span`font-weight: 700; white-space: nowrap;`
const Description = styled.p`font-size: 13px; line-height: 1.55; margin: 0 0 14px;`
const Button = styled.button`
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border: 0; padding: 10px 14px; font-weight: 700; font-size: 13px;
  color: ${({ $light }) => ($light ? coral : '#fff')};
  background: ${({ $light }) => ($light ? pale : coral)};
  width: ${({ $full }) => ($full ? '100%' : 'auto')};
  transition: filter .15s;
  &:hover { filter: brightness(.96); }
  &:disabled { opacity: .55; cursor: not-allowed; }
`
const Banner = styled.section`
  min-height: 210px; position: relative; display: flex; align-items: end;
  padding: 30px max(24px, calc((100% - 1120px) / 2)); color: white;
  background: linear-gradient(90deg, #0009, #0002), url(${p => p.$image}) center/cover;
  h1 { margin: 6px 0 0; font-size: clamp(26px, 4vw, 36px); }
  span { font-size: 15px; }
`
const MenuGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px;
  @media(max-width: 800px) { grid-template-columns: repeat(2, minmax(0,1fr)); }
  @media(max-width: 520px) { grid-template-columns: 1fr; }
`
const DishCard = styled.article`
  padding: 8px; background: ${coral}; color: white; display: flex; flex-direction: column; gap: 8px;
  img { width: 100%; height: 165px; object-fit: cover; }
  h3 { font-size: 16px; margin: 2px 0 0; }
  p { font-size: 12px; line-height: 1.5; margin: 0; flex: 1; }
  ${Button} { margin-top: 4px; }
`
const FooterBox = styled.footer`
  background: #ffead8; padding: 28px 20px 22px; text-align: center;
  ${Logo} { margin: 0 auto 18px; }
  p { max-width: 700px; margin: 22px auto 0; font-size: 10px; line-height: 1.5; }
`
const Socials = styled.div`display: flex; justify-content: center; gap: 10px; a { border-radius: 50%; background: ${coral}; color: white; width: 24px; height: 24px; display: grid; place-items: center; font-size: 11px; font-weight: 700; }`
const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 20; background: #000b;
  display: flex; align-items: center; justify-content: center; padding: 20px;
`
const ModalBox = styled.div`
  position: relative; width: min(850px, 100%); max-height: 90vh; overflow: auto;
  background: ${coral}; color: white; padding: 22px; display: grid;
  grid-template-columns: minmax(160px, 260px) 1fr; gap: 22px;
  img { width: 100%; height: 230px; object-fit: cover; }
  h2 { margin: 0 0 12px; font-size: 21px; }
  p { font-size: 13px; line-height: 1.6; }
  @media(max-width: 600px) { grid-template-columns: 1fr; img { height: 190px; } }
`
const CloseButton = styled.button`
  position: absolute; right: 8px; top: 8px; border: 0; background: transparent; color: inherit; font-size: 23px;
`
const Backdrop = styled(Overlay)`justify-content: flex-end; padding: 0;`
const SidePanel = styled.aside`
  width: min(420px, 100%); height: 100%; overflow-y: auto; background: ${coral}; color: white; padding: 24px;
  h2 { font-size: 21px; margin: 0 0 20px; }
`
const CartItem = styled.div`
  background: ${pale}; color: ${coral}; padding: 10px; margin-bottom: 10px;
  display: grid; grid-template-columns: 76px 1fr auto; gap: 10px; align-items: center;
  img { width: 76px; height: 65px; object-fit: cover; }
  strong { display: block; font-size: 13px; margin-bottom: 5px; }
  span { font-size: 12px; }
`
const Remove = styled.button`border: 0; background: transparent; color: ${coral}; font-size: 18px; padding: 4px;`
const Total = styled.div`display: flex; justify-content: space-between; gap: 12px; margin: 24px 0 14px; font-weight: 700; font-size: 14px;`
const Form = styled.form`
  display: flex; flex-direction: column; gap: 12px;
  label { display: flex; flex-direction: column; gap: 5px; font-size: 12px; font-weight: 700; }
  input { width: 100%; border: 0; padding: 11px; color: #5c3333; background: ${pale}; min-width: 0; }
  input:focus { outline: 2px solid #8c3b40; }
`
const TwoColumns = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 10px;`
const ButtonStack = styled.div`display: flex; flex-direction: column; gap: 8px; margin-top: 14px;`
const Message = styled.p`font-size: 13px; line-height: 1.7;`
const Empty = styled.div`padding: 30px 0; text-align: center; font-size: 14px; line-height: 1.5;`
const SectionTitle = styled.h2`font-size: 22px; margin: 0 0 22px;`

function SiteHeader({ count, onOpenCart }) {
  return <HeaderBar>
    <HeaderLink to="/">Restaurantes</HeaderLink>
    <Logo to="/" aria-label="eFood página inicial">efood <span>♜</span></Logo>
    <CartLink onClick={onOpenCart}>{count} produto(s) no carrinho</CartLink>
  </HeaderBar>
}

function Footer() {
  return <FooterBox>
    <Logo to="/">efood <span>♜</span></Logo>
    <Socials>
      <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
      <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
      <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">♥</a>
    </Socials>
    <p>A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado.</p>
  </FooterBox>
}

function RestaurantCard({ restaurant }) {
  return <RestaurantCardBox>
    <ImageWrap>
      <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
      {restaurant.featured && <Tag style={{ left: 12, right: 'auto' }}>Destaque da semana</Tag>}
      <Tag>{restaurant.category}</Tag>
    </ImageWrap>
    <CardContent>
      <CardTitleRow><CardTitle>{restaurant.name}</CardTitle><Rating>{restaurant.rating.toFixed(1)} ⭐</Rating></CardTitleRow>
      <Description>{restaurant.description}</Description>
      <Button as={Link} to={`/restaurante/${restaurant.id}`}>Saiba mais</Button>
    </CardContent>
  </RestaurantCardBox>
}

function HomePage() {
  const cartItems = useSelector(state => state.cart.items)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    buscarRestaurantes()
      .then((data) => { if (active) setRestaurants(data) })
      .catch(() => { if (active) setError('Não foi possível carregar os restaurantes. Verifique sua conexão e tente novamente.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return <Page>
    <SiteHeader count={cartItems.length} onOpenCart={() => { window.location.href = '/carrinho' }} />
    <Hero><Logo to="/" style={{ margin: '0 auto 28px' }}>efood <span>♜</span></Logo><h1>Viva experiências gastronômicas<br />no conforto da sua casa</h1></Hero>
    <Main>
      {loading && <SectionTitle>Carregando restaurantes...</SectionTitle>}
      {error && <div role="alert"><SectionTitle>{error}</SectionTitle><Button onClick={() => window.location.reload()}>Tentar novamente</Button></div>}
      {!loading && !error && <RestaurantGrid>{restaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}</RestaurantGrid>}
    </Main>
    <Footer />
  </Page>
}

function ProductModal({ dish, onClose, onAdd }) {
  if (!dish) return null
  return <Overlay onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <ModalBox role="dialog" aria-modal="true" aria-label={`Detalhes de ${dish.name}`}>
      <CloseButton onClick={onClose} aria-label="Fechar">×</CloseButton>
      <img src={dish.image} alt={dish.name} />
      <div>
        <h2>{dish.name}</h2>
        <p>{dish.description}</p>
        <p>{dish.serves}</p>
        <Button onClick={() => { onAdd(dish); onClose() }}>Comprar o produto - {formatPrice(dish.price)}</Button>
      </div>
    </ModalBox>
  </Overlay>
}

function CheckoutSidebar({ step, setStep, cart, onRemove, total, onClose, address, setAddress, onComplete }) {
  const [payment, setPayment] = useState({ name: '', number: '', cvv: '', month: '', year: '' })
  const [errors, setErrors] = useState('')
  const navigate = useNavigate()
  const updateAddress = (e) => setAddress({ ...address, [e.target.name]: e.target.value })
  const updatePayment = (e) => setPayment({ ...payment, [e.target.name]: e.target.value })
  const submitDelivery = (e) => {
    e.preventDefault()
    if (!address.name.trim() || !address.address.trim() || !address.city.trim() || !address.cep.trim() || !address.number.trim()) {
      setErrors('Preencha os campos obrigatórios para continuar.')
      return
    }
    setErrors('')
    setStep('payment')
  }
  const submitPayment = (e) => {
    e.preventDefault()
    if (!payment.name.trim() || payment.number.replace(/\D/g, '').length < 12 || payment.cvv.replace(/\D/g, '').length < 3 || !payment.month || !payment.year) {
      setErrors('Preencha os dados do cartão com informações fictícias válidas para o teste.')
      return
    }
    setErrors('')
    onComplete()
    setStep('confirmation')
  }
  return <Backdrop onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <SidePanel role="dialog" aria-modal="true" aria-label="Finalização do pedido">
      {step === 'cart' && <>
        <h2>Seu carrinho</h2>
        {cart.length === 0 ? <Empty>Seu carrinho está vazio.<br />Adicione um prato para continuar.</Empty> : cart.map((item, i) => <CartItem key={`${item.id}-${i}`}>
          <img src={item.image} alt="" />
          <div><strong>{item.name}</strong><span>{formatPrice(item.price)}</span></div>
          <Remove onClick={() => onRemove(i)} aria-label={`Remover ${item.name}`}>♧</Remove>
        </CartItem>)}
        <Total><span>Valor total</span><span>{formatPrice(total)}</span></Total>
        <ButtonStack><Button $light $full disabled={!cart.length} onClick={() => { setStep('delivery'); setErrors('') }}>Continuar com a entrega</Button><Button $light $full onClick={onClose}>Continuar comprando</Button></ButtonStack>
      </>}
      {step === 'delivery' && <>
        <h2>Entrega</h2>
        <Form onSubmit={submitDelivery}>
          <label>Quem irá receber<input name="name" value={address.name} onChange={updateAddress} autoComplete="name" required /></label>
          <label>Endereço<input name="address" value={address.address} onChange={updateAddress} autoComplete="street-address" required /></label>
          <label>Cidade<input name="city" value={address.city} onChange={updateAddress} autoComplete="address-level2" required /></label>
          <TwoColumns>
            <label>CEP<input name="cep" value={address.cep} onChange={updateAddress} autoComplete="postal-code" required /></label>
            <label>Número<input name="number" value={address.number} onChange={updateAddress} required /></label>
          </TwoColumns>
          <label>Complemento (opcional)<input name="complement" value={address.complement} onChange={updateAddress} /></label>
          {errors && <Message role="alert">{errors}</Message>}
          <ButtonStack><Button $light $full type="submit">Continuar com o pagamento</Button><Button $light $full type="button" onClick={() => setStep('cart')}>Voltar para o carrinho</Button></ButtonStack>
        </Form>
      </>}
      {step === 'payment' && <>
        <h2>Pagamento — Valor a pagar {formatPrice(total)}</h2>
        <Form onSubmit={submitPayment}>
          <label>Nome no cartão<input name="name" value={payment.name} onChange={updatePayment} autoComplete="cc-name" required /></label>
          <label>Número do cartão<input name="number" value={payment.number} onChange={updatePayment} inputMode="numeric" autoComplete="cc-number" placeholder="Somente dados fictícios" required /></label>
          <TwoColumns>
            <label>CVV<input name="cvv" value={payment.cvv} onChange={updatePayment} inputMode="numeric" autoComplete="cc-csc" required /></label>
            <label>Mês de vencimento<input name="month" value={payment.month} onChange={updatePayment} inputMode="numeric" placeholder="MM" required /></label>
          </TwoColumns>
          <label>Ano de vencimento<input name="year" value={payment.year} onChange={updatePayment} inputMode="numeric" placeholder="AAAA" required /></label>
          {errors && <Message role="alert">{errors}</Message>}
          <ButtonStack><Button $light $full type="submit">Finalizar pagamento</Button><Button $light $full type="button" onClick={() => setStep('delivery')}>Voltar para a edição de endereço</Button></ButtonStack>
        </Form>
        <Message>Esta é uma simulação visual. Nenhum pagamento real será processado.</Message>
      </>}
      {step === 'confirmation' && <>
        <h2>Pedido realizado — {onComplete.orderId || 'EF-2026'}</h2>
        <Message>Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.</Message>
        <Message>Nossos entregadores não estão autorizados a realizar cobranças extras. Higienize as mãos após receber seu pedido.</Message>
        <Message>Esperamos que desfrute de uma deliciosa experiência gastronômica. Bom apetite!</Message>
        <Button $light $full onClick={() => { onClose(); navigate('/') }}>Concluir</Button>
      </>}
    </SidePanel>
  </Backdrop>
}

function RestaurantPage() {
  const cart = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const [cartStep, setCartStep] = useState('cart')
  const [address, setAddress] = useState({ name: '', address: '', city: '', cep: '', number: '', complement: '' })
  const [orderId, setOrderId] = useState('')
  const onComplete = () => { setOrderId(`EF-${Math.floor(100000 + Math.random() * 900000)}`); dispatch(clearCart()) }
  onComplete.orderId = orderId
  const { id } = useParams()
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [selectedDish, setSelectedDish] = useState(null)
  const [showCart, setShowCart] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let active = true
    buscarRestaurantes()
      .then((data) => { if (active) setRestaurants(data) })
      .catch(() => { if (active) setLoadError('Não foi possível carregar o cardápio da API.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const restaurant = restaurants.find(r => r.id === String(id))
  if (loading) return <Page><SiteHeader count={cart.length} onOpenCart={() => setShowCart(true)} /><Main><SectionTitle>Carregando cardápio...</SectionTitle></Main><Footer /></Page>
  if (loadError) return <Page><Main><SectionTitle>{loadError}</SectionTitle><Button onClick={() => window.location.reload()}>Tentar novamente</Button></Main><Footer /></Page>
  if (!restaurant) return <Page><Main><h1>Restaurante não encontrado</h1><Button onClick={() => navigate('/')}>Voltar aos restaurantes</Button></Main><Footer /></Page>
  const addDish = dish => dispatch(addItem({ ...dish, restaurantId: restaurant.id }))
  const removeDish = index => dispatch(removeItem(index))
  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const showSidebar = (step = 'cart') => { setCartStep(step); setShowCart(true) }
  return <Page>
    <SiteHeader count={cart.length} onOpenCart={() => navigate('/carrinho')} />
    <Banner $image={restaurant.image}><div><span>{restaurant.category}</span><h1>{restaurant.name}</h1></div></Banner>
    <Main><MenuGrid>{restaurant.dishes.map((dish) => <DishCard key={dish.id}>
      <img src={dish.image} alt={dish.name} loading="lazy" />
      <h3>{dish.name}</h3><p>{dish.description.split('. ')[0]}.</p>
      <Button $light $full onClick={() => setSelectedDish(dish)}>Comprar o produto · {formatPrice(dish.price)}</Button>
    </DishCard>)}</MenuGrid></Main>
    <Footer />
    {selectedDish && <ProductModal dish={selectedDish} onClose={() => setSelectedDish(null)} onAdd={addDish} />}
    {showCart && <CheckoutSidebar step={cartStep} setStep={setCartStep} cart={cart} onRemove={removeDish} total={total} onClose={() => setShowCart(false)} address={address} setAddress={setAddress} onComplete={onComplete} />}
    <CartFab onClick={() => navigate('/carrinho')}>🛒 Carrinho ({cart.length})</CartFab>
  </Page>
}

function CartPage() {
  const items = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0)

  return <Page>
    <SiteHeader count={items.length} onOpenCart={() => navigate('/carrinho')} />
    <Main>
      <SectionTitle>Meu carrinho</SectionTitle>
      {items.length === 0 ? <Empty>Seu carrinho está vazio.<br />Escolha um restaurante e adicione seus pratos favoritos.</Empty> : <>
        {items.map((item, index) => <CartItem key={`${item.restaurantId}-${item.id}-${index}`}>
          <img src={item.image} alt={item.name} />
          <div><strong>{item.name}</strong><span>{formatPrice(item.price)}</span></div>
          <Remove onClick={() => dispatch(removeItem(index))} aria-label={`Remover ${item.name}`}>×</Remove>
        </CartItem>)}
        <Total><span>Valor total da compra</span><span>{formatPrice(total)}</span></Total>
        <Message>O valor total é calculado automaticamente pela soma dos preços dos produtos adicionados ao carrinho.</Message>
      </>}
      <ButtonStack>
        <Button onClick={() => navigate('/')}>Continuar comprando</Button>
        {items.length > 0 && <Button onClick={() => navigate('/entrega')}>Continuar para a entrega</Button>}
        {items.length > 0 && <Button $light onClick={() => { dispatch(clearCart()) }}>Esvaziar carrinho</Button>}
      </ButtonStack>
    </Main>
    <Footer />
  </Page>
}

const FloatingButton = styled.button`
  position: fixed; right: 20px; bottom: 20px; z-index: 5; border: 0; background: ${coral};
  color: white; padding: 13px 17px; border-radius: 30px; font-weight: 700; box-shadow: 0 4px 18px #0002;
`
const CartFab = ({ children, ...props }) => <FloatingButton {...props}>{children}</FloatingButton>


const CheckoutForm = styled(Form)`
  max-width: 650px; margin: 0 auto; padding: 24px; background: ${coral}; color: white;
  input { background: ${pale}; }
  h2 { margin: 4px 0; }
`
const CheckoutSection = styled.section`margin: 0 0 24px; display: flex; flex-direction: column; gap: 12px;`
const InlineError = styled.p`color: #8c2025; background: #fff0e3; padding: 12px; font-weight: 700; font-size: 13px;`
const ConfirmationCard = styled.section`
  max-width: 700px; margin: 0 auto; padding: 28px; background: ${coral}; color: white;
  h1 { margin-top: 0; } p { line-height: 1.6; }
`

function DeliveryPage() {
  const items = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [address, setAddress] = useState({ receiver: '', description: '', city: '', zipCode: '', number: '', complement: '' })
  const [payment, setPayment] = useState({ name: '', number: '', code: '', month: '', year: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0)
  const updateAddress = e => setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const updatePayment = e => setPayment(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submitOrder = async e => {
    e.preventDefault()
    setError('')
    if (!items.length) {
      setError('Seu carrinho está vazio. Adicione um produto antes de concluir o pedido.')
      return
    }
    setSubmitting(true)
    const payload = {
      products: items.map(item => ({ id: Number(item.id), price: Number(item.price) })),
      delivery: {
        receiver: address.receiver.trim(),
        address: {
          description: address.description.trim(),
          city: address.city.trim(),
          zipCode: address.zipCode.trim(),
          number: Number(address.number),
          complement: address.complement.trim(),
        },
      },
      payment: {
        card: {
          name: payment.name.trim(),
          number: payment.number.replace(/\s/g, ''),
          code: Number(payment.code),
          expires: { month: Number(payment.month), year: Number(payment.year) },
        },
      },
    }
    try {
      const response = await fetch(CHECKOUT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const responseData = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'A API não conseguiu concluir o pedido. Confira os dados e tente novamente.')
      }
      dispatch(clearCart())
      navigate('/confirmacao', { state: { order: responseData } })
    } catch (err) {
      setError(err.message || 'Não foi possível enviar o pedido. Verifique sua conexão e tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return <Page>
    <SiteHeader count={items.length} onOpenCart={() => navigate('/carrinho')} />
    <Main>
      <SectionTitle>Entrega e pagamento</SectionTitle>
      {items.length === 0 ? <Empty>Seu carrinho está vazio.<br /><Button onClick={() => navigate('/')}>Escolher produtos</Button></Empty> : <>
        <CheckoutForm onSubmit={submitOrder}>
          <CheckoutSection>
            <h2>Dados para entrega</h2>
            <label>Quem irá receber<input name="receiver" value={address.receiver} onChange={updateAddress} autoComplete="name" required /></label>
            <label>Endereço<input name="description" value={address.description} onChange={updateAddress} autoComplete="street-address" required /></label>
            <TwoColumns>
              <label>Cidade<input name="city" value={address.city} onChange={updateAddress} autoComplete="address-level2" required /></label>
              <label>CEP<input name="zipCode" value={address.zipCode} onChange={updateAddress} autoComplete="postal-code" required /></label>
            </TwoColumns>
            <TwoColumns>
              <label>Número<input name="number" type="number" min="1" value={address.number} onChange={updateAddress} required /></label>
              <label>Complemento<input name="complement" value={address.complement} onChange={updateAddress} /></label>
            </TwoColumns>
          </CheckoutSection>
          <CheckoutSection>
            <h2>Dados de pagamento</h2>
            <label>Nome no cartão<input name="name" value={payment.name} onChange={updatePayment} autoComplete="cc-name" required /></label>
            <label>Número do cartão<input name="number" value={payment.number} onChange={updatePayment} inputMode="numeric" autoComplete="cc-number" minLength="12" required /></label>
            <TwoColumns>
              <label>CVV<input name="code" value={payment.code} onChange={updatePayment} inputMode="numeric" autoComplete="cc-csc" minLength="3" required /></label>
              <label>Mês de validade<input name="month" type="number" min="1" max="12" value={payment.month} onChange={updatePayment} required /></label>
            </TwoColumns>
            <label>Ano de validade<input name="year" type="number" min="2026" value={payment.year} onChange={updatePayment} required /></label>
          </CheckoutSection>
          <Total><span>Total do pedido</span><span>{formatPrice(total)}</span></Total>
          {error && <InlineError role="alert">{error}</InlineError>}
          <ButtonStack>
            <Button $full type="submit" disabled={submitting}>{submitting ? 'Enviando pedido...' : 'Concluir pedido'}</Button>
            <Button $light $full type="button" onClick={() => navigate('/carrinho')} disabled={submitting}>Voltar ao carrinho</Button>
          </ButtonStack>
          <Message>Para testes, use apenas dados fictícios de cartão. O formulário envia os dados à API de checkout da EBAC.</Message>
        </CheckoutForm>
      </>}
    </Main>
    <Footer />
  </Page>
}

function ConfirmationPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const order = state?.order
  const orderId = order?.orderId ?? order?.id ?? order?.pedidoId
  const entries = order && typeof order === 'object'
    ? Object.entries(order).filter(([key, value]) => !['card', 'number', 'code', 'cvv'].includes(key.toLowerCase()) && (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'))
    : []

  return <Page>
    <SiteHeader count={0} onOpenCart={() => navigate('/carrinho')} />
    <Main>
      <ConfirmationCard>
        <h1>Pedido confirmado!</h1>
        <p>{orderId ? `Número do pedido: ${orderId}` : 'A API recebeu seu pedido e retornou a confirmação.'}</p>
        {order?.message && <p>{order.message}</p>}
        {order?.status && <p>Status: {order.status}</p>}
        {entries.length > 0 && <div aria-label="Dados retornados pela API">{entries.filter(([key]) => !['orderid', 'id', 'pedidoid', 'message', 'status'].includes(key.toLowerCase())).map(([key, value]) => <p key={key}><strong>{key}:</strong> {String(value)}</p>)}</div>}
        <p>Obrigado por comprar com a eFood!</p>
        <Button onClick={() => navigate('/')}>Voltar aos restaurantes</Button>
      </ConfirmationCard>
    </Main>
    <Footer />
  </Page>
}

function App() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/restaurante/:id" element={<RestaurantPage />} />
    <Route path="/carrinho" element={<CartPage />} />
    <Route path="/entrega" element={<DeliveryPage />} />
    <Route path="/confirmacao" element={<ConfirmationPage />} />
    <Route path="*" element={<Page><Main><h1>Página não encontrada</h1><Button as={Link} to="/">Voltar ao início</Button></Main><Footer /></Page>} />
  </Routes>
}

export default App
