class DictionaryService {
    static words = ["coder", "users"]

    static find(word) {        
        return DictionaryService.words.find(item => item == word)
    }
}

export default DictionaryService