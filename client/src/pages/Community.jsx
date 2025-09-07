import React, { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { useUser } from "@clerk/clerk-react" // adjust if you're using another auth

// Temporary dummy data (replace with API later)
const dummyPublishedCreationData = [
  {
    content: "https://picsum.photos/400/300",
    prompt: "A sample AI-generated creation",
    likes: ["user1", "user2"],
  },
  {
    content: "https://picsum.photos/500/350",
    prompt: "Another sample creation",
    likes: ["user3"],
  },
]

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()

  const fetchCreation = async () => {
    setCreations(dummyPublishedCreationData)
  }

  useEffect(() => {
    if (user) {
      fetchCreation()
    }
  }, [user])

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-lg font-semibold">Creations</h1>

      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-3">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group inline-block pl-3 pt-3 w-full sm:w-1/2 lg:w-1/3"
          >
            <img
              src={creation.content}
              alt="creation"
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute bottom-0 top-0 right-0 left-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
              <div className="flex flex-col gap-2">
                <p className="text-sm hidden group-hover:block">
                  {creation.prompt}
                </p>

                <div className="flex items-center gap-2">
                  <p>{creation.likes.length}</p>
                  <Heart
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      creation.likes.includes(user?.id)
                        ? "fill-red-500 text-red-600"
                        : "text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community
