const tokens = ['if']
const branchers = ['{', '}']
const brackets = ['(', ')']

//
// 0: function call
// 1: ifs
// 2: ifs and else

function is_token(s) {
    return tokens.includes(s)
}

function is_token_prefix(s) { //maybe not the correct def of prefix
    if (is_token(s)) {
        return false
    }
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].startsWith(s)) {
            return true
        }
    }
    return false
}

function get_arguments(s, i) {
    if (s[i] !== brackets[0]) {
        console.log(s[i])
        throw new Error('Expected (')
    }
    let arguments = ''
    let next_char = '' 
    i += 1
    while (next_char !== brackets[1]) {
        arguments += s[i]
        i++
        next_char = s[i]
    }
    return {args: arguments, index: i + 1}
}

function compile_front(s) {
    return compile_back(s.replace(/\s/g, ''));
}

function compile_back(s) {
    console.log("Compiling: " + s)
    let i = 0
    let current_token = ''
    let tokens = []
    while (i < s.length) {
        while (is_token_prefix(current_token)) {
            current_token += s[i]
            i++
        }
        if (is_token(current_token)) {
            if (current_token === 'if') {
                var type = 1
                var branches = []
                var arguments = []

                var current_arguments = get_arguments(s, i)
                i = current_arguments.index
                
                console.log(current_arguments.args)

                if (s[i] !== branchers[0]) {
                    console.log(s[i])
                    throw new Error('Expected {')
                }
                i += 1
                var branch = ''
                var next_char = ''
                while (next_char !== branchers[1]) {
                    if (i > s.length) {
                        throw new Error('Expected }')
                    }
                    branch += s[i]
                    i++
                    next_char = s[i]
                }
                i += 1
                branches.push(compile_back(branch))
                arguments.push(current_arguments.args)

                while (s.substring(i, i + 6) === 'elseif') {
                    i += 6
                    var current_arguments = get_arguments(s, i)
                    i = current_arguments.index
                    if (s[i] !== branchers[0]) {
                        throw new Error('Expected {')
                    }
                    i += 1
                    var branch = ''
                    var next_char = ''
                    while (next_char !== branchers[1]) {
                        if (i > s.length) {
                            throw new Error('Expected }')
                        }
                        branch += s[i]
                        i++
                        next_char = s[i]
                    }
                    i += 1

                    branches.push(compile_back(branch))
                    arguments.push(current_arguments.args)
                }
                if (s.substring(i, i + 4) === 'else') {
                    type = 2
                    i += 4
                    var current_arguments = get_arguments(s, i)
                    i = current_arguments.index
                    if (s[i] !== branchers[0]) {
                        throw new Error('Expected {')
                    }
                    i += 1
                    var branch = ''
                    var next_char = ''
                    while (next_char !== branchers[1]) {
                        if (i > s.length) {
                            throw new Error('Expected }')
                        }
                        branch += s[i]
                        i++
                        next_char = s[i]
                    }
                    i += 1
                    branches.push(compile_back(branch))
                    arguments.push(current_arguments.args)
                }

                tokens.push({
                    type: type,
                    name: current_token,
                    arguments: arguments,
                    branches: branches
                })
            }
        }
        else {
            while (s[i] != brackets[0]) {
                if (i > s.length) {
                    throw new Error('Expected (')
                }
                current_token += s[i]
                i++
            }
            var current_arguments = get_arguments(s, i)
            i = current_arguments.index
            tokens.push({
                type: 0,
                name: current_token,
                arguments: [current_arguments.args],
                branches: []
            })
        }
        current_token = ''
    }
    return tokens
}