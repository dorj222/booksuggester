export default function GenerateBackground() {
    const getRandomInt = Math.floor(Math.random() * 100) + 155;
    const getRandomInt2 = Math.floor(Math.random() * 100) + 155;
    const getRandomInt3 = Math.floor(Math.random() * 100) + 155;
    return `rgb(${getRandomInt},${getRandomInt2},${getRandomInt3})`;
  }