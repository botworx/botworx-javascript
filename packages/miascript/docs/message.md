## Atoms
```
class Atom
  kind: <Kind>
```

## Terms
```
class Term extends Atom
```

## Kinds
Kinds are Terms
```
Bob
  kind: Person

+ Bob ^Person

where $g ^Goal
  -->
  @g  #Attempt Goal
```

## Kind Of Operator
The carat symbol
```
$x ^Person
```

## Clauses
```
class Clause extends Atom
  subj:
  verb:
  obj:
```

## Messages
```
class Message extends Clause
  from:
  to:
```
## Message Flavors

- Assert
- Retract
- Modify
- Attempt

## Goal Kinds
- Achieve
- Believe
- Maintain
- Query

```
new Message Assert, Achieve
```
