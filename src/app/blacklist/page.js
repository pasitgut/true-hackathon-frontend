

    export default function Blacklist() {

        const blockedWebsites = [
  {
    name: "www.facebook.com",
    logo: "https://www.facebook.com/favicon.ico",
  },
  {
    name: "www.youtube.com",
    logo: "https://www.youtube.com/favicon.ico",
  },
  {
    name: "www.tiktok.com",
    logo: "https://www.tiktok.com/favicon.ico",
  },
  {
    name: "www.roblox.com",
    logo: "https://www.roblox.com/favicon.ico"
  },
  {
    name: "www.instagram.com",
    logo: "https://www.instagram.com/favicon.ico"
  },
  {
    name: "www.google.com",
    logo: "https://www.google.com/favicon.ico"
  },
  {
    name: "www.x.com",
    logo: "https://www.x.com/favicon.ico"
  }
];
        return (
            <>
            <div className="flex h-[150px] bg-blue-500 mt-2 mx-2 rounded-lg"> </div>
                <div className="flex max-w-md mx-auto">
                    <input
    type="search"
    placeholder="Search..."
    className="w-full h-[50px] bg-[#505050] my-2 mx-2 rounded-lg px-4 text-white placeholder-white focus:outline-none"
    />

                </div>
                <div className="max-w-md mx-auto w-full px-2">
                    <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 my-2">
                        <img src="https://www.google.com/favicon.ico" 
                        alt="Website Logo"
                        className="w-8 h-8 rounded mr-4" />
                        <span className="text-gray-800 font-medium">www.google.com</span>
                    </div>

                    <div className="flex items-center my-4 px-4">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="mx-4 text-gray-600 text-sm">Blocked List</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>
 {/* Blocked List */}
      <div className="max-w-md mx-auto w-full px-2 pb-24">
  {blockedWebsites.map((site, index) => (
    <div
      key={index}
      className="flex items-center bg-red-100 rounded-lg shadow px-4 py-2 my-2"
    >
      <img
        src={site.logo}
        alt="Website Logo"
        className="w-8 h-8 rounded mr-4"
      />
      <span className="text-red-800 font-medium">{site.name}</span>
    </div>
  ))}
</div>


      
      {/* Floating Buttons - Centered at Bottom, Row Layout */}
<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg">
    Limited Access
  </button>
  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg">
    Block Website
  </button>
</div>

                </div>
            </>
        )
    }