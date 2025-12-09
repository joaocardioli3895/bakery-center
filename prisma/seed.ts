import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
//type name = Restaurant["deliveryFee"]

//o preenchimento automatico das foras de pagamento está desativado

// Parece que você está enfrentando alertas de segurança relacionados ao autocomplete e/ou ao modo como campos de cartão de crédito são configurados em um formulário Next.js. Isso é comum quando os navegadores detectam que o formulário não segue as diretrizes de segurança da Payment Card Industry (PCI) ou das melhores práticas HTML para campos sensíveis.

// Abaixo está o guia completo para deixar seu formulário seguro, compatível e sem alertas.

// ✅ 1. Use os atributos autocomplete corretos

// Para campos de cartão de crédito, o navegador exige atributos específicos:

// Campo	Autocomplete correto
// Nome no cartão	cc-name
// Número do cartão	cc-number
// Mês/ano de expiração	cc-exp
// Mês	cc-exp-month
// Ano	cc-exp-year
// CVV	cc-csc
// ✔ Exemplo recomendado:
// <form method="POST" autoComplete="on">
//   <label>
//     Nome no cartão
//     <input type="text" name="ccName" autoComplete="cc-name" required />
//   </label>

//   <label>
//     Número do cartão
//     <input type="text" name="ccNumber" autoComplete="cc-number" inputMode="numeric" required />
//   </label>

//   <label>
//     Data de expiração
//     <input type="text" name="ccExp" autoComplete="cc-exp" placeholder="MM/AA" required />
//   </label>

//   <label>
//     CVV
//     <input type="password" name="ccCsc" autoComplete="cc-csc" required />
//   </label>

//   <button type="submit">Pagar</button>
// </form>

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec nisl lorem. Praesent pharetra, sapien ut fringilla malesuada, nisi felis ullamcorper ex, eu consectetur elit dolor sed dolor. Praesent orci mi, auctor aliquet semper vitae, volutpat quis augue. Cras porta sapien nec pharetra laoreet. Sed at velit sit amet mauris varius volutpat sit amet id mauris. Maecenas vitae mattis ante. Morbi nulla quam, sagittis at orci eu, scelerisque auctor neque.";

