import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductList from "./_components/product-list";
import { db } from "./_lib/prisma";
import { HeroCarousel } from "./_components/carousel-images";
import { ProductFeatured } from "./_components/product-featured";
import Footer from "./_components/footer";

// Ok, já está funcionando de acordo com o contexto que fizemos, mas estou com um bug com relação a este botão do meu header que passei como carrinho também para ajudar na experiencia do usuário,

const Home = async () => {
  const FEATURED_RESTAURANT_ID = "4deac78f-dda3-4f71-a733-a1ed03833cde";

  //const session = await getServerSession(authOptions);

  // const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
  //   where: {
  //     userId: session?.user.id,
  //   },
  // });

  const products = await db.product.findMany({
    where: {
      restaurantId: FEATURED_RESTAURANT_ID,
      discountPercentage: {
        gte: 38,
      },
    },
    take: 8,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  //console.log("Produtos em destaque:", products);
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: FEATURED_RESTAURANT_ID,
    },
    include: {
      categories: {
        orderBy: {
          order: "asc",
        },
        include: {
          products: {
            where: {
              restaurantId: FEATURED_RESTAURANT_ID,
            },
            take: 10,
            include: {
              restaurant: {
                select: { name: true },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: { name: true },
          },
        },
      },
    },
  });

  //console.log("retorno do restaurante",restaurant);
  //console.log("retorno do restaurante",restaurant?.categories.map((category) => category.products));

  return (
    <>
      <Header />
      <HeroCarousel />
      {/* <div className="flex-row items-center px-6 py-2 pt-5 md:flex md:h-[350px] md:bg-tematic md:py-2">
        <div className=" flex flex-row items-center justify-between md:mt-5 md:w-full lg:gap-20 xl:gap-48 ">
          <div className="w-full flex-col justify-center md:w-2/4">
            <h1 className="hidden text-3xl font-extrabold text-white md:block lg:text-4xl xl:text-5xl">
              Está com fome?
            </h1>
            <p className="mb-2 hidden text-sm text-muted-foreground text-white md:block">
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você.
            </p>

            <div className="flex h-0 w-full items-center justify-center rounded-md bg-white p-0 md:h-24 md:w-full md:p-6">
              <Search isHomePage={true} />
            </div>
          </div>

          <div className="hidden pr-0 md:flex lg:pr-28">
            <Image
              src="/pngwing.com.png"
              alt="Foods"
              height={300}
              width={300}
              className="object-cover "
            />
          </div>
        </div>
      </div> */}

      <div className="px-1 pt-5">
        <CategoryList />
      </div>

      {/* <div className="w-full px-5 pt-6 md:hidden">
        <h1>Promocoes</h1>
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
        />
      </div> */}

      <div className="flex flex-col justify-between gap-4 px-2  pt-6 md:flex">
        <div>
          <h1 className="text-xl font-bold text-tematic">
            Super Promoção de Black Friday Para Você até 50% OFF!
          </h1>
        </div>
        <div className="flex justify-between gap-4  ">
          <div className=" scrollbar-hide grid w-full auto-cols-[minmax(280px,1fr)] grid-flow-col grid-rows-2 gap-4 overflow-x-auto pb-2">
            {products.map((product) => (
              <ProductFeatured
                key={product.id}
                product={product}
                className="min-w-full"
              />
            ))}
          </div>
        </div>
      </div>
      {/* <PromoBanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas!"
            className="mt-4 hidden  w-full md:mt-0 md:block md:w-1/2"
          />
          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches"
            className="w-full md:w-1/2 "
          /> */}

      {/* <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-xl font-bold text-tematic">
            Pedidos Recomendados
          </h2>

          <Button
            variant="ghost"
            asChild
            className="h-fit p-0 text-xl text-primary text-tematic hover:bg-transparent"
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div> */}

      {/* <div className="md:w-1/2">
            <RestaurantImage
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          </div> */}
      <div className="flex h-3"></div>
      {restaurant?.categories.map((category) => (
        <div className="mt-2 space-y-2 py-2" key={category.id}>
          <h2 className="px-2 text-lg font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}

      {/* <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            asChild
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
        <div className="flex h-full w-full">
          <CartBanner />
        </div>
      </div> */}

      <Footer />
    </>
  );
};
export default Home;
