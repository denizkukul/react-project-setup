const createHeader = (body) => {
    const header = document.createElement('div');
    header.innerText = 'HEADER';
    body.appendChild(header);
}

export default createHeader;