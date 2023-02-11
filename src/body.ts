import './header.css';
const content = document.querySelector('main');

interface I {
    name: string | number
    id: number
}

const data: I = {
    name: 'BODY',
    id: 12
}

const renderBody = () => {
    const element = document.createElement('div');
    element.innerText = data.name + '';
    content!.appendChild(element);
}

export default renderBody;