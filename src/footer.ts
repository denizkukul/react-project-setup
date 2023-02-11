const footer = document.querySelector('footer');

interface I {
    name: string | number
    id: number
}

const data: I = {
    name: 'FOOTER',
    id: 12
}

const renderFooter = () => {
    const element = document.createElement('div');
    element.innerText = data.name + '';
    footer!.appendChild(element);
}

export default renderFooter;