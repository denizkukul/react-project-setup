import './header.css';
const headerElement = document.querySelector('header');

const renderHeader = () => {
    const header = document.createElement('div');
    header.innerText = 'HEADER';
    headerElement.appendChild(header);
}

export default renderHeader;