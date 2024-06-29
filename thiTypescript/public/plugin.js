const elementPlugin = document.querySelector('#plugin');
const iconElement = document.createElement('div');
const contentElement = document.createElement('div');
const iframeElement = document.createElement('iframe');

function handleCLickEventIconPluginApp(e) {
    let dataShow = JSON.parse(e.currentTarget.dataset.click_show);
    e.currentTarget.dataset.click_show = true;
    elementPlugin.classList.toggle('show-plugin-content');
    contentElement.classList.toggle('content-show');

    if (!dataShow) {
        contentElement.appendChild(iframeElement);
        iframeElement.src = 'http://localhost:5173/chat';
        dataShow = !dataShow;
    }
}

function startPluginApp() {
    iconElement.className = 'icon-plugin';
    iconElement.dataset.click_show = false;
    iconElement.addEventListener('click', handleCLickEventIconPluginApp);
    iframeElement.allow = 'microphone; fullscreen';
    iconElement.innerHTML = `
        <div style="display: flex; align-items:center; gap: 6px; padding: 4px 6px; color: #fff">
            <span>Robox AI</span>
            <img src="https://cdn-icons-png.freepik.com/512/8593/8593325.png" alt="chat icon" />
        </div>
    `;

    contentElement.className = 'content-chat';
    elementPlugin.appendChild(contentElement);
    elementPlugin.appendChild(iconElement);
}

if (elementPlugin) {
    startPluginApp();
}
