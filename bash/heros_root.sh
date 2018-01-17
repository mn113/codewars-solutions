#!/bin/bash

int_rac () {
  n=$1  # $1 = number being square rooted
  x=$2  # $2 = our guess
  declare -i loopNo
  loopNo=$(( $3 + 1))  # $3 = iteration counter

  # calculate new approximation and compare with last:
  y=$(( (x + n / x) / 2 ))
  error=$(( y - x ))
  if [[ error -lt 1 ]] && [[ error -gt -1 ]]; then
    # found result with |error| < 1, so exit
    echo $loopNo
  else
    # floor y and go again:
    int_rac "$n" "${y%.*}" "$loopNo"
  fi
}

int_rac "$1" "$2" 0
