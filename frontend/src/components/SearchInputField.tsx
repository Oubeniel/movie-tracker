interface SearchInputFieldProps {
    placeholder: string,
    query: string,
    setQuery: (value: string) => void
}


const SearchInputField = ({placeholder, query, setQuery}: SearchInputFieldProps) => {    
    return (
        <div>
            <input 
            type="text"
            placeholder={placeholder}
            className="form-control"
            onChange={e => setQuery(e.target.value)}
            value={query}
            />
        </div>
    )
}

export default SearchInputField