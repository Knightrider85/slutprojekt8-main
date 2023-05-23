import mongoose, { Document, Schema, Types } from "mongoose";

export interface Product extends Document {
    image: string;
    title: string;
    description: string;
    price: number;
    imageId: Types.ObjectId;
    id: string;
    stock: number;
    categories: string[];
    quantity?: number;
  }
  
  const ProductSchema = new Schema<Product>(
    {
      image: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      imageId: { type: Schema.Types.ObjectId, required: true },
      id: { type: String, required: true },
      stock: { type: Number, required: true },
      categories: { type: [String], required: true },
      quantity: { type: Number },
    },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("imageUrl").get(function () {
  return "/api/media/" + this.imageId;
});

export const ProductModel = mongoose.model<Product>("Product", ProductSchema);

const products: Product[] = [
    {
        image: "https://cdn.intersport.se/productimages/690x600/152552201000_10.jpg",
        title: "Adidas Galaxy 6 M",
        description:
          "Dessa löparinspirerade sneakers från adidas har en ventilerande ovandel i syntet som låter foten andas och känns bekväm redan från första användning. Mellansulan i Cloudfoam tillsammans med Ortholite-inlägg ger en mjuk och härlig känsla hela dagen lång. Yttersulan i gummi ger utmärkt grepp och hållbarhet.",
        price: 599,
        imageId: new mongoose.Types.ObjectId("i1"),
        id: "e1",
        stock: 10,
        categories: ["sneakers"],
        quantity: 0,
    },
    {
      image: "https://cdn.intersport.se/productimages/690x600/153879201000_10.jpg",
      title: "Adidas ALPHABOOST V1 BOOST",
      description:
        "Ett par tuffa sneakers med löparinspirerad design från adidas. Ovandelen i mesh låter fötterna andas, med snörning som ger bekväm passform. Mellansulan är utrustad med Boost, Adiprene+ och Bounce som ger utmärkt stötdämpning och fjädrande energiåtergivning. Yttersulan är gjord i slittålig Adiwear™ som klarar av daglig användning.",
      price: 1299,
      imageId: new mongoose.Types.ObjectId('i2'),
      id: "e2",
      stock: 5,
      categories: ["sneakers"],
      quantity:0,
    },
    {
      image: "https://cdn.intersport.se/productimages/690x600/154127401000_10.jpg",
      title: "New Balance",
      description:
        "New Balance CT574 är den osannolika ikonen bland sneakers. Den har en pålitlig konstruktion med innovativa tekniker och framtagen med premiummaterial. Ovandelen är gjord i en stilsäker kombination av mocka och ventilerande mesh med den klassiska loggan längs sidan. Den sömlösa mellansulan ger bekväm dämpning och hög komfort hela dagen. Tålig yttersula i gummi med bra markgrepp.",
      price: 999,
      imageId: new mongoose.Types.ObjectId('i3'),
      id: "e3",
      stock: 2,
      categories: ["sneakers"],
      quantity:0,
    },
    {
      image: "https://cdn.intersport.se/productimages/690x600/154533801000_10.jpg",
      title: "VANS Filmore Decon",
      description:
        "Ett par snygga sneakers från Vans som passar perfekt till vardags. Skorna har ovandel i canvas och yttersula i gummi. En tidlös design som funkar till alla typer av vardagsoutfits!",
      price: 699,
      imageId: new mongoose.Types.ObjectId('i4'),
      id: "e4",
      stock: 8,
      categories: ["sneakers"],
      quantity:0,
    },
    {
        image: "https://cdn.intersport.se/productimages/690x600/154756402000_10.jpg",
    title: "HOKA Bondi L GTX",
    imageId: new mongoose.Types.ObjectId('i5'),
    description: "Bondi L GTX från...",
    price: 1499,
    id: "e5",
    stock: 3,
    categories: ["sneakers"],
    quantity:0,
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/140319501000_10.jpg",
    title: "McKinley Tirano NB",
    description:
      "Den klassiska kängan i nubuck är en stilren och robust sko som är idealisk för kallare väderförhållanden. Nubuck är en mjukare variant av läder som ger en smidig och bekväm passform. Skon är varmfodrad för att hålla dina fötter varma under kyliga dagar och vintermånader. Vadderad krage för bekväm passform. Gummisula.",
    price: 699,
    id: "e6",
    stock: 6,
    imageId: new mongoose.Types.ObjectId('i6'),
    categories: ["sneakers"],
    quantity:0,
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/150856801000_10.jpg",
    title: "TIMBERLAND Sprint Trekker",
    description:
      "Kängor från Timberland som passar utmärkt för långvandrare som vill ha en bekväm och funktionell sko. Kängorna är tillverkade med en ovandel i ReBOTL™-material som innehåller 50 % återvunnen plast och premium nubuckläder. För en ökad komfort är kängorna utrustade med OrthoLite®-fotbädd som ger dig maximal dämpning när du är ute på dina friluftsaktiviteter.",
    price: 1299,
    id: "e7",
    imageId: new mongoose.Types.ObjectId('i7'),
    stock: 6,
    categories: ["sneakers"],
    quantity:0,
  },
  {
    image:
      "https://cdn.intersport.se/productimages/690x600/154527301000_10.jpg",
    title: "NIKE Air Max Impact 4",
    description:
      "Air Max Impact 4 är ett par lätta och smidiga basketskor från Nike med gummi som omsluter sidorna för extra slitstyrka och stabilitet. Max Air-dämpningen i hälen ger utmärkt stötdämpning i landningen. Yttersulan i gummi med fiskbensmönster ger utmärkt grepp vid snabba rörelser upp och ned för basketplan. Diamantformade utskärningar exponerar skummaterialet och ger en mindre vikt.",
    price: 1149,
    id: "e8",
    imageId: new mongoose.Types.ObjectId('i8'),
    stock: 6,
    categories: ["sneakers"],
    quantity:0,
  },
      {
        image:
        "https://cdn.intersport.se/productimages/690x600/154875501000_10.jpg",
      title: "SALMING Rebel M",
      description:
        "Rebel är en stabil padelsko för kvinnor från Salming med en låg vikt så att du kan röra dig snabbt över banan och följa spelets snabbavändningar. RebelSKINN är ett tunt syntetlager som täcker hela ovandelen och håller foten på plats och ger ökad stabilitet. Mellansulan med D30-material ger stötdämpning i hälisättningen och ökad komfort. Den slitstarka yttersulan har ett fiskbensmönster som ger utmärkt grepp på padelbanan så att du kan fokusera på ditt spel utan att riskera att tappa fotfästet. Fungerar även till tennis.",
        price: 999,
        id: "e9",
        imageId: new mongoose.Types.ObjectId('i9'),
        stock: 6,
        categories: ["sneakers"],
        quantity:0,
      },
    ];
    
  
  // Create and save the products in the database
  products.forEach((productData) => {
    const product = new ProductModel(productData);
    product
      .save()
      .then((savedProduct) => {
        console.log('Saved product:', savedProduct);
      })
      .catch((error) => {
        console.error('Error saving product:', error);
      });
  });
  
  export default ProductModel;
  