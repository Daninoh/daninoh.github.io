const posts = [];

const images = [
  "img/illustrations/wes.jpg",
  "img/illustrations/asianglow.png",
  "img/illustrations/airport.png",
  "img/illustrations/afloat.png",
  "img/illustrations/thebarista.png",
  "img/illustrations/pittsburgh.png",
  "img/illustrations/readmylips.png",
  "img/illustrations/pancake.png",
  "img/illustrations/bunny.png",
  "img/illustrations/avoidburnout.png",
  "img/illustrations/faucet.png",
  "img/illustrations/thefashionista.png",
  "img/illustrations/fantasist.jpg",
  "img/illustrations/pool.png",
  "img/illustrations/airplane.png",
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
