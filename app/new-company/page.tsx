

export default function NewCompanyPage() {


    return (
        <div className="container">
        <h2 className="text-lg mt-6">Create a new company</h2>
        <p className="text-gray-500 text-sm mb-2">To create a job listing your first need to register a company</p>
        <form
          action=''
          className="flex gap-2">
          <input
            name="newCompanyName"
            className="p-2 border border-gray-400 rounded-md"
            type="text"
            placeholder="company name"/>
          <button type="submit" className="flex gap-2 items-center bg-blue-500 px-4 py-2 rounded-md text-white">
            Create company
          </button>
        </form>
      </div>
    )
}