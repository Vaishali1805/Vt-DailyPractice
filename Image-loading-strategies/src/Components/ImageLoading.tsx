//By adding the loading attribute, the browser loads only the images that are currently visible on the screen. so, image loading colpletely depends on the browser.

const ImageLoading = () => {
  return (
    <div>
        <h1>Using Attribute Loading in the img tag</h1>
        <img src="/girl.jpg" alt="Image 1" style={{width: "80vw", height: "80vh"}} loading='lazy' />
        <img src="/honey-bee.webp" alt="Image 2" style={{width: "80vw", height: "80vh"}} loading='lazy' />
        <img src="/person.jpg" alt="Image 3" style={{width: "80vw", height: "80vh"}} loading='lazy' />
        <img src="/random_facts.jpg" alt="Image 4" style={{width: "80vw", height: "80vh"}} loading='lazy' />
        <img src="/random_wallpaper.jpg" alt="Image 5" style={{width: "80vw", height: "80vh"}} loading='lazy' />
        <img src="/scenery.jpg" alt="Image 6" style={{width: "80vw", height: "80vh"}} loading='lazy' />
    </div>
  )
}

export default ImageLoading;