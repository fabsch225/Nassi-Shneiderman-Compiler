const tokens = ['if', 'else']
const branchers = ['{', '}']
const brackets = ['(', ')']

//
// 0: function call
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
    return {args: arguments, index: i}
}

function compile_front(s) {
    return compile_back(s.replace(/\s/g, ''));
}

function compile_back(s) {
    let i = 0
    let current_token = ''
    let tokens = []
    while (i < s.length) {
        while (is_token_prefix(current_token)) {
            i++
            current_token += s[i]
        }
        if (is_token(current_token)) {
            if (current_token === 'if') {
                var arguments = get_arguments(s, i)
                i = arguments.index
                i += 1
                if (s[i] !== branchers[0]) {
                    throw new Error('Expected {')
                }
                var branches = []
                var arguments = []
                var branch = ''
                var current_char = ''
                while (current_char !== branchers[1]) {
                    i++
                    current_char = s[i]
                    branch += current_char
                }
            }
        }
        else {
            var arguments = get_arguments(s, i)
            i = arguments.index
            tokens.push({
                type: 0,
                name: current_token + '(' + arguments.args + ')',
                children: []
            })
        }
    }
    return tokens
}