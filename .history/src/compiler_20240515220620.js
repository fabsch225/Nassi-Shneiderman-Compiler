const tokens = ['if', 'else']
const brancher = ':'
const brackets = ['(', ')']

function is_token(s) {
    return tokens.includes(s)
}

function is_token_prefix(s) {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].startsWith(s)) {
            return true
        }
    }
    return false
}

function compile(s) {
    let i = 0
    let current_token = ''
    let tokens = []
    while (i < s.length) {
        while (is_token_prefix(current_token)) {
            i++
            current_token += s[i]
        }
    }
}