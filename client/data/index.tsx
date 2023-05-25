
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  quantity: number;
  imageUrl?: string;
  size?: string;
  Color: string;
}

export interface CartItem extends Product {
  size: string;
}


/**
 * function that returns a unique Id, both numbers and letters
 */
export const generateId = () => {
  const newId = Math.floor(1 + Math.random() * 0x1000)
    .toString(16)
    .substring(1);
  return newId;
};



export const products: Product[] = [
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/152552201000_10.jpg",
    title: "Adidas Galaxy 6 M",
    description:
      "Dessa löparinspirerade sneakers från adidas har en ventilerande ovandel i syntet som låter foten andas och känns bekväm redan från första användning. Mellansulan i Cloudfoam tillsammans med Ortholite-inlägg ger en mjuk och härlig känsla hela dagen lång. Yttersulan i gummi ger utmärkt grepp och hållbarhet.",
    price: 599,
    id: "e1",
    Color: 'Black'&& 'White',
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/153879201000_10.jpg",
    title: "Adidas ALPHABOOST V1 BOOST",
    description:
      "Ett par tuffa sneakers med löparinspirerad design från adidas. Ovandelen i mesh låter fötterna andas, med snörning som ger bekväm passform. Mellansulan är utrustad med Boost, Adiprene+ och Bounce som ger utmärkt stötdämpning och fjädrande energiåtergivning. Yttersulan är gjord i slittålig Adiwear™ som klarar av daglig användning.",
    price: 1299,
    id: "e2",
    Color: 'White',
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/154127401000_10.jpg",
    title: "New Balance",
    description:
      "New Balance CT574 är den osannolika ikonen bland sneakers. Den har en pålitlig konstruktion med innovativa tekniker och framtagen med premiummaterial. Ovandelen är gjord i en stilsäker kombination av mocka och ventilerande mesh med den klassiska loggan längs sidan. Den sömlösa mellansulan ger bekväm dämpning och hög komfort hela dagen. Tålig yttersula i gummi med bra markgrepp.",
    price: 999,
    id: "e3",
    Color: 'Green' && 'Blue',
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/154533801000_10.jpg",
    title: "VANS Filmore Decon",
    description:
      "Ett par snygga sneakers från Vans som passar perfekt till vardags. Skorna har ovandel i canvas och yttersula i gummi. En tidlös design som funkar till alla typer av vardagsoutfits!",
    price: 699,
    id: "e4",
    Color: 'Brown',
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/154756402000_10.jpg",
    title: "HOKA Bondi L GTX",
    description:
      "Bondi L GTX från Hoka One One är den nya medlemmen i den populära Bondi-familjen. Skorna har en tidlös design med en ovandel i vattentätt läder och ett GORE-TEX-membran som stänger ute väta och håller fötterna torra. Mellansula i EVA ger en lätt dämpning för ett mjukare steg. Yttersulan i slitstarkt gummi som tål blöta underlag.",
    price: 2599,
    id: "e5",
    Color: 'Blue',
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/140319501000_10.jpg",
    title: "McKinley Tirano NB",
    description:
      "Den klassiska kängan i nubuck är en stilren och robust sko som är idealisk för kallare väderförhållanden. Nubuck är en mjukare variant av läder som ger en smidig och bekväm passform. Skon är varmfodrad för att hålla dina fötter varma under kyliga dagar och vintermånader. Vadderad krage för bekväm passform. Gummisula.",
    price: 699,
    id: "e6",
    Color: 'Beige',
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/150856801000_10.jpg",
    title: "TIMBERLAND Sprint Trekker",
    description:
      "Kängor från Timberland som passar utmärkt för långvandrare som vill ha en bekväm och funktionell sko. Kängorna är tillverkade med en ovandel i ReBOTL™-material som innehåller 50 % återvunnen plast och premium nubuckläder. För en ökad komfort är kängorna utrustade med OrthoLite®-fotbädd som ger dig maximal dämpning när du är ute på dina friluftsaktiviteter.",
    price: 1299,
    id: "e7",
    Color: 'Beige',
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/154527301000_10.jpg",
    title: "NIKE Air Max Impact 4",
    description:
      "Air Max Impact 4 är ett par lätta och smidiga basketskor från Nike med gummi som omsluter sidorna för extra slitstyrka och stabilitet. Max Air-dämpningen i hälen ger utmärkt stötdämpning i landningen. Yttersulan i gummi med fiskbensmönster ger utmärkt grepp vid snabba rörelser upp och ned för basketplan. Diamantformade utskärningar exponerar skummaterialet och ger en mindre vikt.",
    price: 1149,
    id: "e8",
    Color: 'Black',
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/154875501000_10.jpg",
    title: "SALMING Rebel M",
    description:
      "Rebel är en stabil padelsko för kvinnor från Salming med en låg vikt så att du kan röra dig snabbt över banan och följa spelets snabba vändningar. RebelSKINN är ett tunt syntetlager som täcker hela ovandelen och håller foten på plats och ger ökad stabilitet. Mellansulan med D30-material ger stötdämpning i hälisättningen och ökad komfort. Den slitstarka yttersulan har ett fiskbensmönster som ger utmärkt grepp på padelbanan så att du kan fokusera på ditt spel utan att riskera att tappa fotfästet. Fungerar även till tennis.",
    price: 999,
    id: "e9",
    Color: 'Black',
  },
];
