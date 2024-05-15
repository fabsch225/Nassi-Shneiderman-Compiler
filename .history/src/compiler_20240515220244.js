const tokens = ['if', 'else']

function compile(s) {
    for (let i = 0; i < s.length; i++) {
        const token = tokens[i]
        const reg = new RegExp(token, 'g')
        s = s.replace(reg, `_${token}`)
    }
}