export const restaurants = [
  {
    id: 'hioki-sushi',
    name: 'Hioki Sushi',
    category: 'Japonesa',
    rating: 4.9,
    featured: true,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85',
    description: 'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida.',
    dishes: [
      { id: 'sushi-combo', name: 'Combinado de sushi', price: 49.9, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=85', description: 'Seleção especial de sushis frescos preparados na hora, com sabores equilibrados e ingredientes selecionados.', serves: 'Serve 1 pessoa' },
      { id: 'sashimi', name: 'Sashimi especial', price: 42.9, image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=900&q=85', description: 'Fatias delicadas de peixe fresco, acompanhadas de complementos tradicionais.', serves: 'Serve 1 pessoa' },
      { id: 'temaki', name: 'Temaki salmão', price: 29.9, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=85', description: 'Temaki feito na hora com salmão, arroz temperado e alga crocante.', serves: 'Serve 1 pessoa' },
    ],
  },
  {
    id: 'la-dolce-vita',
    name: 'La Dolce Vita Trattoria',
    category: 'Italiana',
    rating: 4.6,
    featured: false,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
    description: 'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    dishes: [
      { id: 'pizza-margherita', name: 'Pizza Marguerita', price: 60.9, image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', description: 'A pizza Margherita é uma pizza clássica da culinária italiana, reconhecida por sua simplicidade e sabor inigualável. Feita com molho de tomate, mussarela, manjericão fresco e azeite de oliva extra-virgem.', serves: 'Serve de 2 a 3 pessoas' },
      { id: 'massa-frutos-mar', name: 'Massa com frutos do mar', price: 54.9, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85', description: 'Massa italiana envolvida em molho delicado, com frutos do mar e ervas frescas.', serves: 'Serve 1 pessoa' },
      { id: 'lasanha', name: 'Lasanha da casa', price: 46.9, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=900&q=85', description: 'Camadas de massa, molho da casa e queijo gratinado até atingir o ponto perfeito.', serves: 'Serve 1 pessoa' },
    ],
  },
  {
    id: 'cantina-da-praca',
    name: 'Cantina da Praça',
    category: 'Italiana',
    rating: 4.5,
    featured: false,
    image: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=1200&q=85',
    description: 'Receitas acolhedoras, ingredientes frescos e aquele sabor de comida feita com carinho. Escolha seu prato favorito e aproveite em casa.',
    dishes: [
      { id: 'ravioli', name: 'Ravioli artesanal', price: 48.9, image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=85', description: 'Ravioli artesanal servido com molho especial e ervas frescas.', serves: 'Serve 1 pessoa' },
      { id: 'risoto', name: 'Risoto de parmesão', price: 44.9, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=85', description: 'Risoto cremoso de parmesão, preparado lentamente.', serves: 'Serve 1 pessoa' },
      { id: 'bruschetta', name: 'Bruschetta italiana', price: 24.9, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=85', description: 'Pão tostado com tomate, manjericão e azeite.', serves: 'Serve 1 pessoa' },
    ],
  },
  {
    id: 'sabor-caseiro',
    name: 'Sabor Caseiro',
    category: 'Brasileira',
    rating: 4.7,
    featured: false,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',
    description: 'Pratos preparados com ingredientes selecionados e aquele tempero especial para deixar sua refeição ainda melhor.',
    dishes: [
      { id: 'prato-executivo', name: 'Prato executivo', price: 32.9, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', description: 'Uma refeição completa, saborosa e preparada na hora.', serves: 'Serve 1 pessoa' },
      { id: 'frango-grelhado', name: 'Frango grelhado', price: 35.9, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85', description: 'Frango grelhado acompanhado de guarnições frescas.', serves: 'Serve 1 pessoa' },
      { id: 'salada', name: 'Salada da estação', price: 22.9, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85', description: 'Salada fresca com vegetais da estação e molho da casa.', serves: 'Serve 1 pessoa' },
    ],
  },
]

export const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
