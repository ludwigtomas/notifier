function imageExists(url) {
    try {
        const http = new XMLHttpRequest()
        http.open('HEAD', url, false)
        http.send()
        return http.status !== 404
    } catch {
        return false
    }
}

function isImage(image_url) {
    if (image_url && imageExists(image_url)) {
        return image_url
    } else {
        return 'https://ui-avatars.com/api/?name=GG&background=00000&color=fff'
    }
}

export { isImage }
