
  export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    tokenURI: string;
  }
  export const products: Product[] = [
    { id: 0, name: "WALK HKUST", price: 9999.99, image: "/image/hkust_coin.jpg?height=200&width=200", tokenURI: "https://bafybeids6ag6wxwrut33dzl3velonilr5rm7exq7ju3hlktpv7iua7gbsi.ipfs.w3s.link/hkust_coin.jpg" },
    { id: 1, name: "Product 1", price: 0.99, image: "/image/1.jpg?height=200&width=200", tokenURI: "https://bafybeids6ag6wxwrut33dzl3velonilr5rm7exq7ju3hlktpv7iua7gbsi.ipfs.w3s.link/1.jpg" },
    { id: 2, name: "Product 2", price: 6.99, image: "/image/2.jpg?height=200&width=200", tokenURI: "https://bafybeihobek5do7h7qx6xa2rshaer5pjqo6sgxyzds4nwbzfjwyp4h4d7a.ipfs.w3s.link/2.jpg" },
    // { id: 3, name: "Product 3", price: 6.99, image: "/image/3.jpg?height=200&width=200", tokenURI: "https://bafybeifx4rfc3zy22ufopwrkgz2b7ippw6atgneeuoebfxw4at3nkqbqse.ipfs.w3s.link/3.jpg" },
    { id: 4, name: "Product 4", price: 9.99, image: "/image/4.jpg?height=200&width=200", tokenURI: "https://bafybeiec3cbyprirup5rdklvhhzhpgvz4iz4xgybahic4qya3mgoes4wgi.ipfs.w3s.link/4.jpg" },
    { id: 5, name: "Product 5", price: 29.99, image: "/image/5.jpg?height=200&width=200", tokenURI: "https://bafybeigilq7ase3ziv45b5uvp6opxa253e2f3p4rjmkbeeyx3wiczqnlhu.ipfs.w3s.link/5.jpg" },
    { id: 6, name: "Product 6", price: 69.99, image: "/image/6.jpg?height=200&width=200", tokenURI: "https://bafybeiapqslkkfh77kuuarh3ea4fcaui6agy6wvpbcmf47746mkjvzlsbq.ipfs.w3s.link/6.jpg" },
    { id: 7, name: "Product 7", price: 79.99, image: "/image/7.jpg?height=200&width=200", tokenURI: "https://bafybeicj4mepvyynzoxpzlandfh5vdztf3s6seoj7qwm2nv7utb53ewk3u.ipfs.w3s.link/7.jpg" },
    { id: 8, name: "Product 8", price: 89.99, image: "/image/8.jpg?height=200&width=200", tokenURI: "https://bafybeihsfcwwq6vnzhjsqvisqzrsutfpgcvp443itis7ahvvq2bejtjlva.ipfs.w3s.link/8.jpg" },
    { id: 9, name: "Product 9", price: 99.99, image: "/image/9.jpg?height=200&width=200", tokenURI: "https://bafybeicgsxfrp3aoqbfbcqnofjpa3foeknyywh5j5cyxhafcsivka2indy.ipfs.w3s.link/9.jpg" },
    { id: 10, name: "Product 10", price: 109.99, image: "/image/10.jpg?height=200&width=200", tokenURI: "https://bafybeig2y4s3cvtaeoedpyyadcs56duo24bgl35ohzmavc64mj2kupg7lq.ipfs.w3s.link/10.jpg" },
    { id: 11, name: "Product 1", price: 109.99, image: "/image/11.jpg?height=200&width=200", tokenURI: "https://bafybeifweboj5uam35jl4hqcz357pmhn47h6f54xkz7hhkhdcirezpzbaq.ipfs.w3s.link/11.jpg" },
    { id: 12, name: "Product 2", price: 119.99, image: "/image/12.jpg?height=200&width=200", tokenURI: "https://bafybeigdieasohussnshfvoz4oas6k3p4yfhr76nggcsp6vzcx3wgtflpy.ipfs.w3s.link/12.jpg" },
    { id: 13, name: "Product 3", price: 169.99, image: "/image/13.jpg?height=200&width=200", tokenURI: "https://bafybeifpzmh7j6cpop6ksyekkellznm772duvxd57hrtcdoz5uf3ux5n7u.ipfs.w3s.link/13.jpg" },
    { id: 14, name: "Product 4", price: 269.99, image: "/image/14.jpg?height=200&width=200", tokenURI: "https://bafybeif47olwlahhf4v4muzkzku5ke3ktkhzdah3byc433yly2qdl6jgpm.ipfs.w3s.link/14.jpg" },
    { id: 15, name: "Product 5", price: 369.99, image: "/image/15.jpg?height=200&width=200", tokenURI: "https://bafybeiftdgvbmanmahtixg76eqvljqwkhhdxajkviklgdikcjbzqe3sgsq.ipfs.w3s.link/15.jpg" },
    { id: 16, name: "Product 6", price: 399.99, image: "/image/16.jpg?height=200&width=200", tokenURI: "https://bafybeihpxy5tfg3zgtxotzx7f5qxmqquhllougv3stn4fjfxb53lok4eem.ipfs.w3s.link/16.jpg" },
    { id: 17, name: "Product 7", price: 699.99, image: "/image/17.jpg?height=200&width=200", tokenURI: "https://bafybeiauo6rtr2yhjuddcmtv2fnrmy7h77wxbyjet7bcbukc5qgvruqli4.ipfs.w3s.link/17.jpg" },
    { id: 18, name: "Product 8", price: 799.99, image: "/image/18.jpg?height=200&width=200", tokenURI: "https://bafybeigckoelvkcmfamranksfmn6el35dkv534wodfk3nsotzgzbw6l27m.ipfs.w3s.link/18.jpg" },
    { id: 19, name: "Product 9", price: 899.99, image: "/image/19.jpg?height=200&width=200", tokenURI: "https://bafybeig654hnwfgnkh3owecu5o3fqxliqogicqf5rnbksmnbmk2qtwnywi.ipfs.w3s.link/19.jpg" },
    { id: 20, name: "Product 10", price: 999.99, image: "/image/20.jpg?height=200&width=200", tokenURI: "https://bafybeiedkdyyjdz3y3hnnqodd25dfrwk4dpw2dgw4b4sdy465btnf4xui4.ipfs.w3s.link/20.jpg" },
    { id: 21, name: "RWA 1", price: 1999.99, image: "/image/RWA1.jpg?height=200&width=200", tokenURI: "https://bafybeiezh2ukrl3ahtnwvyk3ufm6265wzpbp3lvrhjrz2kvxnqv222c4dy.ipfs.w3s.link/RWA1.jpg" },
    { id: 22, name: "RWA 2", price: 2999.99, image: "/image/RWA2.jpg?height=200&width=200", tokenURI: "https://bafybeid3cfqdnglydbu3mov7w4u755o5oznbvmj5eipuse5px2gyklqnmi.ipfs.w3s.link/RWA2.jpg" },
    { id: 23, name: "RWA 3", price: 3999.99, image: "/image/RWA3.jpg?height=200&width=200", tokenURI: "https://bafybeibbjldnv3xasoo4wglm2ohscncibtbwiuvpoukmsbvud7pniin434.ipfs.w3s.link/RWA3.jpg" },
    { id: 24, name: "RWA 4", price: 6999.99, image: "/image/RWA4.jpg?height=200&width=200", tokenURI: "https://bafybeicyfe7vkwyukyc72puxwh6z66omhd6ruq2tdylzgj7gvzdhi6o5t4.ipfs.w3s.link/RWA4.jpg" },
    { id: 25, name: "RWA 5", price: 9999.99, image: "/image/RWA5.jpg?height=200&width=200", tokenURI: "https://bafybeihbf33heejeccmv6pblmwvq5icjt7yigk2kjatoxoqan4negiuesi.ipfs.w3s.link/RWA5.jpg" }
  ];
  
  