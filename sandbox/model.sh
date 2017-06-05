#!/bin/bash
HACKERRANK_REPO=~/Dev/hackerrank/hackerrank-code
BCRUMB1=Algorithms
BCRUMB2=Warmup
if [ ! -d $HACKERRANK_REPO ]; then
  echo $HACKERRANK_REPO does not exist;
elif [ ! -d $HACKERRANK_REPO/.git ]; then
  echo $HACKERRANK_REPO is not a git repo;
else
  mkdir -p $HACKERRANK_REPO/$BCRUMB1/$BCRUMB2
fi
