function isImages(avatar, name) {
    if (avatar && imageExists(avatar)) {
        return `/storage/avatars/${avatar}`
    } else {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`
    }
}

export { isImages }
