const {app, BrowserWindow} = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    // win.loadFile('dist/index.html')
    win.loadURL("https://beta.1.ink/")
    win.addEventListener('DOMContentLoaded', () => {
        const replaceText = (selector, text) => {
            const element = document.getElementById(selector)
            if (element) element.innerText = text
        }

        for (const dependency of ['chrome', 'node', 'electron']) {
            replaceText(`${dependency}-version`, process.versions[dependency])
        }
    })
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


