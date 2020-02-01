### Attempt an Achieve Goal
```
"build" = "@ null build null !"
"build $x" = "@ null build __ !"
"$x build $y" = "@ __ build __ !"
```

### Attempt an Achieve Goal with Xtras
```
"put $x on: $y" = "@ null put $x on: $y !"
```

### Assert an Achieve Goal
```
"+ build" = "+ null build null !"
"+ build $x" = "+ null build __ !"
"+ $x build $y" = "+ $$_ build __ !"
```
