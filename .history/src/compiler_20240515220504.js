const tokens = ['if', 'else']
const brancher = ':'

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
    while (i < s.length) {
        while
    }
}