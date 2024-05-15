const tokens = ['if', 'else']
const brancher = ':'
const brackets = ['(', ')']

//
//
//
//
//
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

function get_arguments(s, i) {
    if (s[i] !== brackets[0]) {
        throw new Error('Expected (')
    }
    let arguments = ''
    let current_char = '' 
    while (current_char !== brackets[1]) {
        i++
        current_char = s[i]
        arguments += current_char
    }
    return arguments
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
        if (is_token(current_token)) {
            tokens.push(current_token)
            current_token = ''
        }
        else {

        }
    }
}