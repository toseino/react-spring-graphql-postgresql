const handleOpenPdf = (url) => {
    if (url) {
        console.log(`url: \${url}`);
        const newWindow = window.open(url, "_blank");
    } else {
        console.log(`url: \${url}`);
        alert("URL is null");
    }
};

export default handleOpenPdf;