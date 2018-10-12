import React from 'react';
const WordSearchForm = ({onWordSearch = f => f}) => {
    let word
    const submit = e => {
        e.preventDefault()
        onWordSearch(word.value)
        word.value = ''
        word.focus()
    }

    return (
        <form onSubmit={submit}>
            <input  ref={input => word = input}
                    type="text"
                    placeholder="Search for a word!" required />
            <button>Search</button>
        </form>
    )
}

export default WordSearchForm;