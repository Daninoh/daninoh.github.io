const posts = []

const images = [
    'img/draw/jfkpark.jpeg',
    'img/draw/dancers.png',
    'img/draw/tipsytula.jpeg',
    'img/draw/lion.png',
    'img/draw/jonandrussell.jpeg',
    'img/draw/bones.png'
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

