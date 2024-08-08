import { Dropdown, DropdownButton, FormControl, InputGroup } from "react-bootstrap"

interface SearchInputFieldProps {
    placeholder: string,
    query: string,
    filter: string,
    setQuery: (value: string) => void
    setFilterType: (value: string) => void
}

const SearchInputField = ({ placeholder, query, setQuery, setFilterType, filter }: SearchInputFieldProps) => {    
    return (
        <div>
            <InputGroup className="mb-3">
            <DropdownButton
            title={filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()}
            >
                <Dropdown.Item onClick={() => setFilterType("genres")}>Genres</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterType("cast")}>Cast</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterType("directors")}>Directors</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterType("title")}>Title</Dropdown.Item>
            </DropdownButton>
                <FormControl
                    placeholder={placeholder}
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                />
            </InputGroup>
        </div>
    )
}

export default SearchInputField