const createOutbackMenu = async (
  desertsCategoryId: string,
  premiumBurgersCategoryId: string,
  chickensFishsCategoryId: string,
  massCategoryId: string,
) => {
  const aperitiveCategory = await prismaClient.category.create({
    data: {
      name: "Aparitivos",
      imageUrl:
        "https://utfs.io/f/d84e3a7a-fcf6-4d3d-86bf-d62c0b1febdc-m1yv44.png",
      order: 3,
    },
  });
  const ribsOutbackCategory = await prismaClient.category.create({
    data: {
      name: "Ribs Outback",
      imageUrl:
        "https://utfs.io/f/d84e3a7a-fcf6-4d3d-86bf-d62c0b1febdc-m1yv44.png",
      order: 1,
    },
  });
  const steakOutbackCategory = await prismaClient.category.create({
    data: {
      name: "Steaks",
      imageUrl:
        "https://utfs.io/f/d84e3a7a-fcf6-4d3d-86bf-d62c0b1febdc-m1yv44.png",
      order: 2,
    },
  });

  const drinksCategory = await prismaClient.category.create({
    data: {
      name: "Bebidas",
      imageUrl:
        "https://utfs.io/f/9f3013bf-0778-4d80-a330-4da2682deaf9-o41y62.png",
      order: 8,
    },
  });

  // const saladCategory = await prismaClient.category.create({
  //   data: {
  //     name: "Saladas",
  //     imageUrl:
  //       "https://utfs.io/f/d84e3a7a-fcf6-4d3d-86bf-d62c0b1febdc-m1yv44.png",
  //   },
  // });
  // const saucesCategory = await prismaClient.category.create({
  //   data: {
  //     name: "Molhos",
  //     imageUrl:
  //       "https://utfs.io/f/d84e3a7a-fcf6-4d3d-86bf-d62c0b1febdc-m1yv44.png",
  //   },
  // });

  const outbackRestaurants = [
    {
      name: "Outback Steakhouse",
      imageUrl:
        "https://utfs.io/f/9c193fc1-9dcb-4394-8be4-d783266134dc-p3apy7.png",
      deliveryFee: 0,
      deliveryTimeMinutes: 40,
      categories: {
        connect: {
          id: ribsOutbackCategory.id,
        },
      },
    },
  ];

  for (const item of outbackRestaurants) {
    const restaurant = await prismaClient.restaurant.create({
      data: item,
    });

    console.log(`Created ${restaurant.name}`);

    await createDeserts(restaurant.id, desertsCategoryId);
    await createJuices(restaurant.id, drinksCategory.id);
    await createPremiumBurgers(restaurant.id, premiumBurgersCategoryId);
    await createChickensFishs(restaurant.id, chickensFishsCategoryId);
    await createMass(restaurant.id, massCategoryId);
    await createSteaks(restaurant.id, steakOutbackCategory.id);
    await createAperitives(restaurant.id, aperitiveCategory.id);

    const outbackProducts = [
      {
        name: "2 Ribs on The Barbie + 2 Acompanhamentos + Iced Tea 1l",
        price: 388,
        description:
          " Um combo com a nossa famosa ribs e a kookaburra wings!   Ribs on the barbie: nossa costela suína preparada em chama aberta como manda a tradição australiana, vem com as saborosas cinnamon apples + 1 acompanhamentos DEFINIDOS!.  Kookaburra wings: 10 sobreasas de frango empanadas com temperos Outback. Acompanham molho blue cheese e aipo crocante. Escolha a intensidade de picância.   Molho: Barbeccue + Acompanhamento: Fritas do Outback + SEM Salada Caesar + Legumes na manteiga + Piacância: Média ",
        discountPercentage: 48,
        imageUrl:
          "https://static.ifood-static.com.br/image/upload/t_medium/pratos/5221af98-5ad4-42e2-a767-23d1545b82d5/201911191742_qCKt_r.jpg",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: ribsOutbackCategory.id,
          },
        },
        accompaniments: {
          create: [
            { label: "Molho: Barbecue ou Billabong" },
            {
              label:
                "Garlic Mashed Potato: Fritas do OutbackPurê de batatas rústico, estilo Outback, com manteiga e leve toque de alho, salsinha e pimenta. Vegetariano|Sem Glúten",
            },
            {
              label:
                "Jacked Potato: Batata assada recheada com requeijão, manteiga, mix de queijos, bacon e cebolinha. Vegetariano|Sem Glúten|*Contém carne suína",
            },
            { label: "Sem Salada Caesar" },
            {
              label:
                "Fritas: Batatas fritas outback temperadas com o melhor aussie style. Vegano|Sem Lactose|Sem Glúten",
            },
            { label: "Sem Salada Caesar" },
            { label: "Legumes na manteiga" },
            { label: "Picância: Light, Média e Hot  " },
          ],
        },
      },
      {
        name: "Ribs on The Barbie + 2 Acompanhamentos + Iced Tea 1l",
        price: 169.9,
        description:
          " Um combo com a nossa famosa ribs e a kookaburra wings!   Ribs on the barbie: nossa costela suína preparada em chama aberta como manda a tradição australiana, vem com as saborosas cinnamon apples + 1 acompanhamentos DEFINIDOS!.  Kookaburra wings: 10 sobreasas de frango empanadas com temperos Outback. Acompanham molho blue cheese e aipo crocante. Escolha a intensidade de picância.   Molho: Barbeccue + Acompanhamento: Fritas do Outback + SEM Salada Caesar + Legumes na manteiga + Piacância: Média ",
        discountPercentage: 38,
        imageUrl:
          "https://static.ifood-static.com.br/image/upload/t_medium/pratos/5221af98-5ad4-42e2-a767-23d1545b82d5/201911191742_qCKt_r.jpg",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: ribsOutbackCategory.id,
          },
        },
        accompaniments: {
          create: [
            { label: "Molho: Barbecue ou Billabong" },
            {
              label:
                "Garlic Mashed Potato: Fritas do OutbackPurê de batatas rústico, estilo Outback, com manteiga e leve toque de alho, salsinha e pimenta. Vegetariano|Sem Glúten",
            },
            {
              label:
                "Jacked Potato: Batata assada recheada com requeijão, manteiga, mix de queijos, bacon e cebolinha. Vegetariano|Sem Glúten|*Contém carne suína",
            },
            { label: "Sem Salada Caesar" },
            {
              label:
                "Fritas: Batatas fritas outback temperadas com o melhor aussie style. Vegano|Sem Lactose|Sem Glúten",
            },
            { label: "Sem Salada Caesar" },
            { label: "Legumes na manteiga" },
            { label: "Picância: Light, Média e Hot  " },
          ],
        },
      },

      {
        name: "Mega Steak Black Friday - 2 Board Ribs & Steak + 2 Brownies Ice Cream + 2 Pink Lemonade 1L",
        price: 424.8,
        description:
          "🔥 SUPER COMBO BLACK FRIDAY! Economize mais de R$ 420! 🔥 Combinação perfeita para compartilhar: 2 pratos Board from Down Under com Junior Ribs + Steak de Filet Mignon (aprox 200g cada) com chimichurri e Crunchy Potatoes. Escolha os molhos Barbecue ou Billabong para as Ribs e 3 acompanhamentos para cada prato. Acompanha 2 sobremesas Brownies from Down Under Ice Cream (camadas de brownie com doce de leite Havanna e chocolate + sorvete) e 2 garrafas de Pink Lemonade 1L (chá gelado sabor pêssego, limão e cranberry). Contém Glúten, Lactose e Suínos. Válido apenas para Delivery.",
        discountPercentage: 50,
        imageUrl:
          "https://static.ifood-static.com.br/image/upload/t_medium/pratos/60364d55-35ad-4231-957c-fd950cb6e7b5/202510221818_efctoqeo61b.jpeg",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: steakOutbackCategory.id,
          },
        },
        accompaniments: {
          create: [
            {
              label: "Molho Prato 1: Barbecue ou Billabong",
            },
            {
              label: "Molho Prato 2: Barbecue ou Billabong",
            },
            {
              label:
                "Ponto da Carne Prato 1: Mal Passado, Ponto para Mal Passado, Ao ponto, Ponto para bem passado, Bem passado",
            },
            {
              label:
                "Ponto da Carne Prato 2: Mal Passado, Ponto para Mal Passado, Ao ponto, Ponto para bem passado, Bem passado",
            },
            {
              label:
                "Acompanhamento 1 - Prato 1: Garlic Mashed Potato, Jacked Potato, Fritas, Legumes na manteiga, Arroz Pilaf",
            },
            {
              label:
                "Acompanhamento 2 - Prato 1: Garlic Mashed Potato, Jacked Potato, Fritas, Legumes na manteiga, Arroz Pilaf",
            },
            {
              label:
                "Acompanhamento 3 - Prato 1: Garlic Mashed Potato, Jacked Potato, Fritas, Legumes na manteiga, Arroz Pilaf",
            },
            {
              label:
                "Acompanhamento 1 - Prato 2: Garlic Mashed Potato, Jacked Potato, Fritas, Legumes na manteiga, Arroz Pilaf",
            },
            {
              label:
                "Acompanhamento 2 - Prato 2: Garlic Mashed Potato, Jacked Potato, Fritas, Legumes na manteiga, Arroz Pilaf",
            },
            {
              label:
                "Acompanhamento 3 - Prato 2: Garlic Mashed Potato, Jacked Potato, Fritas, Legumes na manteiga, Arroz Pilaf",
            },
            {
              label: "Calda Extra Brownie 1: Sem calda ou Chocolate +R$ 5,90",
            },
            {
              label: "Calda Extra Brownie 2: Sem calda ou Chocolate +R$ 5,90",
            },
          ],
        },
      },

      {
        name: "Junior Ribs for Two",
        price: 149.9,
        description:
          "Duas suculentas Junior Ribs, com peso aproximado de 375g, servidas com dois acompanhamentos à sua escolha. Contém Glúten (apenas na opção com molho Billabong)",
        discountPercentage: 48,
        imageUrl:
          "https://static.ifood-static.com.br/image/upload/t_medium/pratos/2b157a73-7564-4733-94c1-8d0376e7bb39/202309291026_0NM3_i.jpg",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: ribsOutbackCategory.id,
          },
        },
        accompaniments: {
          create: [
            {
              label: "Molho 1: Barbecue, Billabong, Sem molho",
            },
            {
              label:
                "Acompanhamento 1: Garlic Mashed Potato, Jacked Potato, Legumes ao vapor, Fritas, Arroz Pilaf",
            },
            {
              label: "Molho 2: Barbecue, Billabong, Sem molho",
            },
            {
              label:
                "Acompanhamento 2: Garlic Mashed Potato, Jacked Potato, Legumes ao vapor, Fritas, Arroz Pilaf",
            },
          ],
        },
      },
      {
        name: "2 Super Wings + Growler",
        price: 272,
        description:
          "Compre uma Super Wings, porção de 15 kookaburra wings servidas com o molho blue cheese e aipo crocante, e ganhe desconto no Growler de 1l . Escolha a intensidade de picância da sua Super Wings",
        discountPercentage: 40,
        imageUrl:
          "https://static.ifood-static.com.br/image/upload/t_medium/pratos/185e2a09-94cb-49af-88cb-4b0de2df6dc5/202406271142_17Y7_i.jpg",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: ribsOutbackCategory.id,
          },
        },
        accompaniments: {
          create: [
            {
              label:
                "Molhos: Barbecue, Billabong, Gorgonzola, Ranch e Cheddar Ranch",
            },
            {
              label:
                "Fritas: Batatas fritas outback temperadas com o melhor aussie style. Vegano|Sem Lactose|Sem Glúten",
            },
            { label: "Picância: Light, Média e Hot  " },
          ],
        },
      },

      {
        name: "2 Chopp Brahma Outback 1l/cada com 25% de desconto ",
        price: 95,
        description:
          " Um combo com a nossa famosa ribs e a kookaburra wings! Ribs on the barbie: nossa costela suína preparada em chama aberta como manda a tradição australiana, vem com as saborosas cinnamon apples + 1 acompanhamento. Kookaburra wings: 10 sobreasas de frango empanadas com temperos Outback. Acompanham molho blue cheese e aipo crocante. Escolha a intensidade de picância.",
        discountPercentage: 38,
        imageUrl:
          "https://static.ifood-static.com.br/image/upload/t_medium/pratos/5221af98-5ad4-42e2-a767-23d1545b82d5/201911191742_qCKt_r.jpg",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: drinksCategory.id,
          },
        },
        accompaniments: {
          create: [
            { label: "Molho: Barbecue ou Billabong" },
            {
              label:
                "Garlic Mashed Potato: Fritas do OutbackPurê de batatas rústico, estilo Outback, com manteiga e leve toque de alho, salsinha e pimenta. Vegetariano|Sem Glúten",
            },
            {
              label:
                "Jacked Potato: Batata assada recheada com requeijão, manteiga, mix de queijos, bacon e cebolinha. Vegetariano|Sem Glúten|*Contém carne suína",
            },
            { label: "Sem Salada Caesar" },
            {
              label:
                "Fritas: Batatas fritas outback temperadas com o melhor aussie style. Vegano|Sem Lactose|Sem Glúten",
            },
            { label: "Sem Salada Caesar" },
            { label: "Legumes na manteiga" },
            { label: "Picância: Light, Média e Hot  " },
          ],
        },
      },
      {
        name: "2 Board from Down Under - Ribs & Steak",
        price: 370,
        description:
          " Combinação de Junior Ribs e do nosso Steak de Filet Mignon ( aprox 200g) finalizado com chimichurri, servidos com nossa Crunchy Potatoes. Para as Ribs, você pode escolher entre os molhos Barbecue e Billabong. E ainda três acompanhamentos de sua preferência. Contém Gluten, Lactose e Suínos",
        discountPercentage: 47,
        imageUrl:
          "https://static.ifood-static.com.br/image/upload/t_medium/pratos/60364d55-35ad-4231-957c-fd950cb6e7b5/202510221818_efctoqeo61b.jpeg",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: steakOutbackCategory.id,
          },
        },
        accompaniments: {
          create: [
            {
              label:
                "Molhos: Barbecue, Billabong, Gorgonzola, Ranch e Cheddar Ranch",
            },
            {
              label:
                "Ponto da Carne: Mal Passado, Ponto para Mal Passado, Ao ponto, Ponto para bem passado, Bem passado",
            },
            {
              label:
                "Garlic Mashed Potato: Fritas do OutbackPurê de batatas rústico, estilo Outback, com manteiga e leve toque de alho, salsinha e pimenta. Vegetariano|Sem Glúten",
            },
            {
              label:
                "Jacked Potato: Batata assada recheada com requeijão, manteiga, mix de queijos, bacon e cebolinha. Vegetariano|Sem Glúten|*Contém carne suína",
            },
            { label: "Sem Salada Caesar" },
            {
              label:
                "Fritas: Batatas fritas outback temperadas com o melhor aussie style. Vegano|Sem Lactose|Sem Glúten",
            },
            { label: "Sem Salada Caesar" },
            { label: "Legumes na manteiga" },
            { label: "Picância: Light, Média e Hot  " },
          ],
        },
      },
      {
        name: "Victoria's Filet",
        price: 99,
        description:
          "Um corte de filet mignon com cerca de 200g, servido no estilo que preferir: com temperos Outback ou com ervas finas. Servido com molho Merlot. Preparado na chapa no ponto que você preferir. Contém glúten e lactose.",
        discountPercentage: 18,
        imageUrl:
          "https://static.ifood-static.com.br/image/upload/t_medium/pratos/e9e3f9a2-a18d-4b30-96bd-4442007fb42d/202206031151_UI72_i.jpg",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: steakOutbackCategory.id,
          },
        },
        accompaniments: {
          create: [
            {
              label:
                "Tempero da carne: Tempero Outback, Tempero de ervas finas, Temperada no sal",
            },
            {
              label:
                "Ponto da carne: Mal passado, Ponto para mal passado, Ao ponto, Ponto para bem passado, Bem passado",
            },
            {
              label:
                "Acompanhamento: Garlic Mashed Potato, Jacked Potato, Legumes ao vapor, Fritas, Arroz Pilaf",
            },
            {
              label:
                "Molho extra: Bloom (+5.90), Gorgonzola (+9.90), Barbecue (+5.90), Honey Mustard (+5.90), Blue Cheese (+5.90), Ranch (+5.90), Merlot (+5.90), Cheddar Ranch (+5.90), Ketchup, Maionese, Mostarda",
            },
          ],
        },
      },
      {
        name: "The outback special 325g",
        price: 99,
        description:
          "Miolo de alcatra com sabor marcante pelos temperos do outback. Preparado na chapa no ponto que você preferir.",
        discountPercentage: 18,
        imageUrl:
          "https://static.ifood-static.com.br/image/upload/t_medium/pratos/e9e3f9a2-a18d-4b30-96bd-4442007fb42d/202206031151_UI72_i.jpg",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: steakOutbackCategory.id,
          },
        },
        accompaniments: {
          create: [
            {
              label:
                "Ponto da carne: Mal passado, Ponto para mal passado, Ao ponto, Ponto para bem passado, Bem passado",
            },
            {
              label:
                "Tempero: Tempero Outback, Temperada no sal, Pouco tempero",
            },
            {
              label:
                "Acompanhamento: Garlic Mashed Potato, Jacked Potato, Legumes ao vapor, Fritas, Arroz Pilaf",
            },
          ],
        },
      },
      {
        name: "New York Strip Steak",
        price: 150,
        description:
          "375g do corte nobre do contra-filet, perfeitamente temperado e preparado na chapa. Contém lactose.",
        discountPercentage: 18,
        imageUrl:
          "https://static.ifood-static.com.br/image/upload/t_medium/pratos/e9e3f9a2-a18d-4b30-96bd-4442007fb42d/202206031151_UI72_i.jpg",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: steakOutbackCategory.id,
          },
        },
        accompaniments: {
          create: [
            {
              label:
                "Ponto da carne: Mal passado, Ponto para mal passado, Ao ponto, Ponto para bem passado, Bem passado",
            },
            {
              label:
                "Tempero: Tempero Outback, Temperada no sal, Pouco tempero",
            },
            {
              label:
                "Acompanhamento: Garlic Mashed Potato, Jacked Potato, Legumes ao vapor, Fritas, Arroz Pilaf",
            },
          ],
        },
      },
    ];

    for (const product of outbackProducts) {
      await prismaClient.product.create({
        data: product,
      });

      console.log(`Created ${product.name}`);
    }
  }
};

