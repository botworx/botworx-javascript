### Attempt an Achieve Goal
```
"build" = "@ null build null !"
"build $x" = "@ null build __ !"
"$x build $y" = "@ __ build __ !"
```
### Assert an Achieve Goal
```
"+ build" = "+ null build null !"
"+ build $x" = "+ null build $x !"
"+ $x build $y !" = "+ $x build $y !" = "+ Achieve: $x build $y"
```
