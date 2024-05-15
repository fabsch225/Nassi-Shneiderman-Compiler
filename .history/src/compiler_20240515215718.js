class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.currentChar = this.input[this.position];
    }

    advance() {
        this.position++;
        if (this.position < this.input.length) {
            this.currentChar = this.input[this.position];
        } else {
            this.currentChar = null;
        }
    }

    getNextToken() {
        while (this.currentChar !== null) {
            if (this.currentChar === ' ') {
                this.advance();
                continue;
            }

            if (this.currentChar === 'i') {
                this.advance();
                return new Token('IF', 'if');
            }

            if (this.currentChar === 'e') {
                this.advance();
                return new Token('ELSE', 'else');
            }

            if (this.currentChar === ':') {
                this.advance();
                return new Token('COLON', ':');
            }

            if (this.currentChar === 'p') {
                this.advance();
                return new Token('PRINT', 'print');
            }

            if (this.currentChar === '(') {
                this.advance();
                return new Token('LPAREN', '(');
            }

            if (this.currentChar === ')') {
                this.advance();
                return new Token('RPAREN', ')');
            }

            if (this.currentChar.match(/[0-9]/)) {
                let num = '';
                while (this.currentChar !== null && this.currentChar.match(/[0-9]/)) {
                    num += this.currentChar;
                    this.advance();
                }
                return new Token('NUMBER', parseInt(num));
            }
            console.log(this.currentChar === null);
            throw new Error('Invalid character');
        }

        return new Token('EOF', null);
    }
}

class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    eat(tokenType) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            throw new Error('Invalid syntax');
        }
    }

    factor() {
        const token = this.currentToken;
        if (token.type === 'NUMBER') {
            this.eat('NUMBER');
            return { type: 'Number', value: token.value };
        } else if (token.type === 'LPAREN') {
            this.eat('LPAREN');
            const node = this.expr();
            this.eat('RPAREN');
            return node;
        } else {
            throw new Error('Invalid syntax');
        }
    }

    expr() {
        let node = this.factor();

        while (this.currentToken.type === 'PLUS' || this.currentToken.type === 'MINUS') {
            const token = this.currentToken;
            if (token.type === 'PLUS') {
                this.eat('PLUS');
            } else if (token.type === 'MINUS') {
                this.eat('MINUS');
            }
            node = { type: 'BinOp', left: node, op: token.value, right: this.factor() };
        }

        return node;
    }

    ifStatement() {
        this.eat('IF');
        const condition = this.expr();
        this.eat('COLON');
        const ifBody = this.statement();
        let elseBody = null;
        if (this.currentToken.type === 'ELSE') {
            this.eat('ELSE');
            this.eat('COLON');
            elseBody = this.statement();
        }
        return { type: 'IfStatement', condition, ifBody, elseBody };
    }

    printStatement() {
        this.eat('PRINT');
        this.eat('LPAREN');
        const value = this.expr();
        this.eat('RPAREN');
        return { type: 'PrintStatement', value };
    }

    statement() {
        if (this.currentToken.type === 'IF') {
            return this.ifStatement();
        } else if (this.currentToken.type === 'PRINT') {
            return this.printStatement();
        } else {
            throw new Error('Invalid syntax');
        }
    }

    parse() {
        return this.statement();
    }
}

function parsePythonCode(code) {
    const lexer = new Lexer(code);
    const parser = new Parser(lexer);
    return parser.parse();
}

