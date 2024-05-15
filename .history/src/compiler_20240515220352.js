const tokens = ['if', 'else']

function is_token(s) {
    return tokens.includes(s)
}

function is_token_prefix(s) {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].startsWith(s)) {
            return true
        }
    }
}

function compile(s) {
    for (let i = 0; i < s.length; i++) {
        
    }
}