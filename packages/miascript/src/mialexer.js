const {unit_} = require('./common');
const $$ = unit_(module);

const grammar = require("./grammar");
const symbols = grammar.parser.symbols_;
const terminals = grammar.parser.terminals_;

const {EOF, COMMENT, NEWLINE, SEMICOLON, TERMINATOR, INDENT, OUTDENT} = symbols;
const {LONGARROW, NOTARROW, LONGFATARROW, NOTFATARROW} = symbols;

const supressor = {
  LONGARROW: true,
  NOTARROW: true,
  LONGFATARROW: true,
  NOTFATARROW: true
};
  
const Lexer = function() {};
Lexer.prototype = grammar.parser.lexer;

class MiaLexer extends Lexer {
  constructor() {
    super();
    this.prevToken = TERMINATOR;
    this.indentstack = [0];
    this.queue = [];
  }

  lex() {
    let nextTok;
    let tok = (nextTok = null);
    let indent = 0;
    if (this.queue.length !== 0) {
      tok = this.queue.shift();
      this.prevToken = tok;
      return tok;
    }

    tok = super.lex();
    switch (tok) {
      case SEMICOLON:
        this.queue.push(TERMINATOR);
        break;

      case EOF:
        while (this.indentstack[this.indentstack.length-1] > 0) {
          this.indentstack.pop();
          this.queue.push(OUTDENT);
        }
        this.queue.push(tok);
        break;

      case NEWLINE:
        nextTok = super.lex();
        while (nextTok === NEWLINE) { nextTok = super.lex(); }
        //console.log "Lookahead: #{terminals[nextTok]}"
        indent = this.yylloc.first_column;
        if (indent > this.indentstack[this.indentstack.length-1]) {
          this.indentstack.push(indent);
          this.queue.push(INDENT);

        } else if (indent < this.indentstack[this.indentstack.length-1]) {
          while (indent < this.indentstack[this.indentstack.length-1]) {
            this.indentstack.pop();
            this.queue.push(OUTDENT);
          }
            //console.log('OUTDENT')
          if (!supressor[terminals[nextTok]]) {
            this.queue.push(TERMINATOR);
          }

        } else {
          if (this.prevToken !== TERMINATOR) {
            this.queue.push(TERMINATOR);
          }
        }
        this.queue.push(nextTok);
        break;

      default:
        this.queue.push(tok);
    }

    tok = this.queue.shift();
    this.prevToken = tok;
    return tok;
  }
}

exports.MiaLexer = MiaLexer;
