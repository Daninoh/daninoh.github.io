const posts = []

const images = [
    'img/illo/wes.jpg',
    'img/illo/asianglow.png',
    'img/illo/airport.png',
    'img/illo/afloat.png',
    'img/illo/thebarista.png',
    'img/illo/pittsburgh.png',
    'img/illo/readmylips.png',
    'img/illo/pancake.png',
    'img/illo/bunny.png',
    'img/illo/avoidburnout.png',
    'img/illo/faucet.png',
    'img/illo/thefashionista.png',
    'img/illo/fantasist.jpg',
    'img/illo/pool.png',
    'img/illo/airplane.png',
]

let imageIndex = 0;

for(let i = 1; i <= images.length; i++){
    let item = {
        id: i,
        image: images[imageIndex]
    }
    posts.push(item);
    imageIndex++;
    if (imageIndex > images.length - 1) imageIndex = 0;
}

