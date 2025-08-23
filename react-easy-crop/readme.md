## Ques: Why you use Callback inside the onCropComplete function:
Ans: react-easy-crop fires the onCropComplete event every time the crop or zoom changes.
It gives you two things:
croppedArea → in percentage (relative to the image size)
croppedAreaPixels → in pixels (the actual values you’ll use to crop the image on canvas)
Why wrap it useCallback - Without useCallback, React re-creates a new function on every render.
Since <Cropper> internally compares props with ===, it would think onCropComplete changed every render → this can cause unnecessary re-renders or even reset the cropper.
By wrapping in useCallback, we memoize it: