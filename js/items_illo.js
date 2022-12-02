const posts = [];

const images = [
  "../img/illos/grapes.png",
  "../img/illos/asianglow.png",
  "../img/illos/airport.png",
  "../img/illos/afloat.png",
  "../img/illos/thebarista.png",
  "../img/illos/pittsburgh.png",
  "../img/illos/readmylips.png",
  "../img/illos/pancake.png",
  "../img/illos/bunny.png",
  "../img/illos/avoidburnout.png",
  "../img/illos/faucet.png",
  "../img/illos/thefashionista.png",
  "../img/illos/fantasist.jpg",
  "../img/illos/pool.png",
  "../img/illos/airplane.png",
];

let imageIndex = 0;

for (let i = 1; i <= images.length; i++) {
  let item = {
    id: i,
    image: images[imageIndex],
  };
  posts.push(item);
  imageIndex++;
  if (imageIndex > images.length - 1) imageIndex = 0;
}
