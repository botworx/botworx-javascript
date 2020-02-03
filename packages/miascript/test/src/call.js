/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {unit_, lex, parse, transform, analyze, transpile, compile, evaluate} = require('./common');
const $$ = unit_(module);

const data =
`\
Table1 :Table
  isClear true

Block1 :Block
  onTop Table1

Block2 :Block
  onTop Block1

Block3 :Block
  onTop Block2
  isClear true

+ Achieve: stack Block1 on: Block2
+ Achieve: stack Block2 on: Block3

defg (impasse)
  | 'Impassed'
  where
    ($g :Goal) status Active
  -->
    /* $g
  !=>
    halt

def (+ $g :Goal)
  + $g status Active

def (- $g :Goal)
  - $g status Active

def (stack $x on: $y -> $g)
  where
    ! $x isClear true
  -->
    /clear $x

def (goodbye)
  | String(this.rnr.ctx)

goodbye\
`;

describe('Blox', () => it('should work', function() {
  //$$._(lex(data))
  //$$._(JSON.stringify(parse(data), null, 2))
  //$$._(JSON.stringify(transform(data), null, 2))
  $$._(JSON.stringify(analyze(data), null, 2))
  //$$._(transpile(data));
  //$$._(compile(data));
  return evaluate(data);
}));
