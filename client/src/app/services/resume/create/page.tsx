
export default function Home() {

  return (
    <main className="flex min-h-screen items-start justify-start px-20 py-10 h-full w-scre gap-20 ">
      {/* Form Section */}
      <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Your Resume</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-lg p-2"
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="john.doe@example.com"
            />
          </div>
        </form>
      </div>
      {/* Preview Section */}
      <div className="w-1/2 p-6 h-full bg-white rounded-lg shadow-md mt-8 ">
        <h2 className="text-2xl font-semibold mb-4">Resume Preview</h2>
        <div className="border border-gray-300 rounded-md p-4">
          <p className="text-gray-500">Your resume preview will appear here.</p>
        </div>
      </div>
    </main>
  )
}
