import React, { useState } from 'react'
import { Eraser, Sparkles } from 'lucide-react'

const RemoveBackground = () => {
  const [input, setInput] = useState(null)   // store uploaded file
  const [preview, setPreview] = useState(null)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (!input) return
    // Later: send file to background removal API
    console.log("File submitted:", input)
  }

  // Show preview when file selected
  const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setInput(file)
      setPreview(URL.createObjectURL(file)) // create local preview
    }
  }

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          onChange={onFileChange}
          type="file"
          accept="image/*"
          className="w-full p-2 mt-2 outline-none text-sm border border-gray-300 rounded-md text-gray-600"
          required
        />
        <p className="text-xs text-gray-500 font-light mt-1">
          Supported: JPG, PNG and other image formats
        </p>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          <Eraser className="w-5" />
          Remove background
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Eraser className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          {preview ? (
            <img
              src={preview}
              alt="Uploaded preview"
              className="max-h-80 rounded-lg shadow"
            />
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Eraser className="w-9 h-9" />
              <p>Upload an image and click "Remove Background" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground
