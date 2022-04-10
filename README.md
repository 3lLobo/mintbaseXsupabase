# Mintbase X Supabase

We are a team of two fullstacq devs and blockchain enthusiasts, [TheReshma](https://github.com/TheReshma) and [3lLobo](https://github.com/3lLobo).
Our project is an app which lets you browse, like and comment NFTs from Mintbase on the NEAR blockchain, equipped with light 🌞 and dark 🌙 mode.
We chose NEAR because it lives up to the promises of web3, it brings all the features, security and performance of Ethereum v2 with the advantage that it's already here and ready to use.
Through my background in AI, I have my own love/hate relationship with graphs and was all-in when I saw this hackathon announced🤿

The app pulls NFTs as graphdata from the public Mintbase graph, uses Supabase Auth to manage users and Supabase tables for the NFT, Like and Comment data. The graphQL plugin enables fetching and posting data in a powerful and effective way.

## How to use

Log in with your google account. Your name provided by Google will be used as your id for likes and comments.
Browse the feed of latest Minbase NFTs on the test- or mainnet. A click on the image will open a magnified Card with the NFT image and description.
Like or Dislike each NFT just like in the old days when having prejudice wasn't a crime and judging the worq of others was the most fun thing to do with your friends.
For the BDP folks, we implemented a non-tracable way to change or delete your Like/Dislike for when you change your mind.

The cherry of human interaction is verbal, thus let lose and Comment your unasked opinion and/or read other users brainfarts 💨 but keep in mind that those are meant for eternity. Just imagine how much more fun Twitter would be if no1 could edit or delete your posts ✨

With the 'favorite' button you can save an NFT and find it back later on the 'Favorites' page.
One click on the NFTs avatar will send you to the corresponding Mintbase Store, where you can even buy and be the new proud owner of your fav NFTs. No worries, we also have full understanding if you're broke and prefer to screenshot. Life is about living and letting live.
This leads me to round up with this decription with a question to the Supabase hackathon organizers:

`Which trees are you planting for these project? My preference are Ombu trees.`

That being said, I hope you mint some dope NFTs of those trees so we can judge them here 🍵


### Live demo

[nftea-base.netlify.app](nftea-base.netlify.app)

## RoadMap

1. User auth with github/google.
2. Pull NFTs from mintbase.
3. Create feed with like and comment option.
4. Create supabase db with NFTid, likes, comment/by user.
5. Option to chose NFT as avatar -> save ipfs url as avatar 🦊