const createPremiumBurgers = async (
  restaurantId: string,
  categoryId: string,
) => {
  await prismaClient.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: {
      categories: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  const premiumBurgersProducts = [
    {
      name: "The Outbacker",
      price: 75.9,
      description:
        "Burger com 200g de carne, queijo, picles, tomate, alface, cebola e maionese. Se preferir, peça para acrescentar bacon e troque a maionese por mostarda.",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/60364d55-35ad-4231-957c-fd950cb6e7b5/202510201946_v8c2v03p8m8.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      accompaniments: {
        create: [
          {
            label: "Outbacker: Bacon, Mostarda, Normal",
          },
          {
            label:
              "Acompanhamento: Garlic Mashed Potato, Jacked Potato, Legumes ao vapor, Fritas, Arroz Pilaf",
          },
        ],
      },
    },
    {
      name: "Picanha Bloomin Burger",
      price: 78.9,
      description:
        "Burger 100% picanha, cerca de 200g, no pão tipo brioche, com pétalas de Bloomin’ Onion, bacon grelhado e molho Flame, servido com nosso queijo tipo Emmenthal e mix de queijos e finalizado com Smoked Mayo.",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/60364d55-35ad-4231-957c-fd950cb6e7b5/202510221818_3y2pl3wiht7.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Firecracker Shrimp Burger",
      price: 82.9,
      description:
        "Hambúrguer da casa no pão tipo brioche, camarões empanados envoltos no molho Firecracker, alface, maionese e cebolinha. Servido com um acompanhamento a sua escolha.",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/60364d55-35ad-4231-957c-fd950cb6e7b5/202510221818_9xykhi7bg6n.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  ];

  for (const product of premiumBurgersProducts) {
    await prismaClient.product.create({
      data: product,
    });

    console.log(`Created ${product.name}`);
  }
};

const createChickensFishs = async (
  restaurantId: string,
  categoryId: string,
) => {
  await prismaClient.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: {
      categories: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  const chickensFishsProducts = [
    {
      name: "Alice Springs Chicken",
      price: 72.9,
      description:
        "PSuculento peito de frango grelhado e temperado, com aproximadamente 230g, coberto com bacon, champignons e um mix de queijos gratinados, servido com molho honey mustard.",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/5221af98-5ad4-42e2-a767-23d1545b82d5/202006261543_0PWa_a.jpg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      accompaniments: {
        create: [
          {
            label: "Champignon: Sim, quero champignon, Não quero champignon",
          },
          {
            label:
              "Acompanhamento: Garlic Mashed Potato, Jacked Potato, Legumes ao vapor, Fritas, Arroz Pilaf",
          },
        ],
      },
    },
    {
      name: "Chicken Fingers Jumbo",
      price: 72.9,
      description:
        "FPedaços crocantes de peito de frango empanado para você mergulhar no delicioso molho honey mustard.",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/2b157a73-7564-4733-94c1-8d0376e7bb39/202309290917_B3XD_i.jpg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },

      accompaniments: {
        create: [
          {
            label: "Picância: Light, Media, Hot",
          },
          {
            label:
              "Acompanhamento: Garlic Mashed Potato, Jacked Potato, Legumes ao vapor, Fritas, Arroz Pilaf",
          },
        ],
      },
    },
    {
      name: "Chicken on the Barbie",
      price: 65.9,
      description:
        "Um suculento peito de frango grelhado em chama aberta, servido com o molho barbecue.",
      discountPercentage: 12,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/2b157a73-7564-4733-94c1-8d0376e7bb39/202309290922_5F72_i.jpg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      accompaniments: {
        create: [
          {
            label:
              "Acompanhamento: Garlic Mashed Potato, Jacked Potato, Legumes ao vapor, Fritas, Arroz Pilaf",
          },
        ],
      },
    },
    {
      name: "Tilápia Filet",
      price: 65.9,
      description:
        "Tilápia preparada na chapa e servido com o delicioso molho tartare.",
      discountPercentage: 18,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/2b157a73-7564-4733-94c1-8d0376e7bb39/202309290923_35GL_i.jpg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      accompaniments: {
        create: [
          {
            label: "Tempero: Tempero Outback, Temperada no sal, Pouco tempero",
          },
          {
            label:
              "Acompanhamento: Garlic Mashed Potato, Jacked Potato, Legumes ao vapor, Fritas, Arroz Pilaf",
          },
        ],
      },
    },
  ];

  for (const product of chickensFishsProducts) {
    await prismaClient.product.create({
      data: product,
    });

    console.log(`Created ${product.name}`);
  }
};

const createMass = async (restaurantId: string, categoryId: string) => {
  await prismaClient.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: {
      categories: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  const massProducts = [
    {
      name: "Mate's Fettuccine Ribs",
      price: 72.9,
      description:
        "Cerca de 200g de fettuccine, cuidadosamente preparado com molho Alfredo, Ribs desfiada com bacon e cogumelos.",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/49c13948-f7fc-461a-b00a-9453989f9d66/202511050832_h6sy4endzak.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Chicken Pasta Primavera",
      price: 74.9,
      description:
        "Fettuccine tradicional al dente com legumes e peito de frango grelhado, refogado com um cremoso molho alfredo e coberto com queijo grana padano.",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/1a862aac-4b20-409a-a6fe-dcf5994470f0/201910181254_gINj_p.jpg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      accompaniments: {
        create: [],
      },
    },
    {
      name: "Steakhouse Pasta",
      price: 89.9,
      description:
        "Fettuccine com champignons, tomates frescos e cortes de filet mignon. Refogado com um toque de vinho chardonnay e black pepper.",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/2b157a73-7564-4733-94c1-8d0376e7bb39/202309290931_N715_i.jpg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Toowoomba Pasta",
      price: 82.9,
      description:
        "Uma mistura caprichada de camarões e champignons, temperada com ervas finas e servida com fettuccine refogado ao molho alfredo. Escolha entre o tempero s",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/2b157a73-7564-4733-94c1-8d0376e7bb39/202309290934_2VX8_i.jpg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      accompaniments: {
        create: [
          {
            label: "Escolha o Tempero: Suave, Intenso",
          },
        ],
      },
    },
  ];

  for (const product of massProducts) {
    await prismaClient.product.create({
      data: product,
    });

    console.log(`Created ${product.name}`);
  }
};

const createDeserts = async (restaurantId: string, categoryId: string) => {
  await prismaClient.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: {
      categories: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  //Categorias dos Doces
  const desertProducts = [
    {
      name: "Brownies from Down Under Ice Cream",
      price: 29.9,
      description:
        "Uma camada do nosso brownie com calda de doce de leite Havanna e outra do brownie Havanna com calda de chocolate, servidas com uma bola de sorvete. Uma explosão de sabor!",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/49c13948-f7fc-461a-b00a-9453989f9d66/202511060309_kj3n6xs0v1.jpeg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      accompaniments: {
        create: [
          {
            label: "Deseja Calda? Chocolate + 5.90",
          },
        ],
      },
    },
    {
      name: "Pecan Crunch Ice Cream",
      price: 20,
      description:
        "Cremoso sorvete de baunilha coberto com nozes caramelizadas e crocantes, finalizado com calda de caramelo. Uma combinação irresistível de sabores e texturas. Vegetariano",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/49c13948-f7fc-461a-b00a-9453989f9d66/202511050832_cqw4epq6q7o.jpeg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      accompaniments: {
        create: [
          {
            label: "Deseja Calda? Chocolate + 5.90",
          },
        ],
      },
    },
    {
      name: "Thunder Brownies",
      price: 14.9,
      description:
        "O delicioso brownie com nozes do nosso famoso Thunder, agora em uma versão exclusiva de delivery para você aproveitar seu #Momentooutbackemcasa. Disponível em dois sabores à sua escolha: Chocolate e Doce de Leite Havanna",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/5221af98-5ad4-42e2-a767-23d1545b82d5/202103161032_A6yd_.jpeg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  ];

  for (const product of desertProducts) {
    await prismaClient.product.create({
      data: product,
    });

    console.log(`Created ${product.name}`);
  }
};

const createAperitives = async (restaurantId: string, categoryId: string) => {
  await prismaClient.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: {
      categories: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
};

const createSteaks = async (restaurantId: string, categoryId: string) => {
  await prismaClient.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: {
      categories: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  // const steakProducts = [
  //   {
  //     name: "Lombo de Boi",
  //     price: 45,
  //     description: description,
  //     discountPercentage: 5,
  //     imageUrl:
  //       "https://utfs.io/f/6e6ad97a-f1f1-4d4b-bb40-f5ff25ba97d4-pr8gxo.png",
  //     restaurant: {
  //       connect: {
  //         id: restaurantId,
  //       },
  //     },
  //     category: {
  //       connect: {
  //         id: categoryId,
  //       },
  //     },
  //   },
  // ];
};

//Categorias dos Sucos / Drinks
const createJuices = async (restaurantId: string, categoryId: string) => {
  await prismaClient.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: {
      categories: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  const juiceProducts = [
    {
      name: "Iced Tea - Chá Preto Tradicional",
      price: 13,
      description:
        "Toda a refrescância e sabor do chá gelado mais incrível, nos sabores pêssego, limão e cranberry. Disponível para o seu #Momentooutbackemcasa. Válido somente em pedidos para viagem ou modalidade Delivery. Não é válido para consumo no restaurante.",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/185e2a09-94cb-49af-88cb-4b0de2df6dc5/202105211512_5H4S_.jpeg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Pink Lemonade 500ml",
      price: 16.9,
      description:
        "Toda a refrescância e sabor do chá gelado mais incrível, nos sabores pêssego, limão e cranberry. Disponível para o seu #Momentooutbackemcasa.Válido somente em pedidos para viagem ou modalidade Delivery. Não é válido para consumo no restaurante.Contém Açúcar|Sem Lactose|Sem Glúten",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/185e2a09-94cb-49af-88cb-4b0de2df6dc5/202105211513_P8D5_.jpeg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Pink Lemonade 1L",
      price: 24.9,
      description:
        "Toda a refrescância e sabor do chá gelado mais incrível, nos sabores pêssego, limão e cranberry. Disponível para o seu #Momentooutbackemcasa.Válido somente em pedidos para viagem ou modalidade Delivery. Não é válido para consumo no restaurante.Contém Açúcar|Sem Lactose|Sem Glúten",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/185e2a09-94cb-49af-88cb-4b0de2df6dc5/202105211513_P8D5_.jpeg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Laramora",
      price: 26.9,
      description:
        "A combinação icônica e exclusiva de Outback pra você finalizar em casa: polpa de morango com suco natural de laranja, em versão de 1 litro. E para deixar seu Laramora ainda mais Outback, sirva primeiro o suco de laranja e depois o suco de morango. A combinação icônica e exclusiva de Outback pra você finalizar em casa: polpa de morango com suco natural de laranja, em versão de 1 litro. E para deixar seu Laramora ainda mais Outback, sirva primeiro o suco de laranja e depois o suco de morango. Válido somente em pedidos para viagem ou modalidade Delivery. Não é válido para consumo no restaurante. Contém Açúcar|Sem Lactose|Sem Glúten",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/185e2a09-94cb-49af-88cb-4b0de2df6dc5/202106151707_JY4Q_.jpeg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Suco de Laranja Outback",
      price: 15,
      description:
        "Suco de laranja 100% natural, como tem que ser. Espremido na hora e não leva conservantes. Disponível na versão de 500ml.",
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/185e2a09-94cb-49af-88cb-4b0de2df6dc5/202106161600_3K8F_.jpeg",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Coca-Cola Lata 350ml",
      price: 9.9,
      description: description,
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/49c13948-f7fc-461a-b00a-9453989f9d66/202511050905_f89engpaiog.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Schweppes Tônica 350ml",
      price: 9.9,
      description: description,
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/5221af98-5ad4-42e2-a767-23d1545b82d5/202105130935_1Y60_f.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Suco Del Valle 290ml",
      price: 8.9,
      description: description,
      discountPercentage: 0,
      imageUrl:
        "https://static.ifood-static.com.br/image/upload/t_medium/pratos/49c13948-f7fc-461a-b00a-9453989f9d66/202511050832_zlrejflpg58.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  ];

  for (const product of juiceProducts) {
    await prismaClient.product.create({
      data: product,
    });

    console.log(`Created ${product.name}`);
  }
};

const main = async () => {
  const desertsCategory = await prismaClient.category.create({
    data: {
      name: "Sobremesas",
      imageUrl:
        "https://utfs.io/f/0f81c141-4787-4a81-abce-cbd9c6596c7a-xayf5d.png",
      order: 5,
    },
  });

  const premiumBurgersCategory = await prismaClient.category.create({
    data: {
      name: "Premium Burgers (inclui acompanhamento)",
      imageUrl:
        "https://utfs.io/f/d84e3a7a-fcf6-4d3d-86bf-d62c0b1febdc-m1yv44.png",
      order: 6,
    },
  });

  const chickensFishsCategory = await prismaClient.category.create({
    data: {
      name: "Frangos & Peixes",
      imageUrl:
        "https://utfs.io/f/d84e3a7a-fcf6-4d3d-86bf-d62c0b1febdc-m1yv44.png",
      order: 7,
    },
  });

  const massCategory = await prismaClient.category.create({
    data: {
      name: "Massas",
      imageUrl:
        "https://utfs.io/f/d84e3a7a-fcf6-4d3d-86bf-d62c0b1febdc-m1yv44.png",
      order: 4,
    },
  });

  //await createBurguers(desertsCategory.id, juicesCategory.id);
  // await createPizzas(desertsCategory.id, juicesCategory.id);
  // await createJapanese(desertsCategory.id, juicesCategory.id);
  await createOutbackMenu(
    desertsCategory.id,
    premiumBurgersCategory.id,
    chickensFishsCategory.id,
    massCategory.id,
  );
};

main()
  .then(() => {
    console.log("Seed do banco de dados realizado com sucesso!");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
