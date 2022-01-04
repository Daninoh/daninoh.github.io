

const posts = []

const images = [
    'img/draw/jfkpark.jpeg',
    'img/draw/dancers.jpeg',
    'img/draw/tipsytula.jpeg',
    'img/draw/lion.jpeg',
    'img/draw/bones.jpeg',
    'img/draw/jonandrussell.jpeg'
]

let imageIndex = 0;

for(let i = 1; i <= images.length; i++){
    let item = {
        id: i,
        // title: `Post ${i}`,
        image: images[imageIndex]
    }
    posts.push(item);
    imageIndex++;
    if (imageIndex > images.length - 1) imageIndex = 0;
}

// console.log(posts)